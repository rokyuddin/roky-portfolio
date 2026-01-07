export interface ExecutionResult {
    output: string[];
    errors: string[];
    executionTime: number;
}

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category = "react" | "algorithms" | "dom" | "async";

export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    category: Category;
    starterCode: string;
    solution: string;
    testCases?: Array<{
        input: string;
        expectedOutput: string;
    }>;
}