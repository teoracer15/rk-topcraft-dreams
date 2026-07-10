# Redesign: Costa del Sol Concierge

Rework `src/routes/index.tsx` and `src/styles.css` around the chosen prototype: a warm hospitality-editorial system — bone/ivory base, deep navy ink, and champagne-gold accents — with Playfair Display + Cormorant Garamond serifs and Inter for UI.

## Design tokens (src/styles.css)
- `--background` bone `#FAF7F2`, `--foreground` navy `#141B2D`
- `--accent` champagne gold `#C5A059`, hover `#B48F48`
- `--surface` white `#FFFFFF`, `--ink-dark` `#0D121F` (Ronda section)
- Fonts: Playfair Display (display), Cormorant Garamond (serif body), Inter (UI micro-labels). Loaded via `<link>` in `__root.tsx` head.
- Utilities: `.eyebrow` (uppercase tracking-widest gold micro-label), `.rule-gold` (hairline gold divider), reveal-on-scroll respected.

## Section-by-section rebuild (keep all current content)
1. **Nav** — transparent-over-hero, solidifies on scroll. Serif wordmark, gold hover underline, EN/ES/DE/RU switcher pill on the right. Mobile drawer stays.
2. **Hero** — full-bleed villa photo, black/30 wash + bottom fade to bone. Playfair headline "Building *Legacies* on the Mediterranean Coast" with italic emphasis, gold "View Portfolio" + ghost "Inquire Now". Preserve Ken Burns, add gold hairline scroll indicator.
3. **Location ticker** — white band, dot-separated Marbella · Estepona · Mijas · Benalmádena · Sotogrande in wide-tracked caps.
4. **Concierge Services** — 5/7 split: left column with gold eyebrow, italic Playfair headline, and clickable service rows (arrow slides right on hover); right column is a large 4:5 image inside an offset gold hairline frame with a floating white pull-quote card. Keeps existing services (New Builds, Renovations, Pools, Project Management).
5. **Projects** — filterable masonry retained; restyled with white cards, gold hover frames, thin serif captions, and metadata (year · area · m²).
6. **Before/After** — same drag slider, framed by offset gold hairline; italic Playfair section title.
7. **Process** — horizontal scroll timeline restyled with large gold numerals (01…06) and serif step titles on ivory.
8. **Ronda teaser** — dark `#0D121F` section, grayscale/blurred cliff backdrop with left-to-right gradient. Keeps click-to-swap concept paintings on the right; left column adopts "The *Mystery* of Ronda" headline, gold eyebrow, and "Request Early Access" underline CTA. Preserves existing lazy-load + swap interaction.
9. **Map** — Google Maps iframe kept; wrapped in offset gold frame with municipality legend restyled as gold-dot chips.
10. **Testimonials** — auto-play carousel restyled as centered italic Playfair pull-quotes with gold rule and small caps attribution.
11. **FAQ** — accordion on white with hairline gold dividers, serif questions.
12. **Contact** — white card with heavy padding, split 2-col: left info (Location, Inquiries, WhatsApp, EN/ES/DE/RU languages line), right form with underline inputs (no boxes), navy submit button that turns gold on hover. Existing Supabase insert + WhatsApp handoff untouched.
13. **Footer** — bone with gold hairline top border, serif wordmark, license B75276881, socials, minimal legal row.

## Preserved behavior (no logic changes)
- Language dictionary and switcher (EN/ES/DE/RU).
- Supabase `leads` insert on form submit + WhatsApp fallback.
- Filterable gallery, lightbox, before/after slider, Ronda swap interaction, Google Maps iframe, WhatsApp float, reveal-on-scroll, `prefers-reduced-motion`.

## Technical notes
- Font `<link>` tags added in `src/routes/__root.tsx` head (not `@import` in CSS).
- All colors driven through semantic tokens in `src/styles.css`; no hardcoded hex in components.
- Head metadata (title, description, og:*) updated to reflect the concierge positioning.

Nothing else changes — only presentation.
