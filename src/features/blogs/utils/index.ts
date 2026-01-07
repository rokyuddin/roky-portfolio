import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
    {
        slug: "modern-web-design-trends-2024",
        title: "Modern Web Design Trends Shaping 2024",
        excerpt: "Explore the latest design paradigms transforming digital experiences, from minimalist aesthetics to immersive interactions.",
        content: `
# Modern Web Design Trends Shaping 2024

The digital landscape is evolving at an unprecedented pace, and staying ahead of design trends is crucial for creating compelling web experiences. In this comprehensive guide, we'll explore the cutting-edge trends that are defining modern web design.

## 1. Minimalist Aesthetics with Maximum Impact

Less is more has never been more relevant. Modern web design embraces clean, uncluttered interfaces that prioritize user experience and content clarity.

## 2. Dark Mode Evolution

Dark mode has evolved from a simple color scheme toggle to a sophisticated design system that considers accessibility, contrast ratios, and user preferences.

## 3. Micro-interactions and Animations

Subtle animations and micro-interactions create delightful user experiences, guiding users through interfaces with visual feedback and engaging transitions.

## 4. Glassmorphism and Visual Depth

The glassmorphism trend brings depth and hierarchy to interfaces through frosted glass effects, creating layers that feel both modern and tactile.

## Conclusion

Staying current with design trends while maintaining timeless usability principles is the key to creating exceptional web experiences that resonate with users.
    `,
        date: "2024-11-15",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["Design", "UI/UX", "Web Development"],
        coverImage: "/placeholder-blog-1.jpg",
        readTime: "5 min read",
    },
    {
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices for Scalable Applications",
        excerpt: "Master TypeScript patterns and practices that will transform your codebase into a maintainable, type-safe masterpiece.",
        content: `
# TypeScript Best Practices for Scalable Applications

TypeScript has become the de facto standard for building robust JavaScript applications. Let's dive into best practices that will elevate your TypeScript skills.

## Type Safety First

Always prefer explicit typing over implicit any. Type safety is not just about catching bugs—it's about creating self-documenting code.

\`\`\`typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // implementation
}

// Avoid
function getUser(id: any): any {
  // implementation
}
\`\`\`

## Leverage Utility Types

TypeScript's built-in utility types like Partial, Pick, Omit, and Record can dramatically reduce boilerplate.

## Strict Mode Configuration

Always enable strict mode in your tsconfig.json. It catches potential issues early and enforces better coding practices.

## Conclusion

These practices will help you build more maintainable and scalable TypeScript applications.
    `,
        date: "2024-11-10",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["TypeScript", "Best Practices", "Development"],
        coverImage: "/placeholder-blog-2.jpg",
        readTime: "7 min read",
    },
    {
        slug: "nextjs-performance-optimization",
        title: "Next.js Performance Optimization: A Complete Guide",
        excerpt: "Unlock blazing-fast performance in your Next.js applications with these advanced optimization techniques and strategies.",
        content: `
# Next.js Performance Optimization: A Complete Guide

Performance is not just a feature—it's a fundamental requirement for modern web applications. Let's explore how to make your Next.js apps lightning fast.

## Image Optimization

Next.js's Image component is a game-changer for performance. It automatically optimizes images, lazy loads them, and serves them in modern formats.

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
\`\`\`

## Code Splitting and Dynamic Imports

Leverage dynamic imports to split your bundle and load components only when needed.

\`\`\`tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
});
\`\`\`

## Server Components and Streaming

Next.js 13+ introduces React Server Components, enabling you to render components on the server and stream them to the client.

## Caching Strategies

Implement effective caching strategies using Next.js's built-in mechanisms and edge caching through CDNs.

## Conclusion

Performance optimization is an ongoing process. Monitor, measure, and iterate to keep your applications fast and responsive.
    `,
        date: "2024-11-05",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["Next.js", "Performance", "React"],
        coverImage: "/placeholder-blog-3.jpg",
        readTime: "8 min read",
    },
    {
        slug: "react-hooks-deep-dive",
        title: "React Hooks: A Deep Dive into Modern React",
        excerpt: "Master React Hooks with practical examples and advanced patterns that will revolutionize how you build React applications.",
        content: `
# React Hooks: A Deep Dive into Modern React

React Hooks have fundamentally changed how we write React components. Let's explore the power and flexibility they bring to modern development.

## useState: Managing Local State

The useState hook is the foundation of state management in functional components.

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

## useEffect: Side Effects and Lifecycle

useEffect combines componentDidMount, componentDidUpdate, and componentWillUnmount into a single API.

## Custom Hooks: Reusable Logic

Create custom hooks to encapsulate and reuse stateful logic across components.

\`\`\`tsx
function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## Performance Optimization with useMemo and useCallback

Optimize expensive computations and prevent unnecessary re-renders.

## Conclusion

React Hooks enable cleaner, more maintainable code. Embrace them to write better React applications.
    `,
        date: "2024-10-28",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["React", "Hooks", "JavaScript"],
        coverImage: "/placeholder-blog-4.jpg",
        readTime: "6 min read",
    },
    {
        slug: "css-grid-flexbox-mastery",
        title: "CSS Grid and Flexbox: The Complete Layout Guide",
        excerpt: "Master modern CSS layout techniques and create responsive, flexible designs that adapt beautifully to any screen size.",
        content: `
# CSS Grid and Flexbox: The Complete Layout Guide

Modern CSS provides powerful layout tools that make creating responsive designs easier than ever. Let's master Grid and Flexbox.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space along a single axis, making it perfect for navigation bars, card layouts, and centering content.

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

Grid shines when you need precise control over both rows and columns.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Combining Grid and Flexbox

The real power comes from using both together—Grid for the overall layout, Flexbox for component internals.

## Responsive Design Patterns

Use CSS Grid's auto-fit and minmax for truly responsive layouts that adapt without media queries.

## Conclusion

Master these layout techniques to create beautiful, responsive designs with less code and more flexibility.
    `,
        date: "2024-10-20",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["CSS", "Layout", "Responsive Design"],
        coverImage: "/placeholder-blog-5.jpg",
        readTime: "5 min read",
    },
    {
        slug: "web-accessibility-fundamentals",
        title: "Web Accessibility: Building Inclusive Digital Experiences",
        excerpt: "Learn how to create accessible web applications that everyone can use, regardless of their abilities or disabilities.",
        content: `
# Web Accessibility: Building Inclusive Digital Experiences

Web accessibility is not optional—it's a fundamental requirement for creating inclusive digital experiences. Let's explore how to build accessible applications.

## Semantic HTML: The Foundation

Always use semantic HTML elements. They provide built-in accessibility features and meaningful structure.

\`\`\`html
<!-- Good -->
<nav>
  <ul>
    <li><a href="#home">Home</a></li>
  </ul>
</nav>

<!-- Avoid -->
<div class="nav">
  <div class="nav-item">
    <span onclick="navigate()">Home</span>
  </div>
</div>
\`\`\`

## ARIA Attributes

Use ARIA attributes to enhance accessibility when semantic HTML isn't enough.

## Keyboard Navigation

Ensure all interactive elements are accessible via keyboard. Test your application with Tab, Enter, and Arrow keys.

## Color Contrast and Visual Design

Maintain sufficient color contrast ratios (WCAG AA: 4.5:1 for normal text, 3:1 for large text).

## Screen Reader Testing

Test your applications with screen readers like NVDA, JAWS, or VoiceOver.

## Conclusion

Accessibility benefits everyone. Build it into your process from day one, not as an afterthought.
    `,
        date: "2024-10-12",
        author: {
            name: "Md Rokyuddin",
            avatar: "👨‍💻",
        },
        tags: ["Accessibility", "Web Standards", "Inclusive Design"],
        coverImage: "/placeholder-blog-6.jpg",
        readTime: "6 min read",
    },
];

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get blog posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return blogPosts.filter((post) => post.tags.includes(tag));
}
