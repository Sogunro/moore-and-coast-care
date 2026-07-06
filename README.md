# Moore & Coast Care

A premium marketing website for **Moore & Coast Care Limited**, a CQC-registered home care provider serving Whitby and North Yorkshire.

Built to feel calm, trustworthy and personal — reflecting the quality of care the business provides.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- **Language:** TypeScript
- **Fonts:** Cormorant Garamond (display) + Manrope (body), self-hosted via `next/font`
- **Imagery:** Custom photography generated with OpenAI

## Brand

Colours are sampled directly from the company logo:

| Token | Hex | Use |
|-------|-----|-----|
| Blue | `#1D4CA6` | Primary / dark surfaces / headings |
| Green | `#00B48D` | Accent / buttons / highlights |
| Charcoal | `#282E3C` | Body text |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Then open the `localhost` URL printed in the terminal once you see **✓ Ready**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (use this to view/develop the site) |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | Lint the codebase |

## Project structure

```
src/
  app/            # Routes: home, about, services, careers, testimonials, contact
    api/enquiry/  # Validated contact-form endpoint
  components/     # Reusable UI (header, footer, cards, form, CTA…)
  lib/site.ts     # Single source of truth for business content & copy
public/images/    # Logo and photography
```

## Before going live

- [ ] Replace the placeholder testimonials in `src/lib/site.ts` with real, consented ones.
- [ ] Wire `deliverEnquiry()` in `src/app/api/enquiry/route.ts` to an email/CRM provider.
- [ ] Confirm CQC registration details and add the registration number.

## Notes

- The site renders no user-generated HTML; all content is static and typed.
- Security headers (CSP, X-Frame-Options, etc.) are configured in `next.config.ts`.
- Secrets live only in a local `.env` file, which is git-ignored and never committed.
