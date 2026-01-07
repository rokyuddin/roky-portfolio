import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-border border-t w-full">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Ask about Roky..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!input.trim()}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
