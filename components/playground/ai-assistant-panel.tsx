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
    <div className={cn("flex-1 max-h-[54svh] flex flex-col bg-background border border-border rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-muted-foreground ml-1">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onWheel={(e) => {
          // Prevent scroll propagation to parent when scrolling inside chat
          e.stopPropagation();
        }}
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
            <Bot size={48} />
            <p>How can I help you with your code today?</p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              <button 
                onClick={() => handleQuickAction("hint")}
                className="flex items-center gap-2 p-2 text-sm bg-background border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Sparkles size={14} />
                <span>Get a hint</span>
              </button>
              <button 
                onClick={() => handleQuickAction("explain")}
                className="flex items-center gap-2 p-2 text-sm bg-background border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Bot size={14} />
                <span>Explain code</span>
              </button>
              <button 
                onClick={() => handleQuickAction("optimize")}
                className="flex items-center gap-2 p-2 text-sm bg-background border border-border rounded-md hover:bg-muted transition-colors"
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
              "flex gap-3 text-sm max-w-[85%]",
              m.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
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
                <div className="prose prose-sm max-w-none dark:prose-invert break-words">
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
          <div className="flex gap-3 text-sm max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="p-3 rounded-lg bg-background border border-border overflow-hidden">
              <div className="prose prose-sm max-w-none dark:prose-invert break-words">
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
             <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
               <Bot size={14} />
             </div>
             <div className="flex items-center h-full py-2">
               <span className="text-xs text-muted-foreground animate-pulse">Thinking...</span>
             </div>
           </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="flex gap-3 text-sm p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-destructive font-medium text-xs mb-1">Error</p>
              <p className="text-destructive/90 text-xs">{error.message || "Failed to get response from AI"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-border bg-background">
        <div className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
          />
          {isLoading ? (
            <button 
              type="button"
              onClick={handleStop}
              className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center text-destructive hover:text-destructive/80 rounded-md hover:bg-destructive/10 transition-colors"
              title="Stop generating"
            >
              <StopCircle className="h-4 w-4" />
            </button>
          ) : (
            <button 
              type="submit" 
              className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-primary rounded-md hover:bg-muted transition-colors"
              disabled={isLoading || !input?.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
