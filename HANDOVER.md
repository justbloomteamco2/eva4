# Spartan Security Solutions — Operations Handover

This document is for the site owner and the next developer responsible for
deploying and maintaining the website. Never add credential values to this
document or commit `.env.local`.

## Current status

- Application: Next.js 14 App Router, JavaScript/JSX.
- Production build: `npm run build`.
- Automated checks: `npm test`.
- Hosting target: Vercel or another Next.js serverless host. Do not configure
  static export or GitHub Pages for this application.
- Database: Supabase project is provisioned. Both migrations listed below
  have been applied and verified.
- Feedback: new reviews are approved and shown immediately. Remove unwanted
  feedback from the Supabase `reviews` table.
- Consultation: submissions are saved to Supabase before an email notification
  is attempted. Check `notification_status` on a request if a notification is
  not received.
- Email: a successful local send was tested. The configured sender currently
  uses Resend's shared test domain; verify a domain you own and change the
  sender address before public production email.
- Source control: Git is initialized on `main`, with `origin` configured.
  At the last remote sync, the local branch matched `origin/main`. The current
  website changes remain local and have not been committed or pushed.
- Current deployment: `https://eva4-lddt.vercel.app/` serves the main and
  consultation pages, but `GET /api/reviews` returned HTTP 503 during the
  latest check. Do not treat the production backend as verified until the
  Vercel function logs have been checked and that endpoint returns HTTP 200.

## Services and routes

| Purpose | Location |
| --- | --- |
| Main website | `/` |
| Services overview and details | `/services`, `/services/[service]` |
| Company story | `/about` |
| Client feedback | `/reviews` |
| Contact details and location | `/contact` |
| Consultation form | `/consultation` |
| Create consultation request | `POST /api/consultations` |
| Read approved feedback | `GET /api/reviews` |
| Submit feedback | `POST /api/reviews` |
| Supabase migrations | `supabase/migrations/` |

## Required production environment

Set these server-side variables in Vercel under **Project Settings → Environment
Variables**. Configure Production at minimum. Preview environments should only
receive live service credentials if they are intentionally allowed to create
real records or send real email.

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase service-role key |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Sender address on a Resend-verified domain |
| `CONSULTATION_TO_EMAIL` | Mailbox to receive consultation enquiries |

Never prefix the service-role key with `NEXT_PUBLIC_`, include it in client
code, or commit it. `.env.example` lists variable names without credentials;
`.env.local` is ignored by Git.

## Database

The deployed Supabase project must contain the schema and function from:

1. `supabase/migrations/20261008180000_public_reviews_and_rate_limits.sql`
   — reviews, consultation requests, rate-limit storage, function, and initial
   approved feedback entries.
2. `supabase/migrations/20261009080000_auto_approve_reviews.sql` — approves
   existing feedback and changes the default status for new reviews.

These migrations were applied through the Supabase SQL Editor. The app uses the
service-role key only on server routes. Do not expose private consultation
records through a public read policy.

## Deploying from GitHub

The repository is already connected to its GitHub `origin` on `main`. Before
deploying, review `git status` and `git diff`, run `npm test` and
`npm run build`, then commit and push intended changes. Confirm `.env.local`,
generated output, and `reference/` materials are not included.

1. Import the existing GitHub repository in Vercel. Keep the detected Next.js
   framework and default commands (`npm install`, `npm run build`); do not set
   an output directory or static-export setting.
2. Add the five production environment variables above. Use a verified Resend
   sender domain before accepting public enquiries.
3. Deploy and verify the production URL using the checks below.

The `reference/` folder contains source photos, supplied videos, and a business
license for local reference; it is not required to build or deploy the site
and is excluded from Git. Keep the license scan and candid reference photos
private; the About page displays only the PSARA region and validity statement.
Review that statement against the renewed license when it expires. The selected
founder-video still, discreet team photo, and compressed security-team clip on
the security service page are stored under `public/assets/`; original shoot
footage remains private. The photographic assets use WebP where that format
reduces file size. The original logo remains unchanged. The current `.gitignore`
also excludes local-only configuration and unrelated workspace files from the
website repository.

## Production smoke checks

After deployment:

1. Open `/` and `/consultation`; verify navigation, responsive layout, and
   local images load.
2. Confirm `GET /api/reviews` returns approved reviews.
3. Submit one genuine feedback entry and confirm it appears in the feedback
   list. Remove it from Supabase if it was only a test.
4. Submit a consultation using an address you control. Confirm a row is
   recorded in `consultation_requests` and the notification arrives at
   `CONSULTATION_TO_EMAIL`.
5. If the database row is saved but no email arrives, inspect the request's
   `notification_status`, Resend logs, and sender-domain verification.
6. Check Vercel deployment logs for errors and confirm the rate limiter works
   on public form submissions.

Run `npm test` and `npm run build` locally before pushing changes.

## Routine maintenance

- Delete inappropriate reviews from Supabase; public submissions are
  automatically approved.
- Keep service-role and email credentials in the hosting provider's secret
  environment settings. Rotate them if they are exposed.
- Apply future SQL migrations to the correct Supabase project and verify
  production routes afterward.
- Keep a recovery path for consultation records and review data before making
  schema changes.
