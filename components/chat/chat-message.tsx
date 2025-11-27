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
      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200 break-all font-medium"
      {...props}
    >
      <span className="break-words">{children}</span>
      <ExternalLink className="h-3 w-3 shrink-0" />
    </a>
  ),
  
  // Headings
  h1: ({ node, children, ...props }) => (
    <h1 className="text-xl font-bold mt-4 mb-2 first:mt-0" {...props}>{children}</h1>
  ),
  h2: ({ node, children, ...props }) => (
    <h2 className="text-lg font-bold mt-3 mb-2 first:mt-0" {...props}>{children}</h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3 className="text-base font-bold mt-3 mb-1 first:mt-0" {...props}>{children}</h3>
  ),
  h4: ({ node, children, ...props }) => (
    <h4 className="text-sm font-bold mt-2 mb-1 first:mt-0" {...props}>{children}</h4>
  ),
  h5: ({ node, children, ...props }) => (
    <h5 className="text-sm font-semibold mt-2 mb-1 first:mt-0" {...props}>{children}</h5>
  ),
  h6: ({ node, children, ...props }) => (
    <h6 className="text-xs font-semibold mt-2 mb-1 first:mt-0" {...props}>{children}</h6>
  ),
  
  // Lists
  ul: ({ node, children, ...props }) => (
    <ul className="list-disc list-inside space-y-1 my-2 ml-2" {...props}>{children}</ul>
  ),
  ol: ({ node, children, ...props }) => (
    <ol className="list-decimal list-inside space-y-1 my-2 ml-2" {...props}>{children}</ol>
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
          className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono break-words"
          {...props}
        >
          {children}
        </code>
      );
    }
    
    return (
      <div className="my-2 rounded-md overflow-hidden">
        {language && (
          <div className="bg-black/20 dark:bg-white/20 px-3 py-1 text-xs font-semibold">
            {language}
          </div>
        )}
        <pre className="bg-black/10 dark:bg-white/10 p-3 overflow-x-auto">
          <code className="text-xs font-mono block break-words whitespace-pre-wrap" {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
  
  // Blockquotes
  blockquote: ({ node, children, ...props }) => (
    <blockquote
      className="border-l-4 border-blue-500 dark:border-blue-400 pl-3 py-1 my-2 italic bg-black/5 dark:bg-white/5"
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  // Tables
  table: ({ node, children, ...props }) => (
    <div className="my-2 overflow-x-auto">
      <table className="min-w-full border-collapse border border-border" {...props}>
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
    <tr className="border-b border-border" {...props}>{children}</tr>
  ),
  th: ({ node, children, ...props }) => (
    <th className="px-3 py-2 text-left font-semibold text-xs" {...props}>{children}</th>
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
    <del className="line-through opacity-75" {...props}>{children}</del>
  ),
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 py-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-sm max-w-[80%] overflow-hidden",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="break-words overflow-x-auto prose prose-sm max-w-none dark:prose-invert">
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
