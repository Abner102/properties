/** Adds `_id` for admin UI compatibility (formerly Mongoose). */
export function withMongoId<T extends { id?: string }>(item: T | null): (T & { _id: string }) | null {
  if (!item) return null;
  return { ...item, _id: item.id as string };
}

export function withMongoIds<T extends { id?: string }>(items: T[]): (T & { _id: string })[] {
  return items.map((item) => ({ ...item, _id: item.id as string }));
}

export function omitPassword<T extends { password?: string; refreshToken?: string | null }>(
  user: T
): Omit<T, "password" | "refreshToken"> {
  const { password: _, refreshToken: __, ...safe } = user;
  return safe;
}

