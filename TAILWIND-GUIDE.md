# Tailwind CSS Design System Guide

## 🎨 Overview

YK Bike Finder uses **Tailwind CSS v4** with a custom design system featuring NWT-inspired colors, beautiful animations, and modern UI utilities.

---

## 🌈 Color Palette

### Primary (NWT Teal)
Perfect for main actions, headers, and primary UI elements.

```tsx
// Usage examples
<div className="bg-primary-500 text-white">Primary Button</div>
<div className="text-primary-600 hover:text-primary-700">Link</div>
<div className="border-primary-400">Card</div>
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **500** (DEFAULT): `#2D5F5D` - Main brand color
- **50**: Lightest tint for backgrounds
- **900**: Darkest shade for text

### Secondary (Sky Blue)
For secondary actions and complementary elements.

```tsx
<Button className="bg-secondary-500">Secondary Action</Button>
<Badge className="bg-secondary-100 text-secondary-700">Status</Badge>
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **500** (DEFAULT): `#4A90A4`

### Accent (Golden Yellow)
For highlights, featured items, and calls-to-action.

```tsx
<span className="text-accent-500 font-semibold">Featured!</span>
<div className="bg-accent-100 border-accent-400">Alert</div>
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **500** (DEFAULT): `#E8B44F`

### Danger (Red)
For errors, warnings, and destructive actions.

```tsx
<Button variant="destructive">Delete</Button>
<p className="text-danger-600">Error message</p>
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **500** (DEFAULT): `#C84630`

### Success (Green)
For success states and positive feedback.

```tsx
<Badge variant="success">Completed</Badge>
<div className="bg-success-100 text-success-700">Success!</div>
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **500** (DEFAULT): `#3D7C47`

### Neutral Colors
- `snow-white`: `#F8F9FA` - Light background
- `frost-gray`: `#E5E9EC` - Borders and dividers
- `slate-gray-DEFAULT`: `#2C3E50` - Text color
- `slate-gray-light`: `#4C5E70` - Secondary text
- `slate-gray-dark`: `#1C2E40` - Dark text

---

## ✨ Shadows

### Standard Shadows
```tsx
<div className="shadow-sm">Subtle shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
<div className="shadow-2xl">Huge shadow</div>
```

### Colored Shadows
Add depth with brand-colored shadows:

```tsx
<div className="shadow-primary">Primary glow</div>
<div className="shadow-secondary">Secondary glow</div>
<div className="shadow-accent">Accent highlight</div>
```

### Special Shadows
```tsx
<div className="shadow-glow">Glowing effect</div>
<div className="shadow-nwt">NWT branded shadow</div>
<div className="shadow-inner-glow">Inner glow effect</div>
```

---

## 🎭 Animations

### Fade Animations
```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-fade-in-up">Fades in from bottom</div>
<div className="animate-fade-in-down">Fades in from top</div>
```

### Slide Animations
```tsx
<div className="animate-slide-in">Slides from left</div>
<div className="animate-slide-in-right">Slides from right</div>
<div className="animate-slide-in-left">Slides from left</div>
```

### Other Animations
```tsx
<div className="animate-scale-in">Scales in</div>
<div className="animate-pulse-slow">Slow pulse</div>
<div className="animate-bounce-slow">Slow bounce</div>
<div className="animate-spin-slow">Slow spin</div>
<div className="animate-shimmer">Shimmer effect</div>
<div className="animate-float">Floating effect</div>
```

### Framer Motion (Recommended)
For more complex animations, use Framer Motion:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

---

## 🎨 Gradients

### Two-Color Gradients
```tsx
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Primary to Secondary
</div>

<div className="bg-gradient-to-br from-accent-400 to-accent-600">
  Accent gradient
</div>
```

### Multi-Color Gradients
```tsx
<div className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500">
  Rainbow effect
</div>
```

### Text Gradients
```tsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Gradient Directions
- `bg-gradient-to-r` - Left to right
- `bg-gradient-to-l` - Right to left
- `bg-gradient-to-t` - Bottom to top
- `bg-gradient-to-b` - Top to bottom
- `bg-gradient-to-br` - Top-left to bottom-right
- `bg-gradient-to-bl` - Top-right to bottom-left
- `bg-gradient-to-tr` - Bottom-left to top-right
- `bg-gradient-to-tl` - Bottom-right to top-left

---

## 🪟 Glass Morphism

Create beautiful frosted glass effects:

```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
  Glass effect content
</div>

<div className="bg-primary-500/20 backdrop-blur-lg">
  Colored glass
</div>
```

### Backdrop Blur Options
- `backdrop-blur-xs` - 2px blur
- `backdrop-blur-sm` - 4px blur
- `backdrop-blur` - 8px blur
- `backdrop-blur-md` - 12px blur
- `backdrop-blur-lg` - 16px blur
- `backdrop-blur-xl` - 24px blur
- `backdrop-blur-2xl` - 40px blur
- `backdrop-blur-3xl` - 64px blur

---

## 📐 Border Radius

```tsx
<div className="rounded-sm">4px radius</div>
<div className="rounded-md">8px radius</div>
<div className="rounded-lg">12px radius</div>
<div className="rounded-xl">16px radius</div>
<div className="rounded-2xl">24px radius</div>
<div className="rounded-3xl">32px radius</div>
<div className="rounded-full">Fully rounded</div>
```

---

## 📏 Spacing

### Custom Spacing Values
```tsx
<div className="p-18">4.5rem padding</div>
<div className="m-88">22rem margin</div>
<div className="h-128">32rem height</div>
<div className="w-144">36rem width</div>
```

### Max Width
```tsx
<div className="max-w-8xl">88rem max width</div>
<div className="max-w-9xl">96rem max width</div>
```

---

## 🎯 Common Patterns

### Hero Section
```tsx
<section className="relative min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
  <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
  <div className="relative container mx-auto px-4 py-20">
    <motion.h1 
      className="text-6xl font-bold text-white mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Welcome to YK Bike Finder
    </motion.h1>
  </div>
</section>
```

### Card with Hover Effect
```tsx
<div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
  <div className="p-6">
    <h3 className="text-xl font-semibold text-slate-gray group-hover:text-primary-600 transition-colors">
      Card Title
    </h3>
  </div>
</div>
```

### Button with Icon
```tsx
import { Bike } from 'lucide-react';

<button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-primary hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
  <Bike className="h-5 w-5" />
  Report Bike
</button>
```

### Glass Card
```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
  <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
  <p className="text-white/80">Beautiful frosted glass effect</p>
</div>
```

### Loading Skeleton
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-frost-gray rounded w-3/4 mb-2" />
  <div className="h-4 bg-frost-gray rounded w-1/2" />
</div>
```

### Badge Grid
```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="accent">Featured</Badge>
  <Badge variant="secondary">New</Badge>
</div>
```

---

## 🎨 Component Utilities

### Focus States
```tsx
<input className="focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500" />
```

### Hover Effects
```tsx
<div className="hover:scale-105 hover:shadow-xl transition-all duration-300">
  Hover me
</div>
```

### Active States
```tsx
<button className="active:scale-95 transition-transform">
  Press me
</button>
```

### Disabled States
```tsx
<button className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Disabled
</button>
```

---

## 🌙 Dark Mode

Enable dark mode support:

```tsx
// In your component
<div className="bg-white dark:bg-slate-gray-dark text-slate-gray dark:text-snow-white">
  Adapts to dark mode
</div>
```

To toggle dark mode, add/remove the `dark` class on the root element:

```tsx
document.documentElement.classList.toggle('dark');
```

---

## 📱 Responsive Design

Use responsive utilities with breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <Card>Responsive grid</Card>
</div>

<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive text
</h1>

<div className="p-4 md:p-8 lg:p-12">
  Responsive padding
</div>
```

---

## 🎭 Custom Animations with Framer Motion

### Stagger Children
```tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
  <motion.div variants={item}>Item 3</motion.div>
</motion.div>
```

### Hover Animations
```tsx
<motion.div
  whileHover={{ scale: 1.05, rotate: 2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Interactive element
</motion.div>
```

---

## 🚀 Performance Tips

1. **Use Transition Utilities**: Add `transition-all duration-300` for smooth effects
2. **Optimize Animations**: Use `transform` and `opacity` for better performance
3. **Lazy Load Images**: Use Next.js Image component
4. **Reduce Motion**: Respect user preferences with `motion-reduce:`

```tsx
<div className="motion-reduce:transition-none motion-reduce:animate-none">
  Respects reduced motion preferences
</div>
```

---

## 📚 Quick Reference

### Most Used Classes

**Layout**
- `container mx-auto px-4` - Responsive container
- `flex items-center justify-between` - Flexbox
- `grid grid-cols-1 md:grid-cols-3 gap-6` - Grid

**Typography**
- `text-4xl font-bold` - Large heading
- `text-slate-gray-light` - Secondary text
- `font-mono` - Monospace font

**Colors**
- `bg-primary-500 text-white` - Primary button
- `text-primary-600 hover:text-primary-700` - Link
- `border-frost-gray` - Border

**Effects**
- `shadow-lg hover:shadow-xl` - Shadow on hover
- `rounded-xl` - Rounded corners
- `backdrop-blur-md` - Blur background
- `transition-all duration-300` - Smooth transitions

---

## 🎉 View the Design System

Visit `/design-system` in your app to see all utilities in action with live examples!

```bash
npm run dev
# Open http://localhost:9482/design-system
```

---

**Happy Coding! 🎨✨**
