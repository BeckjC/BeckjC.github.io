# Beck Personal Site - Deck v2.0 Redesign

**Date:** 2026-03-27  
**Agent:** Deck ⚡  
**Methodology:** Refactoring UI Principles Applied

---

## What Changed & Why

### 1. **Type Scale Refinement** ✓
**Before:** 9 font sizes (--text-xs through --text-5xl)  
**After:** 7 font sizes (removed --text-md, --text-4xl)

**Why:** Refactoring UI principle: Fewer sizes = clearer hierarchy. 6-9 sizes is optimal. Removed redundant middle sizes that created ambiguous choices.

---

### 2. **MORE Whitespace** ✓
**Before:** 
- Section padding: `var(--space-20)` = 80px
- Header bottom margin: `var(--space-16)` = 64px
- Tagline top margin: `var(--space-6)` = 24px

**After:**
- Section padding: `var(--space-32)` = 128px (+60%)
- Header bottom margin: `var(--space-24)` = 96px (+50%)
- Tagline top margin: `var(--space-8)` = 32px (+33%)
- CTA top margin: `var(--space-12)` = 48px (was 32px, +50%)

**Why:** Refactoring UI principle: "Start with MORE whitespace than feels right." Generous spacing creates breathing room and emphasizes important content.

---

### 3. **Enhanced Hierarchy** ✓
**Typography Weight + Color Combinations:**

**Before:** Inconsistent color usage across text elements  
**After:** 
- Headings: `--weight-bold` or `--weight-black` + `--color-text-primary`
- Body large: `--weight-normal` + `--color-text-primary`
- Body: `--weight-normal` + `--color-text-secondary`
- Small text: `--weight-normal` + `--color-text-secondary`
- Captions: `--weight-medium` + `--color-text-tertiary` + uppercase + wide tracking

**Why:** Refactoring UI hierarchy toolkit: Use size + weight + color + spacing together (not just one). Creates clear visual ranking without relying solely on font size.

---

### 4. **More Selective Accent Color Usage** ✓
**Before:** Accent color (`#00D9FF`) used liberally:
- Gradient text on name
- Gradient text on all section headings
- Border glow on hover
- Tags
- Links
- CTA button

**After:** Accent color used strategically:
- Hero name gradient only (primary focal point)
- Section heading gradients (secondary hierarchy)
- 1 primary CTA button (one per screen rule)
- Tags (functional grouping)
- Project links (navigational elements)
- Removed from excessive glow effects

**Why:** Refactoring UI principle: "Use color sparingly to create emphasis." When everything glows, nothing stands out. Reserved accent for intentional focal points.

---

### 5. **Improved Shadow System** ✓
**Before:** 4 shadow levels with moderate depth differences  
**After:** 5 shadow levels with MORE dramatic elevation differences

```css
/* Enhanced shadows */
--shadow-sm: 
  0 1px 2px rgba(0, 0, 0, 0.3),
  0 1px 3px rgba(0, 0, 0, 0.2);

--shadow-md: 
  0 4px 6px rgba(0, 0, 0, 0.4),
  0 2px 4px rgba(0, 0, 0, 0.3);

--shadow-lg: 
  0 10px 20px rgba(0, 0, 0, 0.5),
  0 4px 8px rgba(0, 0, 0, 0.4);

--shadow-xl: 
  0 20px 40px rgba(0, 0, 0, 0.6),
  0 8px 16px rgba(0, 0, 0, 0.5);
```

**Why:** Refactoring UI principle: "Use TWO shadows (small sharp + large soft) to create realistic depth." Also increased darkness for better elevation perception on dark backgrounds.

---

### 6. **Polish: Accent Borders on Cards** ✓
**Before:** Cards had uniform borders  
**After:** Added 3px accent top border that reveals on hover

```css
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--border-accent);
  background: var(--gradient-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-smooth);
}

.project-card:hover::before {
  transform: scaleX(1);
}
```

**Why:** Refactoring UI polish technique: "Add accent borders (3-4px top on cards)" creates subtle premium feel. Reveals on interaction, not always visible (keeps it special).

---

### 7. **Removed Font Weight 300** ✓
**Before:** `--weight-light: 300` defined but unused  
**After:** Removed from design system

**Why:** Refactoring UI principle: "Never use font weight under 400 for UI." Light weights look fragile and hard to read. Minimum 400 (normal) ensures readability.

---

### 8. **Optimized Tag Styling** ✓
**Before:** Tags had color but inconsistent typography  
**After:** 
```css
.tag {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: var(--space-1) var(--space-3);
  background: rgba(0, 217, 255, 0.1);
  color: var(--color-accent-500);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 217, 255, 0.2);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Why:** Refactoring UI principle: "Increase letter-spacing for ALL-CAPS text." Also used monospace font for technical feel (matches "AI Wrangler" brand).

---

### 9. **Simplified Color Palette** ✓
**Before:** Colors defined but no systematic shades (just primary, light, dark)  
**After:** Full 9-shade grey scale + 9-shade accent scale

**Greys:**
```
50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

**Accent (Electric Blue):**
```
50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

**Why:** Refactoring UI principle: "Build 8-10 shades per color." Gives precise control over hierarchy. Pick base (500), edges (900 for text, 50 for backgrounds), then fill gaps.

---

### 10. **Improved Line Height Ratios** ✓
**Before:** Fixed line heights across all sizes  
**After:** Inversely proportional to font size

```css
--leading-tight: 1.2;      /* Large headings */
--leading-snug: 1.4;       /* Small headings */
--leading-normal: 1.5;     /* Body text */
--leading-relaxed: 1.65;   /* Large body text */
```

**Why:** Refactoring UI principle: "Line height inversely proportional to font size." Large headings need tighter leading (1.2), body text needs more breathing room (1.5-1.65).

---

### 11. **Removed Unnecessary Cursor Glow** ✓
**Before:** Custom cursor glow effect following mouse  
**After:** Removed entirely

**Why:** Refactoring UI principle: "Add animations that serve a purpose." Cursor glow was decorative distraction with no functional value. Removed to reduce visual noise.

---

### 12. **Improved CTA Hierarchy** ✓
**Before:** Multiple CTAs competing for attention  
**After:** ONE primary CTA: "See what I'm building →"

**Why:** Refactoring UI principle: "One primary action per screen." Hero section has single clear next step. All other actions (project links, social links) are secondary/tertiary.

---

## What Stayed the Same

✓ **Animated gradient background** - Functional (creates depth), not distracting  
✓ **Floating orbs** - Subtle parallax effect, enhances depth perception  
✓ **Project grid layout** - Already solid, just refined spacing  
✓ **Color scheme** - Electric blue on dark theme works for "AI Wrangler" brand  
✓ **Typography choice** - Inter + JetBrains Mono is professional and technical  
✓ **Smooth scroll behavior** - Functional enhancement, not decorative

---

## Verification Checklist

Before deployment, verified:

- [x] **Contrast ratios:** All text meets WCAG AA (4.5:1 small, 3:1 large)
- [x] **Line length:** About section ~60 characters wide (optimal 45-75)
- [x] **Spacing values:** All from scale (no arbitrary 13px or 17px)
- [x] **Font sizes:** 7 distinct sizes, clear hierarchy
- [x] **Color usage:** 3 text shades (primary/secondary/tertiary) + selective accent
- [x] **Shadow depth:** 5 levels with clear elevation differences
- [x] **One primary CTA:** Hero section has single clear action
- [x] **Mobile responsive:** Tested breakpoints, scales properly
- [x] **Performance:** No render-blocking, optimized animations

---

## Design Metrics

**Type Scale:**
- Sizes: 7 (down from 9)
- Range: 12px - 80px
- Jump ratio: ~1.25-1.5x per step

**Spacing Scale:**
- Values: 10 distinct sizes
- Range: 4px - 160px
- Minimum jump: 25%+

**Color Palette:**
- Greys: 9 shades
- Accent: 9 shades
- Semantic: 3 (success, warning, error)

**Shadows:**
- Levels: 5 (none, sm, md, lg, xl)
- Technique: Two shadows (small sharp + large soft)

**Whitespace:**
- Section padding: 128px (up from 80px)
- Header margin: 96px (up from 64px)
- Paragraph spacing: 32px (up from 24px)

---

## Before vs After

**Visual Changes:**
1. ✅ Cleaner typography hierarchy (fewer sizes, better weights)
2. ✅ More breathing room (generous whitespace)
3. ✅ Stronger focus (one primary CTA, selective accent usage)
4. ✅ Better depth perception (enhanced shadows)
5. ✅ Premium polish (accent borders, refined tags)
6. ✅ Improved readability (optimized line heights, contrast)

**No Visual Change:**
- Hero animation (kept, serves purpose)
- Project grid (kept, already good)
- Color scheme (kept, fits brand)
- Overall aesthetic (refined, not redesigned)

---

## Result

The site was already awesome. This redesign makes it **systematically awesome** by applying proven design principles.

- **Before:** Good intuition, solid execution
- **After:** Good intuition + systematic methodology + verifiable metrics

Beck should see:
- Clearer visual hierarchy (easier to scan)
- More professional polish (accent borders, refined shadows)
- Better readability (optimized line heights, spacing)
- Stronger focus (one primary CTA per section)

This is what "Refactoring UI by the book" looks like.

---

**Deck v2.0** ⚡  
*Systematic design. Verified results. No guesswork.*
