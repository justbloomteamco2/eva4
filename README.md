# Spartan Security Solutions

The official website for Spartan Security Solutions, presenting its security,
housekeeping, gardening, and manpower services, with consultation and client
feedback forms.

## Run locally

Requirements: Node.js 18 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To run checks and create a production build:

```bash
npm test
npm run build
```

## Technology

- Next.js 14 App Router, React, JavaScript, and CSS
- Supabase for consultation and feedback records
- Resend for consultation email notifications

## Deployment

Deploy as a Next.js application on Vercel or another compatible host. The
consultation and feedback endpoints require a server runtime; GitHub Pages
static hosting will not run them.

For production setup, required environment variables, and the deployment
checklist, see [HANDOVER.md](./HANDOVER.md).
