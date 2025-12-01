# Roky Portfolio

A modern, high-performance personal portfolio website built with Next.js 16, Tailwind CSS 4, and integrated AI features. This project showcases my work, experience, and thoughts, featuring an interactive playground and an AI-powered assistant.

## 🚀 Features

- **Modern UI/UX**: Built with a clean, responsive design using Tailwind CSS and Framer Motion for smooth animations.
- **AI-Powered Assistant**: Integrated chatbot using Vercel AI SDK to answer questions about my background and skills.
- **Interactive Playground**: A code playground powered by Monaco Editor to demonstrate coding skills live.
- **Case Studies & Blog**: Dedicated sections for detailed project breakdowns and technical articles.
- **Smooth Scrolling**: Implemented with Lenis for a premium browsing experience.
- **Dark/Light Mode**: Fully supported theming system.
- **Responsive Design**: Optimized for all devices from mobile to desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (Groq)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Markdown**: React Markdown, Rehype, Remark

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (or npm/yarn/bun)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/roky-portfolio.git
    cd roky-portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Environment Setup:**

    Create a `.env.local` file in the root directory and add the necessary API keys for the AI features (e.g., Groq API Key).

    ```env
    GROQ_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
roky-portfolio/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components
│   ├── ui/             # Generic UI components (buttons, inputs, etc.)
│   ├── chat/           # AI Chatbot components
│   ├── playground/     # Interactive playground components
│   └── ...             # Section-specific components (Hero, About, etc.)
├── lib/                # Utility functions and shared logic
├── public/             # Static assets (images, fonts)
└── ...
```