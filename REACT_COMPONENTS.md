# React Components Overview — Atmiya Vidya Dham (AVD Hostel)

All components in this application are built as modern, clean, production-ready **React Client Components** using TypeScript (`.tsx`), Framer Motion animations, Tailwind CSS, and Lucide React icons.

---

## 🧩 Complete List of React Components

### 1. **`AmenitiesSection`** (`src/components/sections/AmenitiesSection.tsx`)
- **React Hooks**: `useState`, `useRef`
- **Features**: Top curved hero card, dark floating success card overlay, 45s infinite looping marquee carousel with pause-on-hover, and bottom feature banner.

### 2. **`FeaturedRoomsSection`** (`src/components/sections/FeaturedRoomsSection.tsx`)
- **React Hooks**: `useState`, `useEffect`, `useRef`, `useScroll`, `useMotionValueEvent`
- **Features**: Interactive room category filter tabs (*All*, *Premium*, *Standard*, *Economy*), horizontal expandable room cards, feature icon pills, image gallery lightbox modal.

### 3. **`CampusHighlightsSection`** (`src/components/sections/CampusHighlightsSection.tsx`)
- **React Hooks**: `useState`, `useRef`, `useScroll`, `useMotionValueEvent`
- **Features**: Interactive stacked card deck with spring animation physics, slide counters, and dot indicators.

### 4. **`HeroSection`** (`src/components/sections/HeroSection.tsx`)
- **React Hooks**: `useState`, `useRef`, `useEffect`
- **Features**: Video background hero, smooth text animations, stats strip with glassmorphic dividers, and animated scroll-down mouse indicator.

### 5. **`CTASection`** (`src/components/sections/CTASection.tsx`)
- **React Hooks**: `useState`, `useRef`, `useEffect`
- **Features**: Multi-step admission enquiry form, animated progress bar tracker, phone input validation, and victory canvas confetti effect.

### 6. **`ArrivalContent`** (`src/components/pages/ArrivalContent.tsx`)
- **React Hooks**: `useState`
- **Features**: Single-viewport responsive layout, interactive route selector tabs (`Auto/Bus`, `Public Bus`, `Self Drive`), dynamic Google Map embed with destination badge, and live directions CTA.

### 7. **`Navbar`** (`src/components/layout/Navbar.tsx`)
- **React Hooks**: `useState`, `useEffect`
- **Features**: Scroll progress indicator bar, active link indicator pill (`layoutId`), backdrop blur on scroll, and mobile navigation drawer.

### 8. **`Footer`** (`src/components/layout/Footer.tsx`)
- **React Components**: Functional layout with `"use client"`, social link hover animations, and quick link micro-interactions.

---

## 🛠️ Tech Stack & Dependencies
- **React**: `^18.x` / `^19.x`
- **Framework**: Next.js 16 (App Router with Client Components)
- **Styling**: Tailwind CSS + Custom CSS Variables (`globals.css`)
- **Animations**: `framer-motion`
- **Icons**: `lucide-react`

---

## ⚡ How to Run
```bash
# Start development server
npm run dev

# Run production build
npm run build
```
