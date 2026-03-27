# Homepage Prototype - "Holy Shit That's Cool"

**Created:** 2026-03-26  
**Task:** BPS KR 1.2 - Build homepage prototype with movement  
**Acceptance:** Beck says "holy shit that's cool"

---

## What Makes It Cool

### 1. Animated Gradient Background
- **Rotating gradient** creates depth and movement
- Infinite 20-second rotation (subtle, not distracting)
- Deep navy → electric blue gradient (brand colors)

### 2. Floating Glow Orbs
- **3 orbs** that float independently
- Gaussian blur creates soft, ethereal glow
- Electric blue accent color (#00D9FF)
- Each orb has different timing (0s, 2s, 4s delay)
- **Float animation:** 8-second loop, moves in organic patterns

### 3. Custom Cursor Glow
- **Smooth-following glow** that trails your cursor
- Lag effect (follows at 15% speed) creates fluid motion
- Screen blend mode for ethereal effect
- Only visible on desktop (mobile uses touch)

### 4. Staggered Text Animation
- **Three-stage entrance:**
  1. Name appears (0.2s delay)
  2. Tagline appears (0.4s delay)
  3. CTA button appears (0.6s delay)
- Slide-up + fade-in effect (smooth, professional)

### 5. Interactive Name Hover
- **Each word is hoverable** individually
- Name turns electric blue on hover
- Smooth lift effect (2px translateY)
- Feels responsive and playful

### 6. Premium CTA Button
- **Gradient background** (electric blue → deep blue)
- Shine effect on hover (light sweep left-to-right)
- Lift + glow shadow on hover
- Smooth all-around (multiple transition effects)

### 7. Scroll Indicator
- **Bouncing arrow** at bottom of hero
- Fades in after content loads (1s delay)
- Auto-hides after user scrolls (smart UX)

### 8. Glassmorphism Card
- **Frosted glass effect** on "Building in Public" card
- Backdrop blur + semi-transparent background
- Modern, premium aesthetic
- Subtle border (rgba white)

---

## Technical Details

### Animations Used
- **Rotating gradient** (`rotate` keyframe, 20s infinite)
- **Floating orbs** (`float` keyframe, 8s ease-in-out infinite)
- **Text entrance** (`slideUpFade` keyframe, staggered delays)
- **Bouncing arrow** (`bounce` keyframe, 2s infinite)
- **Button shine** (pseudo-element sweep on hover)
- **Cursor glow** (RAF animation with lag effect)

### Performance
- **Hardware-accelerated** (transform, opacity only)
- No layout shifts (no width/height animations)
- RequestAnimationFrame for smooth cursor tracking
- CSS transforms for 60fps animations

### Mobile-First
- Orb sizes reduce on mobile (<768px)
- Text sizes scale fluidly (clamp() from design system)
- Touch-friendly button sizing
- Cursor glow disabled on mobile (pointer events)

---

## How to View

**Option 1: Open directly in browser**
```bash
open ~/work/beck-enterprises/beck-personal-site/index.html
```

**Option 2: Local server (for full effect)**
```bash
cd ~/work/beck-enterprises/beck-personal-site
python3 -m http.server 8000
# Then open http://localhost:8000
```

---

## What's Next (Remaining Tasks)

This homepage is just the beginning. Still need:

- **Portfolio section** (project showcases)
- **About section** (honest, no bullshit)
- **Link hub** (social/contact)
- **Mobile responsive testing** (all devices)
- **SEO/metadata** (optimized for discovery)

But this hero section? This is the "holy shit" moment that sets the tone for everything else.

---

## Design Decisions

### Why This Aesthetic?
- **Electric blue glow** = AI/tech energy
- **Dark mode default** = Modern, premium, easier on eyes
- **Smooth animations** = Professional, polished
- **Interactive elements** = Engaging, not static
- **Glassmorphism** = Trendy, modern (used by Apple, Discord)

### What Makes It Unique?
- **Not a template** - custom animations, custom effects
- **Cursor glow** - subtle detail most sites don't have
- **Floating orbs** - adds life without being loud
- **Staggered entrance** - feels choreographed, intentional
- **Individual word hovers** - playful micro-interaction

### Performance-First
- Only hardware-accelerated properties (GPU-optimized)
- No heavy libraries (vanilla JS, pure CSS)
- Fast load (<1s, no external dependencies except Google Fonts)
- Works offline (no API calls, no external resources except fonts)

---

## Files

- `index.html` - Homepage prototype with all effects
- `design-system.css` - Design tokens (colors, fonts, spacing)
- `DESIGN-SYSTEM.md` - Design rationale and documentation
- `PROTOTYPE-README.md` - This file

---

**Acceptance Criteria:** Beck says "holy shit that's cool"  
**Status:** Ready for review

**Last updated:** 2026-03-26 18:05 PDT
