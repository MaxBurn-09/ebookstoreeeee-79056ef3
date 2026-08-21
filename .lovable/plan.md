# Page & Pine — Premium Bookstore E-Commerce

A full storefront in the warm editorial style of your references: forest green + cream, serif headlines, spacious layout, real cart/search/checkout backed by a database.

## Stack note (important)
This project runs on TanStack Start (React + TypeScript + Tailwind + shadcn/ui), not Next.js. It gives the same capabilities — SSR, server functions, routing, SEO metadata. The backend uses Lovable Cloud (Postgres + auth + storage) instead of Prisma/Auth.js. Everything in your brief is buildable; only the framework names change. Payments (Razorpay/Stripe) come in via built-in payment integration at the checkout phase.

## Design system (built first)
- Palette: forest `#17382C`, charcoal `#22201D`, cream `#F7F1E7`, ivory `#FCFAF6`, beige `#E9DDC9`, gold `#C99A52`, taupe `#D8CCBC` — as semantic tokens.
- Type: Playfair Display headings, Inter body. Restrained weights, generous tracking on eyebrows.
- 1360px container, soft radii, thin borders, subtle shadows, quiet hover states.
- Shared primitives: BookCard, SectionHeader, CategoryCard, AuthorCard, Badge, QuantityStepper, empty/loading/error states.

## Phase 1 — Homepage + shell
Announcement bar, sticky header (desktop nav + mobile drawer, search/account/wishlist/cart with count), hero (eyebrow, serif headline, dual CTA, social proof, featured book composition, "New Arrivals This Week" badge), hero search, benefits bar, Find Your Next Read categories, Readers' All-Time Favorites, New Arrivals with filter tabs, Book of the Month editorial banner, Meet the Authors, promo banner, newsletter, trust values, full footer.
Generated warm editorial imagery for hero, category tiles, promo, and book covers. Subtle scroll reveal and hover motion.

## Phase 2 — Catalog
Database: books, authors, categories, publishers, images, reviews, plus seeded demo catalog. Books listing with sidebar filters (category, price, author, rating, language, format, availability), sort, grid/list, pagination. Category pages at `/category/$slug`. Product detail: gallery with zoom, metadata, quantity, add-to-cart/buy-now, wishlist, Description/Details/Reviews tabs, related + also-bought.

## Phase 3 — Commerce
Cart page and slide-in mini cart drawer, wishlist, coupons, order summary with tax/shipping. Global instant search with autocomplete, recent/popular searches, results page.

## Phase 4 — Accounts & checkout
Email/password + Google sign-in, profile data, addresses. Multi-step checkout (Information → Shipping → Payment → Confirmation), order creation, order tracking timeline, My Account dashboard (overview, orders, wishlist, addresses, profile, password).

## Phase 5 — Admin, blog, polish
Role-gated admin for books, categories, authors, orders, customers, reviews, coupons, and homepage content blocks. Editorial blog. Then SEO pass (per-route metadata, Book/Product/Breadcrumb/Organization JSON-LD, sitemap, canonicals), performance, accessibility, and a responsive audit across phone/tablet/desktop.

## Technical notes
- Homepage content is data-driven (content blocks + product tables), not hardcoded in components.
- Row-level security on all user data; roles in a separate table; server-side payment verification.
- Prices in INR (₹) per your copy.

I'll build phase by phase, showing you the homepage first before moving into catalog and commerce.
