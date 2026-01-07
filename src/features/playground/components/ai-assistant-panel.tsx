"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User, StopCircle, AlertCircle, CloudCog, ExternalLink } from "lucide-react";
import { useCompletion } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface AIAssistantPanelProps {
  code: string;
  challengeId?: string;
  className?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
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

export function AIAssistantPanel({ code, challengeId, className }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    completion,
    complete,
    isLoading,
    error,
    input,
    setInput,
    stop
  } = useCompletion({
    api: "/api/playground",
    onFinish: (prompt, completion) => {
      console.log("Finished streaming completion", completion);
      // Add assistant message to messages array
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: completion
      }]);
    },
    onError: (error: Error) => {
      console.error("AI Chat Error:", error);
      toast.error(error.message || "Failed to get response from AI");
    },
  });

  // Auto-scroll to bottom when messages or completion changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, completion]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    // Add user message to messages array
    setMessages(prev => [...prev, userMessage]);

    // Clear input
    const currentInput = input;
    setInput("");

    // Call complete with the prompt and additional data
    await complete(currentInput, {
      body: {
        code,
        challengeId,
        messages: [...messages, userMessage]
      }
    });
  };

  const handleQuickAction = async (action: string) => {
    if (isLoading) return;

    let prompt = "";
    switch (action) {
      case "hint":
        prompt = "Can you give me a hint for this challenge without solving it?";
        break;
      case "explain":
        prompt = "Can you explain how the current code works?";
        break;
      case "optimize":
        prompt = "Do you see any ways to optimize this code?";
        break;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt
    };

    setMessages(prev => [...prev, userMsg]);

    await complete(prompt, {
      body: {
        code,
        challengeId,
        messages: [...messages, userMsg]
      }
    });
  };

  const handleStop = () => {
    stop();
    toast.info("Stopped generating response");
  };


  return (
    <div className={cn("flex flex-col flex-1 bg-background border border-border rounded-lg max-h-[54svh] overflow-hidden", className)}>
      {/* Header */}
      <div className="flex justify-between items-center bg-muted/50 px-4 py-3 border-border border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex w-2 h-2">
            <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
            <span className="inline-flex relative bg-green-500 rounded-full w-2 h-2"></span>
          </span>
          <span className="ml-1 text-muted-foreground text-xs">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 p-4 overflow-y-auto"
        onWheel={(e) => {
          // Prevent scroll propagation to parent when scrolling inside chat
          e.stopPropagation();
        }}
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col justify-center items-center space-y-4 opacity-50 h-full text-center">
            <Bot size={48} />
            <p>How can I help you with your code today?</p>
            <div className="gap-2 grid grid-cols-1 w-full max-w-xs">
              <button
                onClick={() => handleQuickAction("hint")}
                className="flex items-center gap-2 bg-background hover:bg-muted p-2 border border-border rounded-md text-sm transition-colors"
              >
                <Sparkles size={14} />
                <span>Get a hint</span>
              </button>
              <button
                onClick={() => handleQuickAction("explain")}
                className="flex items-center gap-2 bg-background hover:bg-muted p-2 border border-border rounded-md text-sm transition-colors"
              >
                <Bot size={14} />
                <span>Explain code</span>
              </button>
              <button
                onClick={() => handleQuickAction("optimize")}
                className="flex items-center gap-2 bg-background hover:bg-muted p-2 border border-border rounded-md text-sm transition-colors"
              >
                <Sparkles size={14} />
                <span>Optimize solution</span>
              </button>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-3 max-w-[85%] text-sm",
              m.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "flex justify-center items-center rounded-full w-8 h-8 shrink-0",
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
            )}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={cn(
              "p-3 rounded-lg overflow-hidden",
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border border-border"
            )}>
              {m.role === "user" ? (
                m.content
              ) : (
                <div className="dark:prose-invert max-w-none break-words prose prose-sm">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && completion && (
          <div className="flex gap-3 max-w-[85%] text-sm">
            <div className="flex justify-center items-center bg-muted border border-border rounded-full w-8 h-8 shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-background p-3 border border-border rounded-lg overflow-hidden">
              <div className="dark:prose-invert max-w-none break-words prose prose-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {completion}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        {isLoading && !completion && (
          <div className="flex gap-3 text-sm">
            <div className="flex justify-center items-center bg-muted border border-border rounded-full w-8 h-8 shrink-0">
              <Bot size={14} />
            </div>
            <div className="flex items-center py-2 h-full">
              <span className="text-muted-foreground text-xs animate-pulse">Thinking...</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex gap-3 bg-destructive/10 p-3 border border-destructive/20 rounded-lg text-sm">
            <AlertCircle className="mt-0.5 w-4 h-4 text-destructive shrink-0" />
            <div className="flex-1">
              <p className="mb-1 font-medium text-destructive text-xs">Error</p>
              <p className="text-destructive/90 text-xs">{error.message || "Failed to get response from AI"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleFormSubmit} className="bg-background p-3 border-border border-t">
        <div className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 pr-10 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="top-1 right-1 absolute flex justify-center items-center hover:bg-destructive/10 rounded-md w-8 h-8 text-destructive hover:text-destructive/80 transition-colors"
              title="Stop generating"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="top-1 right-1 absolute flex justify-center items-center hover:bg-muted rounded-md w-8 h-8 text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading || !input?.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
