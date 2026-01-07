"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/atoms/button";
import { MessageCircle, X } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathaname = usePathname()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (pathaname === "/playground") {
    return null;
  }

  return (
    <div className="right-10 bottom-20 z-50 fixed flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="flex flex-col bg-background shadow-xl border border-border rounded-lg w-[350px] sm:w-[400px] h-[500px] overflow-hidden"
          >
            <div className="flex justify-between items-center bg-muted/50 p-4 border-border border-b">
              <div>
                <h3 className="font-semibold">Talk to Roky's AI</h3>
                <p className="text-muted-foreground text-xs">Ask me anything about my work!</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div
              className="flex-1 space-y-4 p-4 overflow-y-auto"
              ref={scrollRef}
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.length === 0 && (
                <div className="py-8 text-muted-foreground text-sm text-center">
                  👋 Hi! I'm Roky's digital assistant. Ask me about his projects, skills, or experience.
                </div>
              )}
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
            </div>

            <ChatInput
              input={input}
              handleInputChange={(e) => setInput(e.target.value)}
              handleSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput("");
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex justify-center items-center shadow-lg border border-border rounded-full w-14 h-14 transition-all duration-300",
          isOpen ? "rotate-90" : ""
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
