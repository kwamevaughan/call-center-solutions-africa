# Migration Tracker

## Status Legend
- ✅ Done
- 🔄 In Progress
- ⏳ Pending

---

## 1. CMS Migration (Supabase → Sanity)
| Area | Status | Notes |
|------|--------|-------|
| Blog schema + content | ✅ | Posts, categories, authors in Sanity |
| Careers schema + content | ✅ | Job postings in Sanity |
| Remove Supabase files | ✅ | All hooks, lib, admin pages deleted |
| Remove TipTap editor | ✅ | Was used only in deleted admin blog UI |

---

## 2. TypeScript Migration

### New files (fully typed, no @ts-nocheck)
| File | Status |
|------|--------|
| `src/pages/careers.tsx` | ✅ |
| `src/pages/careers/[slug].tsx` | ✅ |
| `src/components/careers/ApplicationForm.tsx` | ✅ |
| `src/components/SEO.tsx` | ✅ |
| `src/components/FloatingCTA.tsx` | ✅ |
| `src/lib/blogService.ts` | ✅ |
| `src/components/BlogCard.tsx` | ✅ |

### Legacy files (renamed .js → .tsx/.ts, `@ts-nocheck` added — needs proper types)
| File | Priority | Notes |
|------|----------|-------|
| `src/layouts/header.tsx` | High | Used on every page |
| `src/layouts/footer.tsx` | High | Used on every page |
| `src/pages/_app.tsx` | High | App shell |
| `src/pages/_document.tsx` | High | HTML document |
| `src/pages/index.tsx` | High | Homepage |
| `src/pages/blog/index.tsx` | Medium | Blog listing |
| `src/pages/blog/[slug].tsx` | Medium | Blog detail |
| `src/pages/case-studies.tsx` | Medium | |
| `src/pages/case-studies/[slug].tsx` | Medium | |
| `src/pages/contact-us.tsx` | Medium | |
| `src/pages/about-us.tsx` | Medium | |
| `src/pages/industries.tsx` | Medium | |
| `src/pages/services/*.tsx` | Low | 8 service pages |
| `src/pages/delivery-models.tsx` | Low | |
| `src/pages/terms-of-service.tsx` | Low | Static content |
| `src/pages/privacy-policy.tsx` | Low | Static content |
| `src/pages/responsible-disclosure.tsx` | Low | Static content |
| `src/pages/security-and-compliance.tsx` | Low | Static content |
| `src/pages/global-compliance-playbook.tsx` | Low | Static content |
| `src/pages/data-processing-addendum.tsx` | Low | Static content |
| `src/pages/thank-you.tsx` | Low | Static content |
| `src/pages/studio/[[...index]].tsx` | Low | Sanity Studio embed |
| `src/pages/api/send-email.ts` | Medium | API route |
| `src/pages/api/submit-application.ts` | Medium | API route |
| `src/pages/api/notify-google.ts` | Low | API route |
| `src/components/ContactForm.tsx` | Medium | Used on contact page |
| `src/components/ContactModal.tsx` | Medium | Used globally |
| `src/components/BlogCardProfessional.tsx` | Medium | Blog card UI |
| `src/components/GoogleReviewsTestimonials.tsx` | Medium | Homepage |
| `src/components/SectionBridgeVideo.tsx` | Medium | Homepage |
| `src/components/OurSolutionsSlider.tsx` | Low | Homepage |
| `src/components/FeatureCarousel.tsx` | Low | Homepage |
| `src/components/TestimonialSlider.tsx` | Low | |
| `src/components/HeroSlider.tsx` | Low | |
| `src/components/IndustriesTab.tsx` | Low | |
| `src/components/DeliveryModels.tsx` | Low | |
| `src/components/LogoMarquee.tsx` | Low | |
| `src/components/Marquee.tsx` | Low | |
| `src/components/ScrollToTop.tsx` | Low | |
| `src/data/caseStudies.ts` | Medium | Needs typed interface |
| `src/data/googleReviews.ts` | Low | Static data |
| `src/data/menuData.ts` | Medium | Used in header |
| `src/lib/schemas.ts` | High | Structured data helpers |
| `src/lib/indexing.ts` | Low | Google Indexing API |

---

## 3. Pages Router → App Router Migration

> **This is a significant undertaking — do in a separate branch.**

### Strategy
- Migrate one route at a time alongside the existing pages router
- Next.js supports both routers simultaneously during transition
- New App Router files go in `src/app/`

### Proposed feature-based folder structure (App Router)
```
src/
  app/
    (site)/                  # Public site layout group
      layout.tsx             # Header + Footer + FloatingCTA
      page.tsx               # Homepage
      about-us/page.tsx
      contact-us/page.tsx
      careers/
        page.tsx             # Listing
        [slug]/page.tsx      # Detail
      blog/
        page.tsx             # Listing
        [slug]/page.tsx      # Detail
      case-studies/
        page.tsx
        [slug]/page.tsx
      services/
        page.tsx
        [slug]/page.tsx
      industries/page.tsx
      delivery-models/page.tsx
      legal/                 # Static legal pages group
        privacy-policy/page.tsx
        terms-of-service/page.tsx
        responsible-disclosure/page.tsx
        security-and-compliance/page.tsx
        global-compliance-playbook/page.tsx
        data-processing-addendum/page.tsx
    studio/                  # Sanity Studio (no site layout)
      [[...index]]/page.tsx
    api/                     # Route handlers (stays same)
  components/
    ui/                      # Reusable primitives (Button, Card, etc.)
    layout/                  # Header, Footer, FloatingCTA
    blog/                    # Blog-specific components
    careers/                 # Careers-specific components
    home/                    # Homepage-specific sections
  lib/                       # Shared utilities + Sanity client
  data/                      # Static data files
  types/                     # Shared TypeScript interfaces
```

### Migration order (suggested)
1. ⏳ Set up `src/app/` with root layout
2. ⏳ Migrate static legal pages first (simplest, no data fetching)
3. ⏳ Migrate blog (already well-typed)
4. ⏳ Migrate careers (already well-typed)
5. ⏳ Migrate homepage + service pages
6. ⏳ Migrate remaining pages
7. ⏳ Delete `src/pages/` once all routes migrated

### Key changes required
- `getStaticProps` / `getStaticPaths` → `generateStaticParams` + async page components
- `useRouter` for navigation → `next/navigation`
- `next/head` SEO → `generateMetadata` export
- `_app.tsx` providers → root `layout.tsx`
- `_document.tsx` → root `layout.tsx` `<html>` tag
- API routes → Route Handlers (`route.ts`)

---

## 4. Build Health
| Check | Status |
|-------|--------|
| TypeScript (`tsc --noEmit`) | ✅ 0 errors |
| Production build (`pnpm build`) | ✅ 57 pages |
| Sanity CMS connected | ✅ |
| Supabase fully removed | ✅ |
| TipTap fully removed | ✅ |
