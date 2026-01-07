"use client";

import { BookOpen, Trophy } from "lucide-react";
import { challenges } from "../utils";
import { Category, Challenge, Difficulty } from "../types";

interface ChallengeSelectorProps {
  selectedChallenge: Challenge | null;
  onSelectChallenge: (challenge: Challenge) => void;
}

export function ChallengeSelector({
  selectedChallenge,
  onSelectChallenge
}: ChallengeSelectorProps) {

  // Group challenges by category
  const groupedChallenges = challenges.reduce((acc, challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = [];
    }
    acc[challenge.category].push(challenge);
    return acc;
  }, {} as Record<Category, Challenge[]>);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "advanced": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Challenges</h2>
        </div>
      </div>

      <div className="relative">
        <select
          className="bg-background disabled:opacity-50 px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 text-sm appearance-none disabled:cursor-not-allowed"
          value={selectedChallenge?.id || ""}
          onChange={(e) => {
            const challenge = challenges.find(c => c.id === e.target.value);
            if (challenge) onSelectChallenge(challenge);
          }}
        >
          <option value="" disabled>Select a challenge</option>
          {Object.entries(groupedChallenges).map(([category, categoryChallenges]) => (
            <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
              {categoryChallenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.title} ({challenge.difficulty})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="top-3 right-3 absolute pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {selectedChallenge && (
        <div className="space-y-3 bg-muted/30 slide-in-from-top-2 p-4 border border-border rounded-lg animate-in duration-300 fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
              {selectedChallenge.difficulty}
            </span>
            <span className="px-2 py-0.5 border border-border rounded-full text-muted-foreground text-xs capitalize">
              {selectedChallenge.category}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <h3 className="mb-1 font-medium text-foreground">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedChallenge.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
