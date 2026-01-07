"use client";

import { AlertCircle, CheckCircle2, Clock, Terminal } from "lucide-react";
import { ExecutionResult } from "../types";

interface OutputPanelProps {
  result: ExecutionResult | null;
  isExecuting: boolean;
}

export function OutputPanel({ result, isExecuting }: OutputPanelProps) {
  if (isExecuting) {
    return (
      <div className="flex justify-center items-center bg-muted/20 border border-border rounded-lg h-full">
        <div className="text-center">
          <div className="mx-auto mb-3 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          <p className="text-muted-foreground text-sm">Executing code...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex justify-center items-center bg-muted/20 border border-border rounded-lg h-full">
        <div className="text-muted-foreground text-center">
          <Terminal className="opacity-50 mx-auto mb-3 w-12 h-12" />
          <p className="text-sm">Click "Run Code" to see output</p>
        </div>
      </div>
    );
  }

  const hasOutput = result.output.length > 0;
  const hasErrors = result.errors.length > 0;

  return (
    <div className="flex flex-col bg-background border border-border rounded-lg h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-muted/50 px-4 py-2 border-border border-b">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Output</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          {hasErrors ? (
            <div className="flex items-center gap-1 text-destructive">
              <AlertCircle className="w-3 h-3" />
              <span>Error</span>
            </div>
          ) : hasOutput ? (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Success</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{result.executionTime.toFixed(2)}ms</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        {/* Output */}
        {hasOutput && (
          <div className="space-y-1">
            {result.output.map((line, index) => (
              <div key={`output-${index}`} className="text-foreground">
                <span className="mr-2 text-muted-foreground">›</span>
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
