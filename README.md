# Roky Portfolio

## Overview
A cutting-edge personal portfolio engineered to demonstrate expertise in modern web development, UI/UX design, and AI integration. This project serves as both a showcase of professional work and a playground for experimental web technologies, featuring a custom-built AI assistant and an interactive coding environment.

## Core Features
- **🤖 AI-Powered Assistant**: A conversational interface built with Vercel AI SDK that provides context-aware answers about professional background and skills.
- **⚡ Interactive Code Playground**: Live Monaco Editor integration allowing visitors to run and experiment with code snippets directly in the browser.
- **🎨 Premium UI/UX**: Implements high-end design principles with glassmorphism, fluid animations (Framer Motion), and smooth scrolling (Lenis).
- **🌗 Dark/Light Mode**: Fully responsive theming system respecting user preferences.
- **📱 Responsive Layout**: Optimized experiences across mobile, tablet, and desktop devices.
- **📝 Dynamic Content**: Dedicated sections for case studies and technical blog posts.

## Key Engineering Highlights
- **Performance-First Architecture**: Built on **Next.js 16** (App Router) for server-side optimization and rapid content delivery.
- **Advanced Styling System**: Utilizes **Tailwind CSS 4** to implement a responsive, fluid design system with dark mode support.
- **Type Safety**: strict TypeScript implementation across components and API routes.

## Project Structure
A scalable architecture combining **Feature-Sliced Design** principles with **Atomic Design** components:

```
roky-portfolio/
├── src/
│   ├── app/                  # Next.js 16 App Router
│   │   ├── (landing)/        # Landing page route group
│   │   ├── api/              # API routes (Chat, etc.)
│   │   ├── blog/             # Blog pages
│   │   ├── case-studies/     # Case study pages
│   │   ├── playground/       # Interactive code playground
│   │   └── globals.css       # Tailwind CSS 4 setup and global styles
│   ├── components/           # Atomic Design System
│   │   ├── atoms/            # Base UI primitives (buttons, inputs)
│   │   ├── molecules/        # Composite components
│   │   └── organisms/        # Complex, self-contained sections
│   ├── features/             # Domain-Specific Logic
│   │   ├── blogs/            # Blog components & logic
│   │   ├── case-studies/     # Case study components & logic
│   │   ├── landing/          # Hero, About, and Landing sections
│   │   └── playground/       # Editor configuration & execution logic
│   └── lib/                  # Core Utilities
│       ├── data/             # Static content and constants
│       └── utils.ts          # Shared helper functions
└── public/                   # Static assets
```

## Technology Stack
- **Core**: Next.js 16, TypeScript, React
- **Styling**: Tailwind CSS 4
- **Motion & Interaction**: Framer Motion, Lenis Scroll
- **AI & Data**: Vercel AI SDK, LLM Integration (Groq)
- **Editor Tools**: Monaco Editor

---
*Designed and developed by Roky.*