# Beck Personal Site - Design System

**Created:** 2026-03-26  
**Designer:** Tommy  
**Status:** BPS KR 1.1 Complete

---

## Design Philosophy

**Modern. Technical. Approachable.**

Beck is an "AI Wrangler" learning in public. The site should feel:
- **Sharp and modern** - cutting edge tech, not corporate
- **Honest and direct** - no hype, all substance
- **Uniquely Beck** - not a template, not generic

---

## Color Palette

### Primary Colors
- **Deep Navy** (`#0A1929`) - Base dark, foundation
- **Electric Blue** (`#00D9FF`) - Accent, AI/tech energy
- **Warm Dark BG** (`#1A1A1A`) - Main background (not pure black)

### Why These Colors?
- **Dark mode default** - Tech industry standard, easier on eyes
- **Electric blue accent** - Evokes AI, tech, innovation (not corporate blue)
- **Warm blacks** - Pure black (#000) is harsh; warm grays feel premium

### Semantic Colors
- **Success Green** (`#00FF88`) - Bright, optimistic
- **Warning Amber** (`#FFB800`) - Attention without alarm
- **Error Pink** (`#FF3366`) - Friendly error state

---

## Typography

### Fonts
- **Inter** - Primary font (modern, readable, professional)
- **JetBrains Mono** - Code/terminal elements (technical credibility)

### Why These Fonts?
- **Inter**: Used by GitHub, Stripe, Linear - modern SaaS aesthetic
- **JetBrains Mono**: Perfect for code snippets, terminal-style content
- **Google Fonts with display=swap** - Fast load, no FOUT

### Type Scale (Fluid)
All sizes use `clamp()` for perfect mobile-to-desktop scaling:
- **Heading 1**: 3rem → 5rem (hero text)
- **Heading 2**: 2.5rem → 4rem (section headers)
- **Body**: 1rem → 1.125rem (main text)

### Font Weights
- **Light (300)** - Reserved, rarely used
- **Normal (400)** - Body text
- **Medium (500)** - Subheadings
- **Semibold (600)** - Emphasis
- **Bold (700)** - Strong emphasis
- **Black (900)** - Hero headlines only

---

## Spacing System

**Base unit: 4px**

Every spacing value is a multiple of 4px:
- `--space-1` = 4px
- `--space-2` = 8px
- `--space-4` = 16px
- `--space-8` = 32px
- `--space-16` = 64px

### Why 4px?
- **Pixel-perfect alignment** on all screens
- **Touch-friendly** (minimum 44px touch targets = `--space-11`)
- **Visual rhythm** - consistent spacing creates calm, professional feel

---

## Effects & Motion

### Shadows
- **Subtle shadows** - Dark mode needs less shadow than light mode
- **Glow effect** on interactive elements (electric blue glow)

### Animations
- **Slide up** - Content entrance (smooth, professional)
- **Fade in** - Subtle appearance
- **Glow pulse** - Accent on CTAs, links

### Transition Speeds
- **Fast (150ms)** - Hovers, small UI changes
- **Base (250ms)** - Default for most interactions
- **Smooth (500ms)** - Page transitions, major movements

### Animation Philosophy
- **Hardware-accelerated only** (transform, opacity)
- **No layout shifts** (no width/height animations)
- **Respect prefers-reduced-motion** (future implementation)

---

## Mobile-First Responsive

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Fluid Typography
Every text size uses `clamp()`:
```css
font-size: clamp(min, preferred, max);
```

Example:
```css
--text-base: clamp(1rem, 0.95rem + 0.4vw, 1.125rem);
```

- **Minimum**: 1rem (16px on mobile)
- **Preferred**: Scales with viewport
- **Maximum**: 1.125rem (18px on desktop)

### Why Fluid?
- **No breakpoint management** for typography
- **Perfect scaling** at every screen size
- **Fewer media queries** = simpler CSS

---

## What Makes This Unique?

### Not Generic
- **Custom color palette** (not Material Design, not Tailwind defaults)
- **Warm dark mode** (most sites use pure black or blue-gray)
- **Electric blue accent** (stands out, matches "AI Wrangler" vibe)

### Award-Worthy Details
- **Glow effects** on interactive elements (subtle, not overdone)
- **Fluid typography** (scales perfectly, no awkward breakpoints)
- **4px spacing grid** (pixel-perfect consistency)
- **Performance-first** (CSS variables, hardware-accelerated animations)

### Modern Web Standards
- **CSS custom properties** (--variables) for theming
- **Clamp() for fluid sizing** (modern, elegant)
- **System font fallbacks** (fast load)
- **Semantic color naming** (success/warning/error, not red/yellow/green)

---

## Usage Examples

### Headings
```html
<h1 class="heading-1">Beck Cherry</h1>
<h2 class="heading-2 gradient-text">AI Wrangler</h2>
```

### Body Text
```html
<p class="body-large">Learning to wrangle AI before I get wrangled by it.</p>
<p class="body">Building in public, documenting everything.</p>
```

### Interactive Elements
```html
<a href="#" class="gradient-text glow">See my work →</a>
```

### Code/Terminal
```html
<pre class="mono">$ openclaw status</pre>
```

---

## Design Tokens File

**Location:** `design-system.css`

This file contains:
- ✅ Complete color palette (primary, neutrals, semantic)
- ✅ Typography system (fonts, sizes, weights)
- ✅ Spacing scale (4px base unit)
- ✅ Border radius values
- ✅ Shadow & glow effects
- ✅ Animation keyframes
- ✅ Utility classes

**Usage:**
```html
<link rel="stylesheet" href="design-system.css">
```

All tokens are CSS variables, so they can be customized per-page:
```css
:root {
  --color-accent: #FF00FF; /* Override accent color */
}
```

---

## Next Steps (BPS KR 1.2+)

- [ ] Build homepage prototype using this system
- [ ] Test on mobile devices
- [ ] Add dark/light mode toggle (optional)
- [ ] Optimize font loading (preload, subset)
- [ ] Add accessibility improvements (focus states, ARIA)

---

**Last updated:** 2026-03-26 17:52 PDT  
**Status:** Design system complete and documented
