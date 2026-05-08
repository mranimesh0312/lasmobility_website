# LAS Mobility Website

Professional marketing website for LAS Mobility, an AI-powered fleet management and mobility intelligence SaaS platform.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react icons
- SEO metadata, sitemap, and robots routes

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Logo Replacement

The current logo files are placeholders:

- `public/logo.svg`
- `public/favicon.svg`
- `public/og-image.svg`

Replace these files with the official LAS Mobility assets. If you use PNG assets, update the image paths in `components/Navbar.tsx`, `components/Footer.tsx`, `app/about/page.tsx`, and `app/layout.tsx`.

## Deployment on Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Deploy.

Recommended production checks before launch:

- Connect the contact form to an email service, CRM, or Next.js server action.
- Replace placeholder legal pages after counsel review.
- Add a final OpenGraph image and favicon package.
- Configure analytics and conversion tracking if needed.
