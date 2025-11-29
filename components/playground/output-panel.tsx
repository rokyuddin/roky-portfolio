"use client";

import { ExecutionResult } from "@/lib/playground/code-executor";
import { AlertCircle, CheckCircle2, Clock, Terminal } from "lucide-react";

interface OutputPanelProps {
  result: ExecutionResult | null;
  isExecuting: boolean;
}

export function OutputPanel({ result, isExecuting }: OutputPanelProps) {
  if (isExecuting) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 border border-border rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Executing code...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 border border-border rounded-lg">
        <div className="text-center text-muted-foreground">
          <Terminal className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Click "Run Code" to see output</p>
        </div>
      </div>
    );
  }

  const hasOutput = result.output.length > 0;
  const hasErrors = result.errors.length > 0;

  return (
    <div className="h-full flex flex-col bg-background border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Output</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {hasErrors ? (
            <div className="flex items-center gap-1 text-destructive">
              <AlertCircle className="h-3 w-3" />
              <span>Error</span>
            </div>
          ) : hasOutput ? (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>Success</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{result.executionTime.toFixed(2)}ms</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {/* Output */}
        {hasOutput && (
          <div className="space-y-1">
            {result.output.map((line, index) => (
              <div key={`output-${index}`} className="text-foreground">
                <span className="text-muted-foreground mr-2">›</span>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Errors */}
        {hasErrors && (
          <div className="space-y-1 mt-3">
            {result.errors.map((error, index) => (
              <div key={`error-${index}`} className="text-destructive">
                <span className="mr-2">✕</span>
                {error}
              </div>
            ))}
          </div>
        )}

        {/* No output */}
        {!hasOutput && !hasErrors && (
          <div className="text-muted-foreground italic">
            No output
          </div>
        )}
      </div>
    </div>
  );
}
