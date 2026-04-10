# Rabin Mishra — Portfolio Website

A highly optimized modern personal portfolio seamlessly bridging the divide between Cloud Engineering, DevOps pipelines, and rapid Software deployment.

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/sanity.io-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Live URL:** [https://rabinmishra.com.np](https://rabinmishra.com.np)

## Prerequisites

- **Node.js**: v20 or newer
- **npm**: v10 or newer 
- **Docker**: Optional, for containerized local spinups
- **Git**: For version control

## Quick Start (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rabin-Mishra/rabin-portfolio.git
   cd rabin-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Sanity CMS**
   ```bash
   # Initialize a new Sanity instance (optional, since it's embedded)
   npm create sanity@latest
   ```
   *Skip initializing if you are using the embedded `sanity/` Studio dir within the repo.*

4. **Prepare Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your `.env.local` strictly according to the reference section below.

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` locally. `http://localhost:3000/studio` accesses the local Sanity CMS interface.

## Sanity Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy your **Project ID** from the dashboard into `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`)
3. Create an **API token (Editor role)** from API settings and place it in `.env.local` (`SANITY_API_TOKEN`)
4. **Seed the Database:**
   ```bash
   npm run seed
   ```
5. **Deploy the Studio:** (To make it publicly accessible on Vercel via `/studio`, it builds automatically. If deploying Sanity independently, run `npx sanity deploy`).

## Vercel Deployment

1. Push your repository to GitHub (`github.com/Rabin-Mishra`).
2. Log into [Vercel](https://vercel.com) and click **"Add New..." > "Project"**.
3. Import your GitHub repository.
4. Expand the **Environment Variables** tab and paste all contents from `.env.local`.
5. Click **Deploy**. Vercel will now automatically redeploy the site on every commit pushed to the `main` branch.

## Custom Domain Setup (rabinmishra.com.np)

If you use Cloudflare for DNS management, apply these exact records:
- **A record:** Name: `@` → Target: `76.76.21.21` (Vercel Anycast IP)
- **CNAME record:** Name: `www` → Target: `cname.vercel-dns.com`

**In the Vercel Dashboard:**
1. Navigate to Settings → Domains.
2. Add both `rabinmishra.com.np` and `www.rabinmishra.com.np`.
3. Wait generally 5–30 minutes for DNS propagation and automatic SSL provisioning.

## Docker Local Run

For testing the production build behavior exactly as it would run on a Linux server:

1. Validate your `.env.local` is present in your root directory.
2. Build and spin up the multi-stage images via Compose:
   ```bash
   docker-compose up --build
   ```
3. Access at `http://localhost:3000`. Stop securely utilizing `docker-compose down`.

## Adding New Blog Posts

1. Navigate to your deployed Studio (e.g., `https://rabinmishra.com.np/studio`) or run locally.
2. Click **"Posts"** on the left pane, then click **"Create"**.
3. Fill out the `Title`, `Slug` (Click "Generate"), select a `Category`, add a `Cover Image`, and write your `Body` utilizing PortableText blocks and code snippets.
4. Hit **Publish**. Because of Next.js Incremental Static Regeneration (ISR), your website will automatically rebuild the cached variant and surface your blog post within 1 hour.

## Adding New Projects

The flow mirrors Blog Posts seamlessly. Navigate via Sanity Studio to **"Projects"** → Create. Toggle the `Featured` boolean logic if you want the project displayed as paramount on your `/projects` page.

## Updating Certifications

Your certifications are managed at the edge. To update them:
1. Open up `lib/constants.ts` inside the codebase.
2. Locate the `CERTIFICATES` array block.
3. Add, edit, or adjust your certification items. 
4. Commit your adjustments to the `main` branch and observe the CI/CD pipeline naturally redeploy.

## Environment Variables Reference

| Variable | Description | Where to acquire |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your unique Sanity Project ID string. | sanity.io/manage → Project Settings |
| `NEXT_PUBLIC_SANITY_DATASET` | Datastore specifier. Generally just `production`. | sanity.io/manage → Datasets |
| `SANITY_API_TOKEN` | Auth token permitting creation/editing via `npm run seed`. | sanity.io/manage → API → Add Token (Editor) |
| `RESEND_API_KEY` | Authenticates backend React requests to transmit Contact emails. | resend.com → API Keys → Create Key |
| `NEXT_PUBLIC_SITE_URL` | Used for generating strict OpenGraph URL Metadata. | Self-evident (`https://rabinmishra.com.np`) |
| `VERCEL_TOKEN` | Authenticates GitHub Actions pipelines pushing code to Vercel. | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Tied to your Vercel User identifier. | .vercel/project.json (After `vercel link`) |
| `VERCEL_PROJECT_ID` | Unique key specifying which internal Vercel project to target.| .vercel/project.json (After `vercel link`) |

## Project Structure

```
├── app/                  # Next.js 15 App router structure
│   ├── (site)/           # Site pages (/about, /projects, /blog)
│   ├── api/              # Serverless backend APIs
│   ├── console/          # Admin/Studio route boundaries
│   └── globals.css       # Core design system values
├── components/           # Reusable modular React components
│   ├── ui/               # shadcn/ui generic primitives
│   ├── home/             # Dedicated home sections
│   ├── blog/             # Complex localized blog primitives
│   └── contact/          # Client-bound reactive forms
├── lib/                  # Generic utilities and schemas
│   ├── constants.ts      # Certs, Social links, Constants
│   └── utils.ts          # Generic system utilities (Tailwind merges)
├── sanity/               # Headless CMS Core Directory
│   ├── schemaTypes/      # Schema schemas and datastores
│   └── lib/              # Client SDK binding and GROQ queries
├── scripts/              # Independent Node modules (seed scripts)
├── tailwind.config.ts    # Deep CSS theme configuration
└── docker-compose.yml    # Enterprise application orchestration
```
