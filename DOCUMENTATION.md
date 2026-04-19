# Rabin Mishra - Portfolio Website Documentation

## Overview
A highly optimized modern personal portfolio bridging Cloud Engineering, DevOps pipelines, and rapid software deployment. Built with Next.js 15, Sanity CMS, Tailwind CSS, and deployed on Vercel.

**Live URL:** https://rabinmishra.com.np

## Key Features
- 📝 Blog & Project management via Sanity Studio
- 📧 Contact form with email sending (Resend)
- 🖼️ Dynamic Open Graph image generation
- 🔍 SEO optimization (sitemap, robots.txt)
- 🌓 Dark/light theme support
- ⚡ Incremental Static Regeneration (ISR) for blog/projects
- 💻 Syntax highlighting for code blocks
- 🐳 Docker support for local containerized testing
- ☁️ One-click Vercel deployment

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity.io (Headless)
- **Deployment:** Vercel
- **Email:** Resend API
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Typography:** @tailwindcss/typography
- **Analytics:** Vercel Analytics
- **TypeScript:** Strict mode
- **Form Handling:** React Hook Form + Zod
- **Syntax Highlighting:** rehype-pretty-code + Shiki
- **Docker:** Multi-stage build with nginx

## Project Structure
```
├── app/                  # Next.js 15 App router
│   ├── (site)/           # Public pages (/, /about, /projects, /blog)
│   ├── api/              # Serverless functions (contact form)
│   ├── console/          # Sanity Studio route boundaries
│   └── globals.css       # Global styles
├── components/           # Reusable React components
│   ├── ui/               # shadcn/ui primitives
│   ├── home/             # Homepage sections
│   ├── blog/             # Blog-specific components
│   └── contact/          # Contact form components
├── lib/                  # Utilities & constants
│   ├── constants.ts      # Certifications, social links
│   └── utils.ts          # Helper functions (cn, etc.)
├── sanity/               # Sanity Studio configuration
│   ├── schemaTypes/      # Content schemas (post, project, etc.)
│   └── lib/              # Sanity client & GROQ queries
├── scripts/              # Utility scripts (seed, cleanup)
├── public/               # Static assets
├── .next/                # Next.js build output
├── node_modules/         # Dependencies
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── docker-compose.yml    # Docker orchestration
├── README.md             # This documentation
├── package.json          # Dependencies & scripts
└── tsconfig.json         # TypeScript configuration
```

## Getting Started (Local Development)

### Prerequisites
- Node.js v20.11.0 or newer
- npm v10.2.0 or newer
- Git
- Docker (optional, for containerized local testing)

### Installation
```bash
# Clone repository
git clone https://github.com/Rabin-Mishra/rabin-portfolio.git
cd rabin-portfolio

# Install dependencies
npm install

# Copy environment example
cp .env.example .env.local
```

### Environment Variables
Create `.env.local` with:
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token

# Email (Resend)
RESEND_API_KEY=your_resend_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel (optional for local dev)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Development Server
```bash
npm run dev
```
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Sanity CMS Setup

### Initial Configuration
1. Create project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy Project ID to `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Create API Token (Editor role) → set as `SANITY_API_TOKEN`
4. Dataset: typically `production`

### Data Seeding
```bash
# Seed with sample data
npm run seed

# Extended seeding (if available)
npm run seed:extended
```

## Deployment

### Vercel (Recommended)
1. Push repository to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy - automatic builds on main branch pushes

### Docker (Local Testing)
```bash
# Build and run
docker-compose up --build

# Access at http://localhost:3000
# Stop with: docker-compose down
```

## Content Management

### Blog Posts
1. Access Sanity Studio (`/studio`)
2. Navigate to **Posts** → **Create**
3. Fill: Title, Slug (auto-generate), Category, Cover Image, Body
4. Publish → ISR updates within 1 hour

### Projects
1. In Sanity Studio: **Projects** → **Create**
2. Toggle **Featured** for homepage showcase
3. Same fields as posts (title, slug, etc.)

### Certifications
Edit `lib/constants.ts`:
```typescript
export const CERTIFICATES = [
  {
    name: "Certificate Name",
    issuer: "Issuing Organization",
    date: "Month Year",
    credentialId: "ID123",
    credentialUrl: "https://verify.example.com"
  }
]
```
Commit to trigger redeploy.

## Environment Variables Reference

| Variable | Description | Source |
|----------|-------------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Project ID | sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (usually production) | sanity.io/manage |
| `SANITY_API_TOKEN` | Write access token for Sanity | sanity.io/manage → API |
| `RESEND_API_KEY` | Email sending service key | resend.com → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Base URL for OG metadata | Your domain |
| `VERCEL_TOKEN` | Vercel CLI/GitHub Actions auth | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel Organization ID | .vercel/project.json |
| `VERCEL_PROJECT_ID` | Vercel Project ID | .vercel/project.json |

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed Sanity with initial data
- `npm run seed:extended` - Extended data seeding
- `npm run cleanup` - Run cleanup utility

## Custom Domain Setup (Cloudflare + Vercel)
1. DNS Records:
   - A record: `@` → `76.76.21.21` (Vercel Anycast IP)
   - CNAME record: `www` → `cname.vercel-dns.com`
2. In Vercel Dashboard:
   - Settings → Domains
   - Add both `yourdomain.com` and `www.yourdomain.com`
   - Wait 5-30 minutes for DNS propagation & SSL

## Implementation Notes
- **ISR:** Blog/project pages regenerate at most once per hour
- **Image Optimization:** Next.js Image with Sanity asset integration
- **Accessibility:** Semantic HTML, ARIA labels, contrast compliance
- **Performance:** Critical CSS, font optimization, minimal JS
- **Security:** Sanitized content, API rate limits, CSP headers

## License
This project is open source and available for inspiration/forking.  
Please respect the personal nature of content (blog posts, projects, etc.) when adapting.

## Support
For issues or questions, visit the GitHub repository issues section.  
Live site: https://rabinmishra.com.np  
Repository: https://github.com/Rabin-Mishra/rabin-portfolio

--- 
*Documentation last updated: April 2026*  
*For the most current information, see the repository's README.md*