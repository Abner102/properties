# Endless Infinity Properties

**Building Wealth Through Technology, Real Estate & Premium Investments.**

A premium, enterprise-grade corporate website and admin dashboard for Endless Infinity Properties — a Nigerian technology-driven real estate company.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Next.js API Routes (Node.js) |
| Database | Supabase PostgreSQL |
## Auth | Supabase email/password + JWT session cookies
| Themes | Dark & Light mode (next-themes) |
| Storage | Cloudinary-ready (configure in `.env`) |

## Quick Start

```bash
npm install
```

Then run `sql/schema.sql` and `sql/seed.sql` in Supabase or `psql` before starting the app.

```bash
npm run dev         # Start at http://localhost:3000
```


## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Properties | `/properties` |
| Land Sales | `/land` |
| Cars | `/cars` |
| Software Services | `/software` |
| Portfolio | `/portfolio` |
| Portfolio Case Study | `/portfolio/[slug]` |
| Blog | `/blog` |
| Careers | `/careers` |
| Content Creation | `/content-creation` |
| Contact | `/contact` |
| Admin Dashboard | `/admin` |

## Featured Portfolio Projects

- [Nexora SMS](https://nexorasms.com) — `/portfolio/nexora-sms`
- [JosCity](https://joscity.com) — `/portfolio/joscity`
- [Afresh Center](https://afreshcenter.org) — `/portfolio/afresh-center`
- [JobFinix](https://jobfinix.com) — `/portfolio/jobfinix`
- [Gatewav](https://gatewav.com) — `/portfolio/gatewav`

## API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Admin authentication |
| `/api/auth/logout` | POST | Clear session |
| `/api/inquiries` | GET, POST | Contact form submissions |
| `/api/newsletter` | POST | Newsletter subscriptions |
| `/api/properties` | GET, POST | Property management |
| `/api/lands` | GET, POST | Land management |
| `/api/cars` | GET, POST | Car management |
| `/api/projects` | GET, POST | Portfolio projects |
| `/api/blog` | GET, POST | Blog posts |
| `/api/admin/stats` | GET | Dashboard analytics |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://..."          # Supabase PostgreSQL connection string
JWT_SECRET="your-secure-secret"
ADMIN_EMAIL="admin@endlessinfinity.ng"
ADMIN_PASSWORD="your-secure-password"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Production Deployment

### Vercel (Frontend + API)
```bash
npm run build
```

Set `DATABASE_URL` to your Supabase PostgreSQL connection string.
The backend also uses `SUPABASE_URL` and `SUPABASE_ANON_KEY` for Supabase Auth email/password verification.

## Contact

- **Phone:** 07065109007
- **WhatsApp:** 07065109007
- **Email:** hello@endlessinfinity.ng

## Customization

- **Content:** Edit files in `src/data/` or use the admin dashboard
- **Images:** Replace Unsplash URLs with your assets in `/public/images/`
- **Branding:** Update `src/data/site.ts` and `sql/seed.sql`
