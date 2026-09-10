# Homepage Mobile Optimization Audit

**Date:** 2026-05-26  
**Scope:** Homepage + layout components (Header, Footer, ContactPanel)

---

## Homepage Sections (render order)

1. HeroSection
2. StatsSection
3. NewsInsightsSection
4. SpecializationsSection
5. ServicesSection
6. ProjectsSection
7. TwoColumnSection
8. CultureSection
9. CareersSection
10. CTASection

---

## Issues by Component

### LAYOUT: Header — `src/components/layout/Header.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | Nav text `text-[1.75rem]` (28px) in mobile menu — too large, causes overflow on 375px screens | 249, 287 | HIGH |
| 2 | Mobile menu toggle `p-2` — touch target ~32px, below 44px minimum | 196 | HIGH |
| 3 | `minHeight: '3.5rem'` on menu items — hardcoded, no mobile variant | 243, 245 | MEDIUM |
| 4 | Nav item button `p-3` — touch target ~40px, below 44px minimum | 256 | MEDIUM |

---

### LAYOUT: ContactPanel — `src/components/layout/ContactPanel.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | `max-w-lg` (512px) — panel wider than most phones (375px); no responsive override | 113 | HIGH |
| 2 | Header padding `px-8 py-6` (32px horizontal) — excessive on narrow screens | 118 | MEDIUM |
| 3 | Form inputs `py-3` — total height ~40px, below 44px minimum touch target | 176, 196, 213, 232, 249, 274 | MEDIUM |
| 4 | Content padding `p-5 sm:p-8` — 20px minimum too tight on 320px screens | 130 | LOW |

---

### LAYOUT: Footer — `src/components/layout/Footer.tsx`

Component delegates all styling to CSS classes in `globals.css` — see globals.css issues below.

---

### globals.css — `src/app/globals.css`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | `--container-padding: 2rem` — no mobile override; style guide specifies 1rem on mobile | 131 | HIGH |
| 2 | `.hero-section` `min-height: 580px` — exceeds viewport height on small phones | 1045 | HIGH |
| 3 | `.footer` padding `5rem 0 2rem` — no mobile reduction rule | 2425–2436 | MEDIUM |
| 4 | No 320–480px breakpoints anywhere — extra-small phones not covered | all | MEDIUM |
| 5 | Breakpoint inconsistency: style guide says 719px, CSS uses 768px | all media queries | LOW |

---

### HeroSection — `src/components/sections/HeroSection.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | Scroll indicator at `bottom-12` (48px) — may be cut off by browser UI on mobile | 133 | MEDIUM |
| 2 | `maxWidth: 800px` on hero content — no mobile constraint for narrow screens | 112 | MEDIUM |
| 3 | Scroll indicator text `text-sm` (14px) — small on mobile | 135 | LOW |

---

### StatsSection — `src/components/sections/StatsSection.tsx`

Not audited in initial pass — review during fix pass.

---

### NewsInsightsSection — `src/components/sections/NewsInsightsSection.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | Featured article image `marginBottom: '32px'` — hardcoded, not responsive | 97 | MEDIUM |
| 2 | Article grid `gap-8 lg:gap-10` — 32px mobile gap excessive for small screens | 74 | MEDIUM |
| 3 | "READ MORE" `fontSize: '14px'` — hardcoded, below 16px iOS auto-zoom threshold | 122 | MEDIUM |
| 4 | Grid article date `fontSize: '12px'` — hardcoded, below readable minimum | 184 | LOW |
| 5 | Featured title `clamp(1.5rem, 2.5vw, 2rem)` — evaluates to ~1.8rem on 320px, may overflow | 110 | LOW |

---

### SpecializationsSection — `src/components/sections/SpecializationsSection.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | `height: '100svh'` hardcoded — forces full-screen height on mobile; should be `min-height` | 100 | HIGH |
| 2 | Mobile grid `grid-cols-2` on 320px — each card ~140px wide, text overflows | 145 | HIGH |
| 3 | Mobile section `py-16` (64px) — excessive vertical padding on small screens | 133 | MEDIUM |
| 4 | Card `aspectRatio: '3/4'` with `width: '100%'` on mobile — very tall cards, no max-height | 176 | MEDIUM |
| 5 | Gradient overlay `padding: '48px 24px 24px'` — 48px top padding hardcoded | 194 | MEDIUM |

---

### ServicesSection — `src/components/sections/ServicesSection.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | `.services-nav` `width: clamp(220px, 20vw, 300px)` — 220px minimum takes significant horizontal space on mobile (globals.css:1164) | 95–109 | MEDIUM |
| 2 | Mobile card `width: clamp(260px, 75vw, 320px)` — on screens < 347px, text overflows card | 161 | MEDIUM |
| 3 | No horizontal scroll hint/indicator for mobile users | 159 | LOW |

---

### ProjectsSection — `src/components/sections/projects/ProjectsShowcase.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | Desktop card `width: clamp(500px, 45vw, 700px)` — 500px minimum is wider than most phones, causes horizontal scroll | 222 | **CRITICAL** |
| 2 | Desktop section `height: '100svh'` — hardcoded full height | 100 | HIGH |
| 3 | Mobile card image hardcoded `height: '260px'` — disproportionately tall on small phones | 413 | MEDIUM |
| 4 | Category badge `fontSize: '0.5625rem'` — 9px, unreadable | 437 | MEDIUM |
| 5 | Description `fontSize: '0.6875rem'` — 11px, too small | 454 | MEDIUM |
| 6 | Scope text `fontSize: '0.6875rem'` — 11px | 460 | MEDIUM |

---

### TwoColumnSection / CultureSection / CareersSection

Not audited in initial pass — review during fix pass.

---

### CTASection — `src/components/sections/CTASection.tsx`

| # | Issue | Lines | Severity |
|---|-------|-------|----------|
| 1 | Phone/email text `fontSize: '0.8125rem'` (13px) — below 16px iOS auto-zoom threshold | 133, 161 | HIGH |
| 2 | Trust icon `20×20` — touch target too small, no padding around it | 129 | MEDIUM |
| 3 | Stats row no gap adjustment for mobile | 140 | MEDIUM |
| 4 | Only one mobile breakpoint at 719px — missing 375px and 480px handling (globals.css:2378–2401) | — | MEDIUM |

---

## Fix Order

| Step | Component | Priority issues |
|------|-----------|----------------|
| 1 | `globals.css` | `--container-padding` mobile override, hero `min-height` |
| 2 | Header | Nav text size, touch targets |
| 3 | HeroSection | Scroll indicator, content max-width |
| 4 | StatsSection | Review pass |
| 5 | NewsInsightsSection | Font sizes, gap |
| 6 | SpecializationsSection | `100svh` → `min-height`, grid-cols, padding |
| 7 | ServicesSection | Card width, nav width |
| 8 | ProjectsSection | **CRITICAL** card width, font sizes |
| 9 | TwoColumn / Culture / Careers | Review pass |
| 10 | CTASection | Font sizes, touch targets |
| 11 | Footer | Padding reduction |
| 12 | ContactPanel | Max-width, input touch targets |

---

## Verification Checklist

- [ ] `npm run dev` running on port 3010
- [ ] Test DevTools at 320px, 375px, 390px, 430px widths
- [ ] No horizontal scroll at any breakpoint
- [ ] All touch targets ≥ 44px
- [ ] No rendered text below 12px
- [ ] `npm run build` passes with no TypeScript errors
