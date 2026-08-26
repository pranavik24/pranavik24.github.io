---
name: Pranavi Kondapalli Portfolio
description: Spotify-inspired portfolio system for AI experience, research, projects, and contact paths.
colors:
  page: "#000000"
  surface: "#101010"
  surface-raised: "#171717"
  surface-hover: "#242424"
  surface-active: "#2b2b2b"
  text: "#f4f4f4"
  text-soft: "#d6d6d6"
  text-muted: "#a7a7a7"
  line: "#ffffff17"
  accent: "#5be16f"
  accent-ink: "#041407"
  light-page: "#f6f6f3"
  light-surface: "#ffffff"
  light-surface-raised: "#f0f0ec"
  light-surface-hover: "#deded7"
  light-text: "#171717"
  light-muted: "#656565"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 4.8vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.18rem, 2vw, 1.48rem)"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    lineHeight: 1.2
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
rounded:
  panel: "8px"
  small: "6px"
  cover: "7px"
  control: "999px"
  circle: "50%"
spacing:
  shell-gap: "0.5rem"
  panel-pad: "0.85rem"
  section-x: "clamp(1rem, 3vw, 2rem)"
  section-y: "clamp(2rem, 4vw, 3rem)"
  control-gap: "0.55rem"
  row-gap: "0.9rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.circle}"
    width: "4.2rem"
    height: "4.2rem"
  button-secondary:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "0 1.3rem"
    height: "2.55rem"
  icon-button:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.circle}"
    width: "3rem"
    height: "3rem"
  search-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
    height: "3rem"
  panel-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.35rem, 2.6vw, 2rem)"
  album-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "0.85rem"
---

# Design System: Pranavi Kondapalli Portfolio

## 1. Overview

**Creative North Star: "The Spotify Artist Profile for AI Work"**

This system treats a technical portfolio like a familiar desktop music product. The shell, library, artist hero, album shelf, track rows, player controls, and now-listening panel are not decoration; they are the organizing metaphor for browsing Pranavi's AI research, projects, experience, and contact paths.

The atmosphere is dark, sleek, clean, and interface-native. It should feel close enough to Spotify's desktop rhythm that visitors immediately understand how to explore, while personal imagery, CMU context, project content, and contact choices keep it from feeling like a copied product skin.

The system rejects generic portfolio grammar: no template project grids as the primary experience, no ornamental landing-page decoration, no disconnected resume blocks, and no color changes without Pranavi's approval. The existing Spotify-like green accent and dark surface ladder are identity, not placeholders.

**Key Characteristics:**
- Desktop app shell with top navigation, left library, central content, optional detail rail, and persistent player bar.
- Dark tonal surface ladder, one green accent, and photography-backed identity moments.
- Dense but scannable rows and shelves that map experience to tracks and projects to albums.
- Rounded controls are pill or circle; panels and cards stay tightly rounded at 8px.
- Motion is stateful and restrained: hover lift, carousel progress, player progress, detail fade, and toast entry.

## 2. Colors

The palette is a Spotify-like dark interface with one bright green action accent and a documented light theme that should remain secondary.

### Primary
- **Spotify Action Green**: Primary action, selected state, verified badge, active carousel dot, selected project text, positive status, and visit-count emphasis.
- **Deep Green Ink**: Text on green accent surfaces so badges, play buttons, and status pills remain readable.

### Neutral
- **Black App Canvas**: Outer page and footer player background; anchors the desktop-app feel.
- **Panel Black**: Library, content, detail, and card container background at rest.
- **Raised Charcoal**: Search fields, icon buttons, dropdowns, album cards, and secondary controls.
- **Hover Charcoal**: Row hover, card hover, and active surface feedback.
- **Primary Text**: Main headings, row titles, card titles, and control labels.
- **Soft Text**: Icons and secondary-but-actionable text.
- **Muted Text**: Subtitles, metadata, timestamps, descriptions, and lower-priority context.
- **Hairline Divider**: Low-contrast borders between app surfaces, rows, cards, and controls.

### Named Rules

**The One Accent Rule.** Green is the only brand accent. Do not introduce a second accent hue without explicit approval.

**The Color Consent Rule.** Color changes require consultation with Pranavi before implementation. The current dark palette and Spotify-like green are part of the product identity.

**The Dark Default Rule.** Dark mode is the primary expression. The light theme exists for preference support, but new work should be designed against the dark shell first.

## 3. Typography

**Display Font:** Inter with system UI fallbacks
**Body Font:** Inter with system UI fallbacks
**Label/Mono Font:** Inter with system UI fallbacks

**Character:** The type system is interface-like, direct, and familiar. It uses a single sans-serif stack with weight, size, and density shifts rather than decorative font pairing.

### Hierarchy
- **Display** (700, `clamp(2.4rem, 4.8vw, 4.8rem)`, 0.9): Hero identity only, especially "Pranavi Kondapalli."
- **Headline** (700, `clamp(1.18rem, 2vw, 1.48rem)`, 1.1): Section titles such as Work Experience and Projects.
- **Title** (650, `1rem`, 1.2): Track titles, card titles, library labels, now-playing labels, and detail headings.
- **Body** (400, `0.95rem`, 1.55): Descriptions in detail panels and connection copy.
- **Label** (700, `0.85rem`, 1): Buttons, metadata, compact links, and player/control labels.

### Named Rules

**The Interface Type Rule.** Do not introduce a decorative display face. The Spotify familiarity depends on compact, system-like typography.

**The First-Screen Clarity Rule.** Hero type must keep Pranavi's name readable and unbroken on desktop and mobile; if it overflows, reduce the scale before rewriting the identity.

## 4. Elevation

Depth is a hybrid of tonal layering and a small shadow vocabulary. The interface should mostly read through surface color changes, borders, and density. Shadows are allowed for major panels, dropdowns, profile imagery, toasts, and primary controls, but they must stay functional rather than decorative.

### Shadow Vocabulary
- **Panel Ambient** (`box-shadow: 0 18px 50px var(--shadow)`): Major app panels and toast surfaces.
- **Search Menu Lift** (`box-shadow: 0 22px 58px var(--shadow)`): Search results dropdown only.
- **Hero Portrait Lift** (`box-shadow: 0 14px 38px rgb(0 0 0 / 35%)`): Circular profile image over photographic hero.
- **Primary Control Lift** (`box-shadow: 0 12px 30px rgb(0 0 0 / 24%)`): Large play button only.
- **Active Dot Glow** (`box-shadow: 0 0 18px rgb(91 225 111 / 30%)`): Active carousel dot only.

### Named Rules

**The Tonal First Rule.** Use surface changes before shadows. If a shadow is not clarifying stacking, selection, or focus, remove it.

**The No Ghost Card Rule.** Do not pair a decorative border with a large soft shadow on ordinary cards. Album cards rely on tonal hover and small movement, not plush depth.

## 5. Components

### Buttons
- **Shape:** Primary play controls are circular; text actions are pill-shaped (`999px`); panel buttons stay compact.
- **Primary:** Green circular play button uses accent green with deep green ink and a modest lift.
- **Hover / Focus:** Controls change background or color and translate by `-1px`; primary play scales to `1.04`.
- **Secondary / Ghost / Tertiary:** Resume and follow-style buttons use transparent or charcoal surfaces with hairline borders and bold compact labels.

### Chips
- **Style:** Category chips and tag pills use pill radius, raised charcoal backgrounds, hairline borders, and muted text.
- **State:** Chips are navigational filters, not badges for decoration. Selected and active meanings should use both color and text/ARIA state when possible.

### Cards / Containers
- **Corner Style:** Cards and panels use tight corners (`8px`), with smaller image corners (`5px` to `7px`).
- **Background:** Main panels use panel black; cards and fields use raised charcoal; hover shifts to brighter charcoal.
- **Shadow Strategy:** Major panels may use Panel Ambient; ordinary album cards should not add large shadows.
- **Border:** Hairline borders define surfaces without creating heavy boxes.
- **Internal Padding:** Album cards use `0.85rem`; content panels use `clamp(1.35rem, 2.6vw, 2rem)` or section padding.

### Inputs / Fields
- **Style:** Search is a pill field with icon, flexible input, optional clear action, raised charcoal background, and muted placeholder.
- **Focus:** Preserve no-outline reset only when a visible hover/focus surface or equivalent cue is present.
- **Error / Disabled:** No formal error style is defined yet; new form states must keep WCAG 2.2 AA contrast and cannot rely on color alone.

### Navigation
- **Style:** Top navigation uses circular icon buttons and a centered search field. The left library acts like Spotify desktop navigation, with the active artist item becoming circular imagery.
- **States:** Hover and focus shift icons from soft text to primary text and move controls up by `-1px`.
- **Mobile Treatment:** The left library collapses to icon-only at tablet widths, and the app stack shifts at smaller breakpoints while preserving the player metaphor.

### Spotify Shell

The shell is the signature component: top bar, left library, central artist content, optional detail rail, and persistent player footer. Any new section should fit into this shell rather than creating an unrelated landing-page block.

### Track List

Experience rows use ordered track numbers, square artwork, title/subtitle metadata, and right-aligned period text. The selected row uses green text on the title and number, but selection should remain clear through row background and interaction state as well.

### Album Shelf

Projects are album cards in a horizontal carousel. Cards use square artwork, compact titles, subtitles, two-line tag metadata, carousel arrows, and active dots.

## 6. Do's and Don'ts

### Do:

- **Do** keep the Spotify desktop metaphor consistent across new surfaces: library, albums, tracks, player, artist, queue, and now-listening patterns should carry real portfolio meaning.
- **Do** make Pranavi's name, AI/CMU context, and contact choices visible within the first viewport.
- **Do** use the existing dark surface ladder and green accent exactly as documented unless Pranavi approves a color change.
- **Do** preserve compact interface density while keeping headings, rows, controls, and metadata scannable.
- **Do** keep controls keyboard reachable and maintain WCAG 2.2 AA contrast.
- **Do** support reduced motion for transitions, progress, toast, and detail panel animation.

### Don't:

- **Don't** make the site feel like a generic personal portfolio, a resume pasted onto a page, or a conventional grid of project cards.
- **Don't** abandon the Spotify angle or add sections that feel detached from the app-shell metaphor.
- **Don't** change colors without consulting Pranavi first.
- **Don't** introduce decorative gradients, glass panels, oversized rounded cards, side-stripe accents, or generic landing-page ornaments.
- **Don't** use repeated tiny uppercase section eyebrows or numbered section markers as scaffolding.
- **Don't** rely on color alone for selected, active, error, or disabled states.
