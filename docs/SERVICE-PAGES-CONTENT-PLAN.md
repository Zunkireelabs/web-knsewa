# Content Plan: Four Service Detail Pages

## Context

KNSEWA's website at `https://knsewa-dev.zunkireelabs.com/services/commercial` returns 404 — along with three sibling pages (`/government`, `/industrial`, `/infrastructure`). The main `/services` page lists these as "categories" but only links them to in-page anchors (`#commercial`, etc.), not real subpages.

Before building the routes, components, and adapter wiring, we need finished copy that matches the existing site's voice and credibility. The existing site already has strong, specific content on home, about, projects, and contact — concrete project names, real locations in Nepal, real client types. The four new service pages must match that bar.

---

## Voice & Style Rules (derived from existing pages)

- **Voice:** Warm, professional, plainspoken. Confident not boastful. Reads like a senior site engineer who's also a good explainer.
- **Specificity over abstraction:** Name real things — Morang, Koshi province, monsoon, RCC, EIA, Jogbani border. No "world-class solutions for tomorrow."
- **Numbers that exist:** 30+ years, 500+ projects, 7 provinces, 1,000+ team, founded 1995, HQ Biratnagar Morang. Reuse these — don't invent new stats.
- **B2B-first framing:** The reader is a client decision-maker (developer, ministry, factory owner, ward office). Community impact appears as a supporting layer — local jobs, safer schools, all-weather roads, cleaner water — not as the headline frame.
- **Local references to pull from:** Biratnagar industrial corridor, Jogbani border trade, Koshi monsoon flooding & drainage, Sunsari–Morang industrial area, Eastern Nepal regional hospitals/schools, all-weather access during rainy season.
- **Avoid:** NGO/donor language ("upliftment," "empowerment of beneficiaries"), generic SaaS-style hype ("transforming the future of construction"), filler adjectives ("cutting-edge," "world-class").

---

## Page Structure (applied to all four)

Each page maps to the `ServiceDetailContent` type in `src/types/content.ts`:

1. **Hero** — label, headline, description, banner image, breadcrumbs
2. **Overview** — two-column image + text block (`TwoColumnContent`)
3. **What we deliver** — bulleted list of project types under this service (`deliverables?: string[]`)
4. **Process** — 4 steps tailored to this service (`ProcessStep[]`)
5. **Community impact** — two-column image + text + mini-stats (`communityImpact?: TwoColumnContent`)
6. **Related services** — links to the other 3 categories (`ServiceCategory[]`)
7. **CTA** — `CTAContent`

---

## Image Map (using existing assets in `public/images/`)

All four pages launch using images already in the repo — no new photography required for v1.

| Page | Hero | Overview | Community Impact |
|------|------|----------|------------------|
| Commercial | `/images/services/commercial.jpg` | `/images/projects/city-center-featured.jpg` | `/images/team-construction.jpg` |
| Government | `/images/services/government.jpg` | `/images/projects/hospital-featured.jpg` | `/images/projects/project-3.jpg` |
| Industrial | `/images/services/industrial.jpg` | `/images/projects/industrial-featured.jpg` | `/images/team-construction.jpg` |
| Infrastructure | `/images/services/infrastructure.jpg` | `/images/coverage-nepal.jpg` | `/images/projects/project-1.jpg` |

### Image gaps (to address in a later content round)
- No specific Biratnagar street / Sunsari–Morang corridor photo for local hooks
- No bridge or rural road photo for Infrastructure community impact
- No factory-floor or warehouse interior shot for Industrial overview
- No before/after pair for any service

---

# Service 1 — Commercial Construction

**Slug:** `commercial`
**Route:** `/services/commercial`

### Hero
- **Label:** COMMERCIAL CONSTRUCTION
- **Headline:** Commercial Buildings That Earn Their Keep
- **Description:** From office headquarters in Biratnagar to retail and mixed-use developments across Nepal — we deliver commercial spaces built for daily use, long lifespans, and the realities of doing business here.

### Overview (two-column)
- **Label:** WHAT WE BUILD
- **Headline:** Built for the people who use them every day
- **Description:** For 30 years, businesses have come to Khushbu Nirman Sewa when the building has to open on time, run efficiently, and still look the part a decade later. A commercial project isn't only a structure — it's a place where staff arrive every morning, customers walk in, deliveries roll up, and the lights have to stay on. We plan service routes, parking, loading, ventilation, and fire safety before the foundation is dug. We use earthquake-resistant RCC frame designs that meet Nepal's building code, and we specify finishes that hold up to actual foot traffic — not showroom photos. From the seven-storey Deerwalk Complex with double basement in Sifal, Kathmandu, to retail and office work across the Eastern region, we build commercial spaces that earn the trust of the people who run them.

### What we deliver
- Corporate offices and headquarters
- Retail showrooms, shopping complexes, and mixed-use developments
- Hotels, banquet halls, and hospitality buildings
- Commercial high-rise (RCC frame, basement parking, lift cores)
- Branch offices for banks, finance, and insurance
- Fit-outs, renovations, and façade upgrades

### Process (4 steps)
1. **Brief & Feasibility** — We sit with you to understand the business — operating hours, foot traffic, future expansion, budget. Then a feasibility check on the site: setbacks, soil, services, drainage, municipal compliance.
2. **Design Coordination** — We work with your architect (or bring one in) on structural, MEP, HVAC, and finishes. Everything is costed and value-engineered before drawings are frozen.
3. **Build with Weekly Transparency** — Site execution under a dedicated project manager. You get weekly progress photos, billing breakdowns, and a single point of contact. Safety audits at every stage.
4. **Snag, Handover, Support** — Joint snag inspection before handover. Manuals, warranties, and as-built drawings handed over. We're on call for the first 12 months — and reachable after that.

### Community impact
- **Label:** LOCAL IMPACT
- **Headline:** Built by Biratnagar, for Biratnagar
- **Description:** Most of our commercial projects in the East are built by people from the East. Carpenters, masons, electricians, plumbers — hired locally, paid on time, trained on safety on day one. A commercial building in Biratnagar means months of steady work for tradespeople from Morang and Sunsari, contracts for local material suppliers, and once it opens, jobs for the community. We track this, and we hire local first.

### CTA
- **Label:** START A COMMERCIAL PROJECT
- **Headline:** Have a site, a brief, or just a question?
- **Description:** Send us what you have — sketches, a location, or a few lines about what you're planning. Our estimating team will respond within one business day with a preliminary scope.
- **Primary CTA:** Request a Site Visit → `/contact`
- **Secondary CTA:** Email Us Directly → `mailto:khushbunirmansewa@gmail.com`

### Suggested supporting content (future rounds)
- Q&A with the Deerwalk project manager
- Testimonial from a returning commercial client (TODO — sourcing required)
- Impact stats: local hire %, on-time handover %, repeat-client %

---

# Service 2 — Government & Institutional

**Slug:** `government`
**Route:** `/services/government`

### Hero
- **Label:** GOVERNMENT & INSTITUTIONAL
- **Headline:** Public Work, Public Trust
- **Description:** Schools, hospitals, administrative buildings, and public infrastructure — delivered for federal, provincial, and local governments across all seven provinces of Nepal.

### Overview (two-column)
- **Label:** WHAT WE BUILD
- **Headline:** A contractor that knows the procurement process — and respects it
- **Description:** A government project is judged twice — once by the engineer who inspects it, and again by the families who use it for the next forty years. We build for both. Government projects don't reward shortcuts. They reward contractors who price honestly, document carefully, follow specs, and finish on the schedule they committed to. That's the work we've done for the past 30 years. We hold the registration and bonding to bid on federal and provincial tenders, our quality control documentation has cleared technical audits across seven provinces, and we have direct experience with the kind of community coordination that institutional projects in Nepal require — from district consultations to ward-level handovers. The Patan Secondary School at Patandhoka, Lalitpur — for which we received a Letter of Appreciation from Former PM KP Sharma Oli — is one example of how we treat public work.

### What we deliver
- Government schools, secondary and higher secondary
- Hospitals and primary health care centres
- Provincial and federal administrative buildings
- Police, security, and judicial infrastructure
- Public auditoriums, libraries, and community halls
- Earthquake-resistant retrofits and reconstruction

### Process (4 steps)
1. **Tender & Pre-bid Review** — We study the BOQ and specs in detail, raise pre-bid clarifications where it matters, and submit a bid that holds up under scrutiny — no underquoting to win, then change-ordering to survive.
2. **Mobilisation & Stakeholder Coordination** — Once awarded, we mobilise quickly. We coordinate with the client engineer, the district administration, the ward office, and the user community before the first shovel.
3. **Build to Spec, Document Everything** — We work to the approved specification. Every material test, every concrete pour log, every measurement book entry is documented and counter-signed.
4. **Handover, Training & Defects Liability** — Joint final inspection. As-built drawings, O&M manuals, and basic operator training for the user. Defects liability period honoured fully.

### Community impact
- **Label:** LOCAL IMPACT
- **Headline:** Public buildings that serve for generations
- **Description:** When a government school or PHC in Morang opens on time and well-built, the impact is direct: students don't lose a year, mothers don't travel three hours to reach a doctor, ward staff have a real office. Our work on public-sector schools, health posts, and government buildings has put functional public infrastructure into communities across Eastern Nepal — and the same project also puts paid work into the hands of local masons, carpenters, and labourers, often for 18–24 months at a stretch.

### CTA
- **Label:** TENDER OR PROCUREMENT ENQUIRY
- **Headline:** Working on a tender or a public project?
- **Description:** Share the tender notice, RFP, or project brief — our pre-bid team will review and respond. We bid honestly and we deliver what we sign for.
- **Primary CTA:** Pre-Bid Enquiry → `/contact`
- **Secondary CTA:** Call 021-503204 → `tel:021-503204`

### Suggested supporting content (future rounds)
- Short piece on the Patan Secondary School handover
- Testimonial from a federal engineer or head teacher (TODO — sourcing required)
- Document downloads: company registration, PAN, VAT (useful for procurement officers)

---

# Service 3 — Industrial Facilities

**Slug:** `industrial`
**Route:** `/services/industrial`

### Hero
- **Label:** INDUSTRIAL FACILITIES
- **Headline:** Plants, Warehouses, and Logistics That Run for Decades
- **Description:** Purpose-built industrial facilities for the Sunsari–Morang corridor and beyond — designed for efficiency, safety, and the kind of long operational life that pays back the investment.

### Overview (two-column)
- **Label:** WHAT WE BUILD
- **Headline:** Buildings designed around how the operation actually works
- **Description:** The Sunsari–Morang industrial corridor — one of Nepal's busiest — has been home to many of our industrial projects. An industrial building isn't a generic shed — it's a working machine. Where does raw material come in? Where does finished product go out? Where do trucks queue, where do workers park, where's the substation, where's the fire water tank? We answer those questions before drawing a single beam. Our industrial work covers RCC and PEB (pre-engineered) structures, factory and warehouse sheds with crane gantries, MEP and HVAC for clean processes, fire safety to NBC, and yard work including paved roads, drainage, and security. We understand the realities of construction logistics in eastern Nepal — including the monsoon window and the Jogbani–Biratnagar customs flow for imported equipment.

### What we deliver
- Manufacturing plants and factory sheds (RCC or PEB)
- Warehouses, cold stores, and distribution centres
- Logistics yards, paved truck movement areas, weighbridges
- Substations, generator rooms, and utility blocks
- Office and admin blocks within industrial estates
- Plant expansions, brownfield additions, and shutdown work

### Process (4 steps)
1. **Process & Site Walk** — Before we draw anything, we walk the process with you — material flow, headroom, crane load, drainage, power. The facility is designed around the operation.
2. **Engineering & Approvals** — Structural, MEP, fire, and EIA where required. We coordinate factory licence, electrical clearance, and local body approvals so construction isn't held up by paperwork.
3. **Phased Construction (Operation-Aware)** — Brownfield expansions are sequenced so the existing plant keeps running. We work in shutdown windows, weekends, and night shifts when needed.
4. **Commissioning Support** — We coordinate with your equipment vendors during installation and trial runs. Final handover includes all civil, MEP, fire, and statutory documentation.

### Community impact
- **Label:** LOCAL IMPACT
- **Headline:** Industrial work that keeps skilled workers close to home
- **Description:** A working factory in the Sunsari–Morang corridor is jobs — direct manufacturing jobs and indirect work in transport, packaging, supply, and services. When we build an industrial facility well, the multiplier is real: skilled youth from the East find work close to home instead of going abroad. We also build with the surroundings in mind — drainage that doesn't flood the neighbour's field, dust control on the access road, and worker amenities that meet decent-work standards.

### CTA
- **Label:** INDUSTRIAL ENQUIRY
- **Headline:** Planning a new plant or an expansion?
- **Description:** Tell us about your operation — product, footprint, timeline. Our industrial team will visit your site and come back with a feasibility view and an indicative cost.
- **Primary CTA:** Request a Site Visit → `/contact`
- **Secondary CTA:** See Our Work → `/projects`

### Suggested supporting content (future rounds)
- Interview with a factory owner about on-time delivery or shutdown work
- Testimonial from an industrial client (TODO — sourcing required)
- Impact stats: total industrial sq.ft. delivered, brownfield expansions without production loss

---

# Service 4 — Infrastructure Development

**Slug:** `infrastructure`
**Route:** `/services/infrastructure`

### Hero
- **Label:** INFRASTRUCTURE DEVELOPMENT
- **Headline:** The Roads, Bridges, and Pipes That Hold a Region Together
- **Description:** All-weather roads, RCC bridges, drainage, water supply, and urban infrastructure — built across seven provinces to connect communities and keep them connected through every monsoon.

### Overview (two-column)
- **Label:** WHAT WE BUILD
- **Headline:** Built for monsoon, traffic, and the next 40 years
- **Description:** Infrastructure is the work nobody sees until it fails — and then everyone sees it. A road that floods in Asar. A bridge that's washed out for a month. A water line that runs dry in Chaitra. We build infrastructure that holds up because we've spent 30 years learning what Nepal's terrain, monsoon, and traffic actually do to a structure. From the Hetauda–Dhalkebar–Inaruwa 400KV transmission line with Nepal Electricity Authority to the Baikunthe Underground Drinking Water Project in Madi, Chitwan — our infrastructure work shows up in places people depend on. We design for Koshi monsoon volumes, riverbank erosion, freight loads on east–west and feeder roads, and coordinate with road, water, electricity, and irrigation authorities across all seven provinces.

### What we deliver
- Urban and rural road construction, pavement and bitumen
- RCC and steel bridges, box culverts, river crossings
- Stormwater drains, sewerage networks, and urban drainage
- Water supply pipelines, intake works, overhead reservoirs, household connections
- Irrigation canals, headworks, and distribution networks
- Hydropower civil works, substation construction, transmission line civil works
- Suspension footbridges for hill communities

### Process (4 steps)
1. **Survey, Study & Community Consultation** — Topographic survey, soil and hydrological study, traffic counts where relevant. For projects in inhabited areas, we hold ward-level consultations early — alignment, access during construction, land issues.
2. **Detailed Design & Approvals** — Engineering design coordinated with the client department. Where law requires, we complete Initial Environmental Examination or full EIA, and obtain forestry, land, and utility clearances.
3. **Monsoon-Aware Construction Sequencing** — We plan critical works — bridge piers, drainage inverts, pavement layers — into the dry window. Diversions and traffic management keep daily life moving while we work.
4. **Commissioning, Handover & Defects Liability** — Final survey, load tests where applicable, joint inspection with the client department. Defects liability period honoured. We hand over a simple-language community brief on what's been built and who to call if something breaks.

### Community impact
- **Label:** LOCAL IMPACT
- **Headline:** Infrastructure that opens up everyday life
- **Description:** Infrastructure is where the community impact is most direct. A drain that doesn't overflow into the bazaar in Sawan. A bridge that lets children in a Morang village reach their school through the rainy season. A water supply line that reaches households that used to walk to a tap. Across our infrastructure projects, we've built work that opened access to schools and health posts for thousands of households, brought drinking water and irrigation to communities across the East, and provided steady wage work to local labour during construction.

### CTA
- **Label:** INFRASTRUCTURE ENQUIRY
- **Headline:** Planning a road, bridge, water, or energy project?
- **Description:** Whether you're a federal department, a provincial agency, or a local body — share the project brief and we'll respond with our experience on similar work and a pre-bid view.
- **Primary CTA:** Project Enquiry → `/contact`
- **Secondary CTA:** Explore Our Projects → `/projects`

### Suggested supporting content (future rounds)
- Short piece on the Baikunthe drinking water project — what changed for households after connections went live
- Testimonial from a ward chair or household (TODO — sourcing required)
- Impact stats: households served by KNSEWA water lines, km of road delivered, bridge spans completed

---

## Implementation Notes

Files to create/modify when building these pages:

1. **Type extension** — `src/types/content.ts`: add `deliverables?: string[]`, `communityImpact?: TwoColumnContent`, `cta: CTAContent` to `ServiceDetailContent`
2. **Content files** — `src/content/pages/services/{commercial,government,industrial,infrastructure}.ts`
3. **Adapter** — `src/data/adapters/content.adapter.ts`: implement `getServiceBySlug()` and `getAllServiceSlugs()`
4. **Route** — `src/app/services/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`
5. **New components** — `ServiceDeliverablesSection.tsx`, `RelatedServicesSection.tsx`
6. **Update links** — Change `href` in `services.ts` categories and `home.ts` services from `#anchor` to `/services/slug`
