---
name: Osama Feshier — Signal Lab
description: A deep-obsidian "data lab" portfolio — restrained, precise, single fluorescent rose accent.
colors:
  fluorescent-rose: "oklch(60% 0.24 355)"
  obsidian: "#07050a"
  obsidian-alt: "#0c0a12"
  surface: "#100e1a"
  surface-raised: "#161324"
  border: "#1f1c30"
  border-lit: "#2e2948"
  instrument-white: "#e8e6ee"
  slate-readout: "#95909e"
  faint-grid: "#8a8594"
typography:
  display:
    fontFamily: "Satoshi, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.8px"
  headline:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.4px"
  title:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1.18rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.5px"
rounded:
  sm: "10px"
  md: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "40px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "oklch(60% 0.24 355)"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "oklch(60% 0.24 355)"
    textColor: "{colors.obsidian}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.slate-readout}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  nav-cta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
---

# Design System: Osama Feshier — Signal Lab

## 1. Overview

**Creative North Star: "The Signal Lab — restrained, precise"**

A clean dark workspace where data becomes decisions, quieted down. The page reads like a precision instrument left running after hours: near-black obsidian fields, a faint engineering grid behind the hero, and a single fluorescent rose signal that marks what matters. Light is never decoration here — the fluorescent rose (the only saturated color) marks a live signal (the status dot), a result (a quantified stat), or a path (a hover, a focus ring). The personality is the senior practitioner who has shipped to production and can prove it: **confident, technical, results-oriented**. Competence is stated plainly, in outcomes, not adjectives.

Density is comfortable, not cramped — generous section rhythm (100px vertical), measured groupings inside. The deep `Obsidian` (#07050a) base does the heavy lifting; surfaces lift only one or two steps off it (`#100e1a` → `#161324`) to carve out cards and panels without ever feeling like a stack of floating boxes. The monospace `JetBrains Mono` carries metadata, kickers, and numbers — the lab-notebook voice — while `Satoshi` carries the prose: sharp, precise, professional with a technical edge.

Color strategy is **restrained**: a single fluorescent rose accent carries emphasis, links, and CTAs at under 10% of any screen. No gradients, no triad, no decorative glass. Motion is quiet: shorter reveals, no floating elements, no counters, no infinite loops. If a visitor notices the animation before the message, it's wrong.

What this system explicitly rejects: **gamified, flashy, game-like portfolios** (no particle playgrounds, no gratuitous 3D, no look-what-I-can-animate spectacle); **crowded CV-dump walls** of every skill and certificate; **generic SaaS / template landing pages** with interchangeable card filler; and **corporate-stiff LinkedIn-clone facelessness**.

**Key Characteristics:**
- Deep-obsidian "data lab" base; single fluorescent rose accent used as signal only.
- Mono metadata + Satoshi prose — the lab-notebook voice over a sharp, technical sans.
- Impact-first: quantified numbers (27%, 72%, 98%) are the loudest content.
- Comfortable density, generous section rhythm, surfaces that lift only 1–2 steps.
- Restrained, quiet motion: gentle reveals, hover lift, no spectacle.

## 2. Colors

A deep-obsidian field with a single fluorescent rose accent. No gradient, no triad.

### Primary
- **Fluorescent Rose** (`oklch(60% 0.24 355)`): The only saturated color. Carries the primary button, link emphasis, the timeline node, section kickers, skill levels, and the focus-ring glow. The "go here" color — rare, electric, impossible to miss.

### Neutral
- **Obsidian** (#07050a): The page base. Near-black with a subtle violet bias; everything else is measured against it.
- **Obsidian Alt** (#0c0a12): The alternating section band and nav backdrop. A single step up from base to separate rhythm without a hard line.
- **Surface** (#100e1a) / **Surface Raised** (#161324): Card and panel fills. Two steps of tonal lift; the raised step is for hover only.
- **Border** (#1f1c30) / **Border Lit** (#2e2948): Hairline dividers at rest; the lit step appears on hover and focus.
- **Instrument White** (#e8e6ee): Primary text. A cool off-white, never pure #fff.
- **Slate Readout** (#95909e): Body and supporting prose on dark surfaces.
- **Faint Grid** (#8a8594): The quietest text — timestamps, stat labels, footer. Verified ≥4.5:1 on obsidian.

### Named Rules
**The Single-Signal Rule.** One saturated color, used deliberately. Fluorescent Rose stays under ~10% of any screen's pixels. Its rarity is what makes a stat or a CTA read as important. No gradients, no triad, no competing accents.

**The Cool-White Rule.** Text is never pure white (#fff) on the obsidian base; always `Instrument White` (#e8e6ee). Pure white vibrates against deep dark; the cool off-white sits.

## 3. Typography

**Display / Body Font:** Satoshi (with system-ui, -apple-system fallback)
**Label / Mono Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** Satoshi — a sharp, precise neo-grotesque that bridges professional document and technical workspace. Clean lines, even weight distribution, no decorative quirks. It reads like it belongs in both a quarterly report and a terminal window. Paired with JetBrains Mono, which handles every machine-readable detail — kickers, dates, stats, tags, code-flavored metadata. The contrast is voice (prose vs. instrument readout), not two competing display faces.

### Hierarchy
- **Display** (700, clamp(2rem → 3rem), 1.1, -0.8px): Hero headline only. One per page.
- **Headline** (700, clamp(1.5rem → 2.1rem), -0.4px): Section titles ("The toolkit", "Selected work").
- **Title** (700, 1.18rem): Card titles, role titles in the timeline, education degrees.
- **Body** (400, 1.05rem, 1.65): Prose. On dark, the 1.65 line-height gives light type room to breathe; cap measure at 65–75ch.
- **Label** (500, 0.82rem, +0.5px, mono): Kickers (`// about`), dates, stat numbers, tags, the brand mark. The lab-notebook layer.

### Named Rules
**The Readout Rule.** Numbers and metadata are set in JetBrains Mono. Every quantified result (27%, 72%, 98%, 4+), every date, every tech tag wears the instrument face. Prose never borrows it; mono is reserved for things that read like a measurement.

**The One-Display Rule.** Display weight (700, -0.8px) appears exactly once per page, on the hero. Section headlines step down to the headline scale.

## 4. Elevation

A nearly flat system that conveys depth through **tonal layering**, not shadow. Surfaces sit one or two steps of lightness above the base obsidian (`#07050a` → `#100e1a` → `#161324`); a hairline `Border` separates them. Shadow appears only on card hover as feedback — a deep, soft, obsidian-tinted lift.

### Shadow Vocabulary
- **Panel lift** (`box-shadow: 0 24px 60px -20px rgba(2,2,6,0.8)`): On card hover. A deep, soft, obsidian-tinted shadow — the surface rising toward you.
- **Button glow** (`box-shadow: 0 10px 24px -8px rgba(255,45,123,0.5)`): Under the primary button on hover only. Subtle.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces are flat at rest, separated only by a 1px border and a tonal step. Shadow appears only as feedback — hover. A card with a resting drop shadow is a 2014 app; if it looks lifted before you touch it, it's wrong.

## 5. Components

### Buttons
- **Shape:** Full pill (999px radius).
- **Primary:** Solid Fluorescent Rose fill, dark obsidian text (#0a070d), 12px/24px padding. Hover lifts 1px with a subtle rose glow.
- **Ghost:** Surface fill, `Border Lit` stroke, Instrument White text. Hover shifts border to Fluorescent Rose and lifts 1px.

### Chips / Tags
- **Style:** `Surface Raised` (#161324) fill, hairline `Border`, mono text. Tech-stack tags use `Slate Readout` text; section/category tags use `Fluorescent Rose` on a transparent fill with a border.
- **Radius:** 7–10px (slightly softer than a pill, not a full pill).

### Cards / Containers
- **Corner Style:** 16px (`rounded.md`); smaller panels use 10px (`rounded.sm`).
- **Background:** `Surface` (#100e1a); hover steps to `Surface Raised`.
- **Border Strategy:** 1px `Border` at rest; shifts to `Border Lit` on hover. No gradient borders, no decorative overlays.
- **Internal Padding:** 24px on project/education cards, 16–18px on skills and pillars.

### Navigation
- **Style:** Fixed top bar, translucent obsidian (`rgba(7,5,10,0.6)`) with a 14px backdrop blur; a hairline border fades in once scrolled. Links are `Slate Readout` mono-adjacent sans at 15px, brightening to Instrument White on hover. The CTA is a pill (ghost treatment) with a focus glow.
- **Mobile:** Hamburger toggles a full-width sheet sliding down from under the bar; links stack with hairline dividers.

### Signature: The Toolkit Board
- A divided capability board: each domain gets a small line icon, a one-sentence production-oriented summary, and a visible set of skill pills. Every pill shows both a mono mastery label (`Lead`, `Strong`, `Working`) and a three-dot signal meter in Fluorescent Rose, so recruiters can scan depth without relying on hover.

## 6. Do's and Don'ts

### Do:
- **Do** treat Fluorescent Rose as the only saturated color — keep it under ~10% of any screen (The Single-Signal Rule).
- **Do** set every number, date, and tech tag in JetBrains Mono (The Readout Rule); let quantified results be the loudest content.
- **Do** keep surfaces flat at rest, separated by a 1px `Border` and a tonal step; reserve shadow for hover state (The Flat-At-Rest Rule).
- **Do** use `Instrument White` (#e8e6ee) for text, never pure #fff (The Cool-White Rule).
- **Do** lead with quantified, verifiable impact — show results, don't claim them.
- **Do** keep motion restrained and quiet: gentle reveals, hover lift. Honor `prefers-reduced-motion` on every animation.

### Don't:
- **Don't** ship gamified or flashy effects — no particle playgrounds, gratuitous 3D, or look-what-I-can-animate spectacle. If the animation is noticed before the message, delete it.
- **Don't** build a crowded CV-dump wall of every skill, course, and certificate. Curate for impact.
- **Don't** fall back to generic SaaS / template patterns — no interchangeable icon-heading-text card grids, no hero-metric template cliché.
- **Don't** read as a corporate-stiff LinkedIn clone; keep a distinct point of view.
- **Don't** use gradient-clipped text (`background-clip: text`). Use solid Fluorescent Rose for emphasis.
- **Don't** let `Faint Grid` (#8a8594) carry body copy — it fails 4.5:1 on the obsidian base. Reserve it for large text, labels, and non-essential metadata.
- **Don't** add multiple saturated accents, gradient borders, glassmorphism, or floating badges. Quiet means precise.
