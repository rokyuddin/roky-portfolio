"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Nav } from "@/components/nav";
import { OutputPanel } from "@/components/playground/output-panel";
import { ChallengeSelector } from "@/components/playground/challenge-selector";
import { AIAssistantPanel } from "@/components/playground/ai-assistant-panel";
import { Play, RotateCcw, Share2, PanelRightOpen, PanelRightClose } from "lucide-react";
import { executeCode, ExecutionResult } from "@/lib/playground/code-executor";
import { Challenge, challenges } from "@/lib/playground/challenges";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CodeEditor = dynamic(() => import("@/components/playground/code-editor").then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => <div className="h-full w-full border border-border rounded-lg bg-muted/10 animate-pulse" />
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
    <div className="max-w-4xl mx-auto min-h-screen bg-background flex flex-col font-sans">
      <Nav />
      
      <main className="flex-1 flex flex-col pt-24 pb-6 w-full h-[calc(100vh-2rem)]">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="flex-1">
            <ChallengeSelector 
              selectedChallenge={selectedChallenge} 
              onSelectChallenge={setSelectedChallenge} 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              onClick={handleReset}
              title="Reset Code"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              onClick={handleShare}
              title="Share Solution"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button 
              onClick={handleRunCode} 
              disabled={isExecuting}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 min-w-[100px]"
            >
              {isExecuting ? (
                "Running..."
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <div className="flex gap-1 border-b border-border">
            <button
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
                "inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
                "inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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

        <div className="flex-1 flex gap-6 min-h-0">

        {
          currentTab === 'code' ?
            <div className="flex-1 flex flex-col min-w-0">
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
