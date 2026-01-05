# Homepage Layout & Animations Documentation

## Overview

This document provides a comprehensive breakdown of the homepage layout structure, components, and all animations implemented throughout the page. **Updated with Ashfall-inspired dark theme, smooth scrolling, scroll-triggered text reveals, and parallax effects.**

## Page Structure

The homepage (`app/page.tsx`) consists of the following sections in order:

1. **Hero Section** - Full-screen dark landing with scroll-triggered text reveal
2. **TwoUpSection** - Two-column parallax image layout with scroll-based transforms
3. **BrandShowcase** - Client/project grid with staggered reveal animations
4. **FeaturedWork** - Case study cards with parallax image effects
5. **CTA Section** - Call-to-action with scale on scroll
6. **VideoSection** - Video placeholder with mouse-following play button and light trails

The page uses a **dark theme** (black background) with **Lenis smooth scrolling** and **scroll-based parallax effects** throughout.

---

## Technologies & Packages

### Core Dependencies

- **Lenis** - Smooth scroll library for buttery scroll experience
- **Framer Motion** - Animation library with scroll-based hooks
- **Next.js** - React framework with Image optimization
- **Playfair Display** - Serif italic font for elegant headlines

### Custom Hooks

- `useScrollProgress` - Track element scroll progress (0-1)
- `useParallax` - Apply parallax offset based on scroll
- `useMouseParallax` - Apply offset based on mouse position

### Providers

- `SmoothScrollProvider` - Wraps app with Lenis smooth scrolling

---

## Section Details

### 1. Hero Section

**Component:** `components/sections/Hero.tsx`  
**Background:** Black with parallax background image  
**Layout:** Full-screen centered content

#### Structure:

- **Background Image:** Parallax movement on scroll
- **Main Headline:** Serif italic text with line-by-line reveal
- **Scroll Indicator:** Animated bouncing arrow
- **Video/Reel Button:** Bottom-right play button

#### Animations:

1. **Background Parallax**

   - Image Y offset: `[0, 100]` based on scroll
   - Image scale: `[1, 1.1]` based on scroll

2. **Content Parallax**

   - Container Y offset: `[0, 200]` on scroll
   - Opacity fade: `[1, 0]` as scroll progresses
   - Scale: `[1, 0.95]` on scroll

3. **Text Reveal (LineReveal)**

   - Type: Staggered line-by-line reveal from bottom
   - Each line: `y: "100%" → 0`, `opacity: 0 → 1`
   - Stagger delay: `0.15s` between lines
   - Easing: `[0.25, 0.46, 0.45, 0.94]`

4. **Scroll Indicator**

   - Continuous bounce: `y: [0, 8, 0]`
   - Duration: `2s`, repeat infinite

5. **Reel Button**
   - Entry: `opacity: 0, scale: 0.9` → `opacity: 1, scale: 1`
   - Hover: `scale: 1.05`
   - Tap: `scale: 0.95`

---

### 2. TwoUpSection

**Component:** `components/sections/TwoUpSection.tsx`  
**Background:** Black  
**Layout:** 2/3 + 1/3 responsive grid

#### Structure:

- **Section Header:** Label and multi-line description
- **Left Image:** 2/3 width with parallax
- **Right Image:** 1/3 width with parallax

#### Animations:

1. **Description Text**

   - LineReveal component with staggered lines
   - Stagger delay: `0.1s`

2. **Left Image Parallax**

   - Y offset: `[100, -100]` based on scroll
   - Scale: `[1.1, 1, 1.1]` based on scroll
   - Entry: `y: 60` → `y: 0`, delay: `0.2s`

3. **Right Image Parallax**

   - Y offset: `[150, -50]` based on scroll
   - Scale: `[1.15, 1, 1.1]` based on scroll
   - Entry: `y: 80` → `y: 0`, delay: `0.4s`

4. **Hover Effects**
   - Image zoom: `scale: 1.05` over `700ms`
   - Gradient overlay fade-in

---

### 3. BrandShowcase

**Component:** `components/sections/BrandShowcase.tsx`  
**Background:** Black with radial gradient  
**Layout:** 12-column grid (5 content, 7 grid)

#### Structure:

- **Content Section:** Headline, description, CTA
- **Project Grid:** 2x3 image tiles

#### Animations:

1. **Content Parallax**

   - Y offset: `[50, -50]` based on scroll

2. **Text Reveal**

   - LineReveal for headline
   - Stagger delay: `0.15s`

3. **Grid Items Stagger**

   - Entry: `y: 40` → `y: 0`
   - Delay: `0.1 * index`
   - Easing: `[0.25, 0.46, 0.45, 0.94]`

4. **Grid Item Hover**

   - Lift: `y: -8`
   - Image zoom: `scale: 1.1` over `700ms`
   - Border reveal: `border-white/20`

5. **CTA Button**
   - Arrow spring hover: `scale: 1.1, x: 5`
   - Spring config: `stiffness: 400, damping: 17`

---

### 4. FeaturedWork

**Component:** `components/sections/FeaturedWork.tsx`  
**Background:** Black  
**Layout:** Vertical stack of case study cards

#### Structure:

- **Section Header:** Label and headline
- **Case Study Cards:** Image, client badge, title, tags

#### Animations:

1. **Title Reveal**

   - LineReveal component
   - Font: Serif italic

2. **Card Entry**

   - Staggered: `y: 60` → `y: 0`
   - Delay: `index * 0.15`
   - Easing: `[0.25, 0.46, 0.45, 0.94]`

3. **Card Image Parallax**

   - Y offset: `[50, -50]` based on card scroll
   - Scale: `[1.1, 1, 1.05]`

4. **Client Badge**

   - Glassmorphism: `bg-white/10 backdrop-blur-md`
   - Entry: `y: -10` → `y: 0`

5. **Hover Effects**

   - View button: `scale: 1.1`, appears on hover
   - Overlay: `bg-black/30` → `bg-black/10`

6. **Show More Link**
   - Arrow rotation on hover: `rotate: 45`

---

### 5. CTA Section

**Component:** `components/sections/CTA.tsx`  
**Background:** Black  
**Layout:** Full-width card with text and arrow

#### Animations:

1. **Container Scale**

   - Scale: `[0.95, 1, 0.98]` based on scroll
   - Opacity: `[0.5, 1]` on entry

2. **Card Entry**

   - `y: 40` → `y: 0`
   - Easing: `[0.25, 0.46, 0.45, 0.94]`

3. **Background Glow**

   - Red radial gradient center
   - Opacity: `0.5` → `0.8` on hover

4. **Arrow Button**
   - Hover: `scale: 1.1, rotate: 45`
   - Shadow: `shadow-[#DC2626]/30` → `/50` on hover

---

### 6. VideoSection

**Component:** `components/sections/VideoSection.tsx`  
**Background:** Black  
**Layout:** Full-width video container

#### Animations:

1. **Container Parallax**

   - Y offset: `[100, -100]` based on scroll

2. **Background Image**

   - Scale: `[1.1, 1, 1.05]` based on scroll

3. **Static Play Button**

   - Fade out on hover: `scale: 0, opacity: 0`
   - Duration: `0.3s`

4. **Mouse-Following Play Button**

   - Spring tracking: `damping: 25, stiffness: 120`
   - Entry on hover: `scale: 1, opacity: 1`
   - Icon pulse: `scale: [1, 1.1, 1]` infinite

5. **Light Trail Effect**
   - Radial red gradient following cursor
   - Scale: `1.5` on hover
   - Spring: `stiffness: 200, damping: 30`

---

## Global Layout Components

### Navbar

**Component:** `components/layout/Navbar.tsx`  
**Position:** Fixed, transparent → glassmorphism on scroll

#### Animations:

1. **Entry Animation**

   - `opacity: 0, y: -20` → `opacity: 1, y: 0`
   - Duration: `0.6s`

2. **Scroll State**

   - Not scrolled: `bg-transparent`
   - Scrolled: `bg-black/80 backdrop-blur-lg border-b border-white/5`

3. **Nav Links**

   - Staggered entry: delay `0.1 * index`
   - Underline reveal on hover

4. **CTA Button**
   - Border: `border-white/20`
   - Hover: `bg-white text-black`
   - Arrow animation: `x: [0, 3, 0]` infinite

### Footer

**Component:** `components/layout/Footer.tsx`  
**Background:** Black

#### Animations:

1. **Image Parallax**

   - Y offset: `[100, -50]`
   - Scale: `[1.2, 1, 1.1]`

2. **CTA Card**

   - Entry: `y: 40` → `y: 0`
   - Gradient on hover

3. **Content Stagger**
   - Delay: `0.2s` offset

---

## Animation Library

All animations defined in `lib/animations.ts`:

### Core Variants:

1. **fadeInUp** - Fade from bottom (30px), 0.6s
2. **fadeIn** - Simple fade, 0.6s
3. **typingAnimation** - Word-by-word, 0.3s per word
4. **staggerContainer** - Stagger children 0.1s
5. **staggerItem** - Individual item: `y: 20` → `y: 0`
6. **scaleOnHover** - Scale 1 → 1.05
7. **slideInLeft** - From left (-50px)
8. **slideInRight** - From right (50px)

### Custom Components:

- **ScrollRevealText** - Word-by-word scroll reveal
- **LineReveal** - Line-by-line reveal animation
- **RevealText** - Single span reveal
- **ParallaxImage** - Scroll-based image parallax
- **RevealImage** - Clip-path reveal animation

---

## CSS Utilities

### Typography

- `.font-serif` - Playfair Display
- `.font-serif-italic` - Playfair Display italic
- `.gradient-text` - Gradient text effect

### Effects

- `.glass` - Light glassmorphism
- `.glass-dark` - Dark glassmorphism
- `.grid-pattern` - Subtle grid overlay
- `.gradient-radial` - Red radial gradient
- `.image-hover-zoom` - Image zoom on hover
- `.hover-lift` - Card lift effect

### Animations

- `.animate-fade-in` - Fade in
- `.animate-slide-up` - Slide up
- `.animate-float` - Floating effect
- `.animate-marquee` - Infinite scroll

---

## Scroll & Parallax System

### Lenis Smooth Scroll

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});
```

### useScrollProgress Hook

```typescript
const { progress, isInView } = useScrollProgress(ref, {
  offset: 0.2,
});
// progress: 0 (entering) → 1 (leaving)
```

### Framer Motion Scroll

```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
```

---

## Color Palette

- **Primary Red:** `#DC2626`
- **Black:** `#0a0a0a` / `#000000`
- **White:** `#ffffff`
- **Zinc 900:** `#18181b`
- **White/opacity:** `rgba(255, 255, 255, 0.1-0.7)`

---

## Responsive Breakpoints

- **Mobile:** `< 768px`
- **Tablet:** `768px - 1024px`
- **Desktop:** `> 1024px`

---

## Performance Optimizations

1. **Smooth Scrolling:** Lenis with easing
2. **Viewport Once:** `once: true` for scroll animations
3. **Lazy Loading:** Next.js Image with priority flags
4. **Spring Physics:** Smooth, performant cursor tracking
5. **CSS Transitions:** Hover effects use CSS for performance
6. **Reduced Motion:** Respects `prefers-reduced-motion`

---

## Summary

The homepage now features an Ashfall-inspired design with:

- **Dark theme** with elegant serif typography
- **Lenis smooth scrolling** for buttery scroll experience
- **Scroll-triggered text reveals** with line-by-line animations
- **Parallax effects** on all images and content sections
- **Mouse-following interactions** in video section
- **Glassmorphism** on navbar and badges
- **Staggered animations** for grid and card elements
- **Spring physics** for interactive elements

All effects are scroll-based and respond to user interaction, creating an immersive, premium experience similar to ashfall.studio.
