# Koinity Cinema On-Demand Platform - Design Guidelines

## Visual Identity

**Color Palette:**
- Background: `#0B0B0F` (very dark, cinema-inspired)
- Primary Text: `#EDEDED` (high contrast for readability)
- Accent (CTAs, highlights): `#FF6B00` (vibrant orange)
- Secondary Text: `#6F7787` (muted for supporting content)
- Borders/Dividers: `#1C1F26` (subtle separation)

**Typography:**
- UI Elements: Inter (navigation, body text, forms, labels)
- Titles & Quotes: Playfair Display (hero headlines, article titles, testimonials)
- Strong typographic hierarchy with generous line-height for readability

**Design Style:**
- Card-based layouts with `2xl` rounded corners
- Soft shadows for depth and elevation
- Generous spacing between sections and components
- Grid-based layouts for film proposals and content sections
- Micro-animations on hover/focus states (subtle, cinema-appropriate)

## Layout & Spacing

Use Tailwind spacing units of 4, 6, 8, 12, 16, 20, 24, and 32 for consistency:
- Section padding: `py-16` to `py-24` on desktop, `py-12` on mobile
- Card padding: `p-6` or `p-8`
- Component gaps: `gap-6` or `gap-8` for grids
- Container max-width: `max-w-7xl` for main content areas

## Core Components

**Navbar (Sticky):**
- Koinity logo (text-based with accent color)
- Primary navigation links (Home, Vota, Proponi, Community, Cinema, Chi Siamo, Blog, Contatti)
- Prominent CTA button "Proponi un film" (orange accent)
- Dark/light theme toggle
- Mobile hamburger menu

**Footer:**
- Newsletter signup form with email validation
- Quick navigation links grouped by category
- Social media links (placeholder icons)
- Copyright and legal links (Privacy, Termini)

**Card Proposta (Reusable Film Proposal Card):**
- Film poster image (aspect ratio 2:3)
- Title (Playfair Display, bold)
- City and venue hint (smaller text)
- Target date display
- Tag pills for genres/categories
- Progress bar showing votes toward goal (accessible with aria-labels)
- Vote count / goal threshold numbers
- Badge for "Non in distribuzione" if rights status unknown
- CTA button "Vota" or "Pre-prenota" (orange accent)

**Progress Bar:**
- Accessible implementation with aria-valuenow, aria-valuemin, aria-valuemax
- Percentage display and actual numbers (e.g., "245/500 voti")
- Orange fill color matching brand accent
- Smooth fill animation

**Stepper ("Come Funziona"):**
- 4-step horizontal layout (responsive to vertical on mobile)
- Icons for each step (lucide-react library)
- Step number, title, and brief description
- Visual connection between steps

**Modal (Pre-booking Confirmation):**
- Dark background overlay
- Centered modal with film details
- Confirmation message
- Primary action button (confirm) and secondary (cancel)

**Toast Notifications:**
- Success messages for form submissions and votes
- Position: top-right
- Auto-dismiss after 4 seconds
- Orange accent for success states

## Page-Specific Layouts

**Home (/):**
- Hero section with large headline (Playfair Display), subheadline, and dual CTAs
- Grid of 3-4 film poster mockups as visual interest
- "Come funziona" section with 4-step stepper
- "Perché Koinity" with 3 value pillars in cards
- "In evidenza vicino a te" grid of 6-8 proposal cards with progress bars
- Social proof section with numbers/quotes
- Newsletter CTA before footer

**Proponi un Film (/proponi):**
- Form-focused layout with clear field labels
- Fields: Title, Trailer Link, City/Area, Preferred Venues (free text), Date Window, Duration, Rights Notes, Tags (multi-select), Image Upload
- Generous spacing between form groups
- Validation messages in orange for errors
- Large submit button with success toast on completion
- Sidebar with submission guidelines or tips

**Vota & Partecipa (/vota):**
- Filter bar (city, date, genre, search) sticky below navbar
- Masonry or standard grid of proposal cards (3-4 columns on desktop, 1-2 on tablet, 1 on mobile)
- Pagination or infinite scroll
- Skeleton loaders while data loads

**Proposal Detail (/vota/[slug]):**
- Large poster image (left column on desktop)
- Film information panel (right column): title, synopsis, city, venue, dates
- Progress section with detailed breakdown and timeline
- Mock conversation thread with light comments/coordination
- Tiered unlock visualization showing discount thresholds
- Prominent "Pre-prenota" CTA

**Community, Cinema, Chi Siamo Pages:**
- Full-width sections alternating content density
- Mix of text blocks, images, and CTAs
- Form sections (ambassador signup, demo request) with proper validation
- Team section with placeholder avatars and bios

**Blog (/blog):**
- Grid of article cards (2-3 columns) with featured image, title, excerpt, date
- Individual post pages with full-width hero image, typography-focused layout

**Contact (/contatti):**
- Two-column layout: contact form (left), embedded map placeholder (right)
- Form fields: name, email, message
- Success toast on submission

## Accessibility & Interactions

- All interactive elements have visible focus states (orange outline)
- Semantic HTML (nav, main, article, section, footer)
- Aria-labels on icons and progress bars
- Keyboard navigation support
- Minimum contrast ratio AA compliance
- Hover states: subtle scale (scale-105) or brightness change
- Click/tap states: slight scale-down (scale-95)

## Images

**Hero Section:**
- Large background image: Cinema interior with seats or film reels, dark and moody
- Semi-transparent dark overlay for text readability
- CTAs with blurred glass-morphism backgrounds

**Film Posters:**
- Use placeholder poster images for mock proposals
- Maintain 2:3 aspect ratio
- Lazy loading for performance

**Additional Imagery:**
- Team photos for Chi Siamo page
- Cinema venue photos for Cinema page
- Blog article featured images

**Dark/Light Theme:**
- Default to dark mode (cinema aesthetic)
- Toggle switches colors but maintains orange accent
- Light mode uses inverted palette with softer backgrounds

**Performance:**
- Skeleton loaders for grids and lists (shimmer animation)
- Optimized images with Next.js Image component
- Lazy loading for below-fold content