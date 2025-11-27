"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  console.log(messages);  

  return (
    <div className="fixed bottom-20 right-10 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-background border border-border rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <div>
                <h3 className="font-semibold">Talk to Roky's AI</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about my work!</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4" 
              ref={scrollRef}
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
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
          "rounded-full h-14 w-14 flex items-center justify-center border border-border shadow-lg transition-all duration-300",
          isOpen ? "rotate-90" : ""
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
