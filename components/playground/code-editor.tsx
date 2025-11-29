"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = "javascript",
  readOnly = false 
}: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="flex-1 h-full w-full border border-border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          folding: true,
          bracketPairColorization: {
            enabled: true,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-background">
            <div className="text-muted-foreground">Loading editor...</div>
          </div>
        }
      />
    </div>
  );
}
