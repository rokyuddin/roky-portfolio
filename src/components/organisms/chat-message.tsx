import { cn } from "@/lib/utils";
import { UIDataTypes, UIMessage, UITools } from "ai";
import { User, Bot, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface ChatMessageProps {
  message: UIMessage<unknown, UIDataTypes, UITools>;
}

// Custom components for markdown rendering
const markdownComponents: Components = {
  // Links
  a: ({ node, children, href, ...props }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-300 dark:text-blue-400 decoration-1 hover:decoration-2 underline underline-offset-2 break-all transition-all duration-200"
      {...props}
    >
      <span className="break-words">{children}</span>
      <ExternalLink className="w-3 h-3 shrink-0" />
    </a>
  ),

  // Headings
  h1: ({ node, children, ...props }) => (
    <h1 className="mt-4 first:mt-0 mb-2 font-bold text-xl" {...props}>{children}</h1>
  ),
  h2: ({ node, children, ...props }) => (
    <h2 className="mt-3 first:mt-0 mb-2 font-bold text-lg" {...props}>{children}</h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3 className="mt-3 first:mt-0 mb-1 font-bold text-base" {...props}>{children}</h3>
  ),
  h4: ({ node, children, ...props }) => (
    <h4 className="mt-2 first:mt-0 mb-1 font-bold text-sm" {...props}>{children}</h4>
  ),
  h5: ({ node, children, ...props }) => (
    <h5 className="mt-2 first:mt-0 mb-1 font-semibold text-sm" {...props}>{children}</h5>
  ),
  h6: ({ node, children, ...props }) => (
    <h6 className="mt-2 first:mt-0 mb-1 font-semibold text-xs" {...props}>{children}</h6>
  ),

  // Lists
  ul: ({ node, children, ...props }) => (
    <ul className="space-y-1 my-2 ml-2 list-disc list-inside" {...props}>{children}</ul>
  ),
  ol: ({ node, children, ...props }) => (
    <ol className="space-y-1 my-2 ml-2 list-decimal list-inside" {...props}>{children}</ol>
  ),
  li: ({ node, children, ...props }) => (
    <li className="leading-relaxed" {...props}>{children}</li>
  ),

  // Code
  code: ({ node, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const inline = !node?.position || node.position.start.line === node.position.end.line;

    if (inline) {
      return (
        <code
          className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs break-words"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-2 rounded-md overflow-hidden">
        {language && (
          <div className="bg-black/20 dark:bg-white/20 px-3 py-1 font-semibold text-xs">
            {language}
          </div>
        )}
        <pre className="bg-black/10 dark:bg-white/10 p-3 overflow-x-auto">
          <code className="block font-mono text-xs break-words whitespace-pre-wrap" {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },

  // Blockquotes
  blockquote: ({ node, children, ...props }) => (
    <blockquote
      className="bg-black/5 dark:bg-white/5 my-2 py-1 pl-3 border-blue-500 dark:border-blue-400 border-l-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ node, children, ...props }) => (
    <div className="my-2 overflow-x-auto">
      <table className="border border-border min-w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ node, children, ...props }) => (
    <thead className="bg-black/10 dark:bg-white/10" {...props}>{children}</thead>
  ),
  tbody: ({ node, children, ...props }) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ node, children, ...props }) => (
    <tr className="border-border border-b" {...props}>{children}</tr>
  ),
  th: ({ node, children, ...props }) => (
    <th className="px-3 py-2 font-semibold text-xs text-left" {...props}>{children}</th>
  ),
  td: ({ node, children, ...props }) => (
    <td className="px-3 py-2 text-xs" {...props}>{children}</td>
  ),

  // Paragraphs
  p: ({ node, children, ...props }) => (
    <p className="my-2 first:mt-0 last:mb-0 leading-relaxed" {...props}>{children}</p>
  ),

  // Horizontal rule
  hr: ({ node, ...props }) => (
    <hr className="my-3 border-border" {...props} />
  ),

  // Strong and emphasis
  strong: ({ node, children, ...props }) => (
    <strong className="font-bold" {...props}>{children}</strong>
  ),
  em: ({ node, children, ...props }) => (
    <em className="italic" {...props}>{children}</em>
  ),

  // Strikethrough
  del: ({ node, children, ...props }) => (
    <del className="opacity-75 line-through" {...props}>{children}</del>
  ),
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-2 py-2 w-full",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex justify-center items-center border rounded-full w-8 h-8 shrink-0",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={cn(
          "px-3 py-2 rounded-lg max-w-[80%] overflow-hidden text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="dark:prose-invert max-w-none overflow-x-auto break-words prose prose-sm">
          {message.parts.map((part, index) => {
            const text = (part as any).text || "";

            return (
              <ReactMarkdown
                key={index}
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {text}
              </ReactMarkdown>
            );
          })}
        </div>
      </div>
    </div>
  );
}
