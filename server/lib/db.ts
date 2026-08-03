import { Pool, QueryResultRow } from "pg";

type DbRow = Record<string, unknown>;
type DbSelect = Record<string, boolean> | string[];
type DbValue = string | number | boolean | null | undefined | Date | DbValue[] | Record<string, unknown>;
type DbWhere = Record<string, DbValue>;

type DbArgs = {
  select?: DbSelect;
  where?: DbWhere;
  orderBy?: unknown;
  skip?: number;
  take?: number;
};

type TableClient = {
  findMany(args?: DbArgs): Promise<DbRow[]>;
  findUnique(args: { where: DbWhere; select?: DbSelect }): Promise<DbRow | null>;
  findFirst(args?: DbArgs): Promise<DbRow | null>;
  count(args?: { where?: DbWhere }): Promise<number>;
  create(args: { data: DbRow }): Promise<DbRow>;
  update(args: { where: DbWhere; data: DbRow }): Promise<DbRow | null>;
  delete(args: { where: DbWhere }): Promise<{ count: number }>;
  upsert(args: { where: DbWhere; create: DbRow; update: DbRow }): Promise<DbRow>;
};

type DbClient = Record<string, TableClient>;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set for Supabase PostgreSQL access.");
}

const pool = new Pool({
  connectionString,
  ssl:
    /^postgres(?:ql)?:\/\//.test(connectionString) &&
    (process.env.NODE_ENV === "production" || connectionString.includes("sslmode=require"))
      ? { rejectUnauthorized: false }
      : undefined,
});

function quoteIdentifier(identifier: string) {
  return `"${identifier.replace(/"/g, "\"")}"`;
}

function pascalCase(name: string) {
  return name.replace(/(^.|[A-Z])/g, (match, index) =>
    index === 0 ? match.toUpperCase() : match.toUpperCase()
  );
}

function buildSelect(select: Record<string, boolean> | string[] | undefined) {
  if (!select) return "*";
  if (Array.isArray(select)) {
    return select.map(quoteIdentifier).join(", ");
  }
  return Object.entries(select)
    .filter(([, value]) => value)
    .map(([key]) => quoteIdentifier(key))
    .join(", ") || "*";
}

function buildOrderBy(orderBy: unknown) {
  if (!orderBy) return "";
  const entries = Array.isArray(orderBy) ? orderBy : [orderBy];
  const clauses = entries
    .map((entry) => {
      const [field, direction] = Object.entries(entry)[0] as [string, string];
      return `${quoteIdentifier(field)} ${direction.toUpperCase()}`;
    })
    .join(", ");
  return clauses ? `ORDER BY ${clauses}` : "";
}

function buildWhere(where: unknown, values: unknown[]): string {
  if (!where || typeof where !== "object" || Array.isArray(where)) return "";
  const clauses: string[] = [];

  for (const [key, value] of Object.entries(where)) {
    if (key === "OR" && Array.isArray(value)) {
      const subClauses = value.map((clause) => {
        const sql = buildWhere(clause, values);
        return sql ? `(${sql})` : "";
      });
      clauses.push(subClauses.filter(Boolean).join(" OR "));
      continue;
    }

    const column = quoteIdentifier(key);

    if (value === null) {
      clauses.push(`${column} IS NULL`);
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      if ("contains" in value) {
        values.push(`%${String(value.contains)}%`);
        clauses.push(`LOWER(${column}::text) LIKE LOWER($${values.length})`);
        continue;
      }
      if ("in" in value && Array.isArray(value.in)) {
        values.push(value.in);
        clauses.push(`${column} = ANY($${values.length})`);
        continue;
      }
      if ("gt" in value) {
        values.push(value.gt);
        clauses.push(`${column} > $${values.length}`);
        continue;
      }
      if ("gte" in value) {
        values.push(value.gte);
        clauses.push(`${column} >= $${values.length}`);
        continue;
      }
      if ("lt" in value) {
        values.push(value.lt);
        clauses.push(`${column} < $${values.length}`);
        continue;
      }
      if ("lte" in value) {
        values.push(value.lte);
        clauses.push(`${column} <= $${values.length}`);
        continue;
      }
      if ("equals" in value) {
        values.push(value.equals);
        clauses.push(`${column} = $${values.length}`);
        continue;
      }
    }

    values.push(value);
    clauses.push(`${column} = $${values.length}`);
  }

  return clauses.join(" AND ");
}

function buildUpdate(data: DbRow, values: unknown[]) {
  const assignments: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    const column = quoteIdentifier(key);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      if ("increment" in value) {
        values.push(value.increment);
        assignments.push(`${column} = ${column} + $${values.length}`);
        continue;
      }
      if ("decrement" in value) {
        values.push(value.decrement);
        assignments.push(`${column} = ${column} - $${values.length}`);
        continue;
      }
    }
    values.push(value);
    assignments.push(`${column} = $${values.length}`);
  }
  return assignments.join(", ");
}

async function exec<T extends QueryResultRow = DbRow>(text: string, params: unknown[] = []) {
  return pool.query<T>(text, params);
}

function getTableName(key: string) {
  return pascalCase(key);
}

function createTableClient(tableKey: string) {
  const tableName = getTableName(tableKey);

  return {
    findMany: async (args: DbArgs = {}) => {
      const values: unknown[] = [];
      const select = buildSelect(args.select);
      const whereClause = buildWhere(args.where, values);
      const orderBy = buildOrderBy(args.orderBy);
      const limit = args.take ? `LIMIT ${Number(args.take)}` : "";
      const offset = args.skip ? `OFFSET ${Number(args.skip)}` : "";
      const sql = `SELECT ${select} FROM ${quoteIdentifier(tableName)}${whereClause ? ` WHERE ${whereClause}` : ""} ${orderBy} ${limit} ${offset}`;
      const result = await exec<DbRow>(sql.trim(), values);
      return result.rows;
    },
    findUnique: async (args: DbArgs) => {
      const results = await createTableClient(tableKey).findMany({ ...args, take: 1 });
      return results[0] ?? null;
    },
    findFirst: async (args: DbArgs = {}) => {
      const results = await createTableClient(tableKey).findMany({ ...args, take: 1 });
      return results[0] ?? null;
    },
    count: async (args: DbArgs = {}) => {
      const values: unknown[] = [];
      const whereClause = buildWhere(args.where, values);
      const sql = `SELECT COUNT(*) AS count FROM ${quoteIdentifier(tableName)}${whereClause ? ` WHERE ${whereClause}` : ""}`;
      const result = await exec<{ count: string }>(sql, values);
      return parseInt(result.rows[0]?.count ?? "0", 10);
    },
    create: async (args: { data: DbRow }) => {
      const values: unknown[] = [];
      const columns = Object.keys(args.data).map(quoteIdentifier).join(", ");
      const placeholders = Object.keys(args.data)
        .map((key) => {
          values.push(args.data[key]);
          return `$${values.length}`;
        })
        .join(", ");
      const sql = `INSERT INTO ${quoteIdentifier(tableName)} (${columns}) VALUES (${placeholders}) RETURNING *`;
      const result = await exec<DbRow>(sql, values);
      return result.rows[0];
    },
    update: async (args: { where: DbWhere; data: DbRow }) => {
      const values: unknown[] = [];
      const setClause = buildUpdate(args.data, values);
      const whereClause = buildWhere(args.where, values);
      const sql = `UPDATE ${quoteIdentifier(tableName)} SET ${setClause}${whereClause ? ` WHERE ${whereClause}` : ""} RETURNING *`;
      const result = await exec<DbRow>(sql, values);
      return result.rows[0] ?? null;
    },
    delete: async (args: { where: DbWhere }) => {
      const values: unknown[] = [];
      const whereClause = buildWhere(args.where, values);
      const sql = `DELETE FROM ${quoteIdentifier(tableName)}${whereClause ? ` WHERE ${whereClause}` : ""}`;
      await exec(sql, values);
      return { count: 1 };
    },
    upsert: async (args: { where: DbWhere; create: DbRow; update: DbRow }) => {
      const values: unknown[] = [];
      const createColumns = Object.keys(args.create).map(quoteIdentifier).join(", ");
      const createPlaceholders = Object.keys(args.create)
        .map((key) => {
          values.push(args.create[key]);
          return `$${values.length}`;
        })
        .join(", ");
      const conflictColumns = Object.keys(args.where).map(quoteIdentifier).join(", ");
      const updateClause = buildUpdate(args.update, values);
      const sql = `INSERT INTO ${quoteIdentifier(tableName)} (${createColumns}) VALUES (${createPlaceholders}) ON CONFLICT (${conflictColumns}) DO UPDATE SET ${updateClause} RETURNING *`;
      const result = await exec<DbRow>(sql, values);
      return result.rows[0];
    },
  };
}

const db = new Proxy({} as DbClient, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    return createTableClient(prop);
  },
});

export async function ensureDb() {
  await exec("SELECT 1");
}

export function validateDatabaseUrl() {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    console.warn("DATABASE_URL is not set.");
  }
}

export default db;

