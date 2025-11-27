import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 p-4 border-t border-border">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Ask about Roky..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!input.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
