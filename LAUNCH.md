# The Sparkle Bubbly — launch notes

## What is delivered

This is the approved **React + Vite + Bun/Hono** managed website, not Next.js. It has six catalogue products, responsive layouts, product details and filters, a browser-persistent case cart, Take App checkout links, newsletter and enquiry storage, FAQ, email links, Maps links and contextual WhatsApp CTAs.

The source ZIP is suitable for creating your own GitHub repository. It excludes credentials, installed dependencies, build caches and database records. No GitHub push, public deployment or Business Profile edit has been performed.

## Important operating limits

- **Take App:** the cart is a local selection tool. Take App does not receive those selections through this implementation. Customers see this before continuing, and can copy the selection or send it through WhatsApp.
- **Forms:** newsletter signups and enquiries are stored in the provisioned database. There is no email delivery or newsletter sending integration. Direct email and WhatsApp links work separately. Configure an email/CRM provider and a secure management workflow before accepting production leads at scale.
- **Pricing:** all prices are indicative, per case of six, taken from the supplied catalogue. Confirm availability and final prices in Take App. The 340 ml bottle is described as still red grape juice, not sparkling.
- **Business details:** the address comes from the supplied catalogue. Confirm the business address, public-visit arrangements, delivery coverage and phone number against your Google Business Profile before publishing. No business hours, ratings or reviews were invented.
- **Domain:** `https://sparkle-bubbly.co.za/` is an assumed canonical domain based on the supplied email address, not a verified hosting connection. Replace it everywhere if your final domain differs.
- The supplied PDF could not be parsed as a valid PDF. Product imagery and copy were extracted from the readable PowerPoint.

## Local development and source export

1. Extract the ZIP and commit the source to a repository you own.
2. Install Bun, then run `bun install` at the repository root.
3. Supply your own database URL and authentication token in the root `.env`. Keep this file out of Git. The live Runable preview already has provisioned credentials; these are deliberately excluded from the download.
4. Run `bun run db:push` from `packages/web` to apply the subscriber/enquiry tables to your own database.
5. Run `bun run dev` from the root. The managed website uses the fixed port in `__ports.cjs`.
6. Build with `bun run build`. The web package's build runs `scripts/prerender.tsx` after Vite, placing the full landing-page HTML in `packages/web/dist/index.html` so the initial content is readable without JavaScript.
7. Check with `bun run lint`, `bun run typecheck`, and `bunx tsc -b packages/web`.

The database schema is in `packages/web/src/api/database/schema.ts`; form procedures are in `src/api/routes/leads.ts`. Use your database's secure console to access stored leads. There is deliberately no publicly exposed lead-list endpoint. Rate limiting is in-memory and needs distributed enforcement if you run multiple production instances.

## Vercel or Cloudflare

Both platforms support Vite frontends. From the repository root, the frontend build command is `bun run --filter @template/web build`, with output directory `packages/web/dist`.

**A static deployment alone is not a complete full-stack deployment.** It serves the page, cart and outbound links, but does not host the Hono `/api/rpc/*` endpoints used by the forms. Before going live on Vercel, adapt the Hono API to Vercel Functions; for Cloudflare, use a Worker/Pages Functions adapter and configure compatible database bindings/environment handling. Route `/api/rpc/*` to that backend and verify submissions on the deployed domain. Alternatively, keep the full-stack app on Runable and use the platform's publishing/domain controls.

No Vercel or Cloudflare adapter is claimed to be implemented or deployed in this handoff. Do not publish a static-only copy while leaving the forms presented as operational.

Official references:
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [React + Vite on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)

## SEO handoff

### Implemented homepage meta description — 151 characters

> Shop alcohol-free sparkling red and white grape juices from The Sparkle Bubbly in Cape Town. Add elegant bubbles to weddings and everyday celebrations.

The description deliberately connects the central brand entity, product category, red/white variants, Cape Town location and occasion-led shopping intent. It keeps the inclusive celebration tone of the catalogue and social presence. It is a concise search snippet, not a keyword list or a guarantee of ranking.

Implemented: title and description, `en-ZA`, canonical tag, Open Graph and social-preview image, robots.txt, single-page XML sitemap, pre-rendered homepage, visible address/contact facts, descriptive image alternatives and JSON-LD linking LocalBusiness, WebSite, WebPage and the six-product collection. No unverified review scores, availability or certifications are marked up. Collection markup alone is not a guarantee of product rich results; dedicated product pages with accurate offers are the next step.

### Semantic SEO next steps inspired by Koray's methodology

Treat the **brand** as the business entity and **alcohol-free sparkling grape juice** as the core topical entity. Build a connected content network around attributes and user tasks, rather than repeating phrases:

| Future content | Intent and entity connections |
|---|---|
| Individual red/white product pages | Brand → grape variant → format → case quantity → actual price → purchase |
| Sparkling grape juice for weddings | Guest count → inclusive toast → quantity planning → serving → bulk enquiry |
| Retail and hospitality supply | Venue type → pack sizes → menu use → wholesale enquiry |
| Red versus white grape juice | Flavour → food pairings → occasion → relevant products |
| Serving and storing grape juice | Temperature → cork handling → storage instructions → product labels |
| Cape Town delivery and collection | Verified location → service area → charges → ordering process |

Write answers using verified product and fulfilment facts. Link supporting articles to the relevant products and ordering sections. Avoid speculative health, pregnancy-safety, certification or ingredient claims without authoritative product evidence. This landing page starts the topical structure; it does not, by itself, establish comprehensive topical authority.

### Google Business Profile and launch checklist

- Confirm the preferred canonical domain; update `packages/web/index.html`, `public/robots.txt` and `public/sitemap.xml`, including JSON-LD IDs and absolute image URLs.
- Keep the business name, contact number and address consistent with the verified Business Profile. Do not add keywords to the official business name.
- Add the final website link to your Business Profile and maintain accurate categories, hours and product information. If customers are not served at the address, follow Google's service-area-business rules rather than publishing a residential address by default.
- Seek genuine customer reviews without incentives and respond helpfully; never add invented ratings to the site.
- Validate markup using Google's Rich Results Test; product collection markup may not generate a rich-result feature. Validate robots, canonical URL and sitemap on the actual live domain.
- Set up Search Console, submit the sitemap and review indexing and query performance. Test mobile usability and production page performance.
- Review analytics, privacy, data retention and consent requirements; the privacy notice is operational copy, not legal advice.

Organic website rankings and Maps/local rankings are related but distinct. Google says local results depend primarily on relevance, distance and popularity. Meta descriptions can inform the search snippet; Google may generate a different snippet from page content. No ranking position is promised.

Sources consulted: [Google snippets guidance](https://developers.google.com/search/docs/appearance/snippet), [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product), [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en), [Business representation rules](https://support.google.com/business/answer/3038177?hl=en), [Koray's topical-authority case study](https://www.oncrawl.com/technical-seo/importance-topical-authority-semantic-seo/), the supplied catalogue, and the public [Take App store](https://take.app/sparklebubbly). Accessed 11 November 2026. OpenSEO was unavailable in this environment.
