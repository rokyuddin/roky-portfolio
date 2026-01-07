"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Nav } from "@/components/organisms/nav";
import { OutputPanel } from "@/features/playground/components/output-panel";
import { ChallengeSelector } from "@/features/playground/components/challenge-selector";
import { AIAssistantPanel } from "@/features/playground/components/ai-assistant-panel";
import { Play, RotateCcw, Share2, } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Challenge, ExecutionResult } from "../types";
import { challenges } from "../utils";
import { executeCode } from "../lib";

const CodeEditor = dynamic(() => import("@/features/playground/components/code-editor").then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => <div className="bg-muted/10 border border-border rounded-lg w-full h-full animate-pulse" />
});

export function PlaygroundClient() {
  const [code, setCode] = useState<string>("");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(challenges[0]);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentTab, setCurrentTab] = useState("code");

  // Load starter code when challenge changes
  useEffect(() => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode);
      setExecutionResult(null);
    }
  }, [selectedChallenge]);

  const handleRunCode = async () => {
    if (!code?.trim()) return;

    setCurrentTab("output");
    setIsExecuting(true);
    try {
      const result = await executeCode(code);
      setExecutionResult(result);

      if (result.errors.length === 0) {
        toast.success("Code executed successfully");
      } else {
        toast.error("Execution failed with errors");
      }
    } catch (error) {
      toast.error("Failed to execute code");
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode);
      setExecutionResult(null);
      toast.info("Code reset to starter template");
    }
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col bg-background mx-auto max-w-4xl min-h-screen font-sans">
      <Nav />

      <main className="flex flex-col flex-1 pt-24 pb-6 w-full h-[calc(100vh-2rem)]">
        {/* Header Controls */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-6">
          <div className="flex-1">
            <ChallengeSelector
              selectedChallenge={selectedChallenge}
              onSelectChallenge={setSelectedChallenge}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex justify-center items-center bg-background hover:bg-accent disabled:opacity-50 px-3 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 h-9 font-medium text-sm transition-colors hover:text-accent-foreground disabled:pointer-events-none"
              onClick={handleReset}
              title="Reset Code"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Reset
            </button>
            <button
              className="inline-flex justify-center items-center bg-background hover:bg-accent disabled:opacity-50 px-3 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 h-9 font-medium text-sm transition-colors hover:text-accent-foreground disabled:pointer-events-none"
              onClick={handleShare}
              title="Share Solution"
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="inline-flex justify-center items-center bg-primary hover:bg-primary/90 disabled:opacity-50 px-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 min-w-[100px] h-9 font-medium text-primary-foreground text-sm transition-colors disabled:pointer-events-none"
            >
              {isExecuting ? (
                "Running..."
              ) : (
                <>
                  <Play className="mr-2 w-4 h-4" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <div className="flex gap-1 border-border border-b">
            <button
              className={cn(
                "inline-flex justify-center items-center disabled:opacity-50 px-4 py-2 rounded-t-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-medium text-sm whitespace-nowrap transition-all disabled:pointer-events-none",
                currentTab === 'code'
                  ? "bg-muted text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setCurrentTab('code')}
            >
              Code
            </button>
            <button
              className={cn(
                "inline-flex justify-center items-center disabled:opacity-50 px-4 py-2 rounded-t-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-medium text-sm whitespace-nowrap transition-all disabled:pointer-events-none",
                currentTab === 'output'
                  ? "bg-muted text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setCurrentTab('output')}
            >
              Output
            </button>
            <button
              className={cn(
                "inline-flex justify-center items-center disabled:opacity-50 px-4 py-2 rounded-t-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-medium text-sm whitespace-nowrap transition-all disabled:pointer-events-none",
                currentTab === 'ai-assistant'
                  ? "bg-muted text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setCurrentTab('ai-assistant')}
            >
              AI Assistant
            </button>
          </div>
        </div>

        <div className="flex flex-1 gap-6 min-h-0">

          {
            currentTab === 'code' ?
              <div className="flex flex-col flex-1 min-w-0">
                <CodeEditor
                  value={code}
                  onChange={(val) => setCode(val || "")}
                />
              </div>
              :
              currentTab === 'output' ?
                <div className="flex-1 min-w-0">
                  <OutputPanel
                    result={executionResult}
                    isExecuting={isExecuting}
                  />
                </div>
                :
                currentTab === 'ai-assistant' ?
                  <AIAssistantPanel
                    code={code}
                    challengeId={selectedChallenge?.id}
                  />
                  :
                  <div>

                  </div>
          }
        </div>

      </main>
    </div>
  );
}
