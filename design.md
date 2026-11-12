# The Sparkle Bubbly — design direction

## Reference
Adapt the supplied editorial agency reference: oversized serif headlines, compact navigation, generous whitespace, full-width visual panels, asymmetric compositions and a dark closing section. Do not reuse its copy.

## Palette
Rose gold #d4a574, light #e8c9a0, dark #b88a5e; blush #f5e6dc; cream #faf6f2; beige #e8d5c4; soft rose #f0d5d0; champagne #f7e7ce; brown #5a4a42; gray #8b7d77; white #ffffff; light gray #f5f5f5. Dark brown for small text, gold for decoration.

## Type and spacing
Self-host Cormorant Garamond regular/italic for expressive 56–108px serif headings, Poppins for 14–16px body and compact tracked labels. Mobile display 44–62px. Max width 1320px, desktop gutters 48px, mobile 22px. Minimal radii, fine outlines, generous section spacing.

## Web page
Landing: compact nav; headline above peach product showcase; airy story; six-product editorial grid with filters; cinematic occasions; FAQ; newsletter/contact; dark footer. Actual product cutouts from catalogue. Lifestyle photography is illustrative, not the actual business venue.

## Flows
Persistent case cart with accessible drawer and quantities. Checkout opens Take App with explicit notice that selections do not transfer. Newsletter and contact are validated oRPC mutations stored in the database, without claiming email delivery. WhatsApp links carry contextual messages. Loading, success/error, native FAQ, reduced-motion and privacy dialog.

## Architecture
React web UI and Hono oRPC API in packages/web. Tables: subscribers and enquiries. Hooks in queries/leads.ts. Cart localStorage only; no payment capture. SEO metadata and prerendered initial HTML; business entity graph with confirmed catalogue address and social links. No fake reviews, stock status, free shipping or ranking claims.

## Products
Six catalogue products with indicative 6-unit case pricing: 750ml R450, 340ml R165, 300ml R155. Preserve distinction between sparkling products and still 340ml red grape juice. Canonical domain and email forwarding must be verified/configured before public launch.
