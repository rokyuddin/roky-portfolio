import { streamText, convertToModelMessages, UIMessage } from "ai";
import { groq } from '@ai-sdk/groq';

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { 
    prompt, 
    messages, 
    code, 
    challengeId 
  }: { 
    prompt?: string;
    messages?: UIMessage[];
    code?: string;
    challengeId?: string;
  } = body;

  const systemPrompt = `You are an AI Coding Assistant for Roky's Interactive Code Playground.

## Your Role
You help users learn and improve their coding skills by providing hints, explanations, and suggestions. You should be encouraging, educational, and never give away complete solutions unless explicitly asked.

## Guidelines

### When Providing Hints:
- Give progressive hints that guide thinking without revealing the answer
- Ask leading questions to help users discover solutions themselves
- Reference relevant concepts or patterns
- Never provide the complete solution on the first hint request

### When Explaining Code:
- Break down complex code into understandable parts
- Explain the "why" behind coding decisions, not just the "what"
- Highlight best practices and potential improvements
- Use analogies when helpful

### When Optimizing Code:
- Identify performance bottlenecks
- Suggest more efficient algorithms or data structures
- Point out readability improvements
- Explain trade-offs between different approaches

### When Debugging:
- Help identify the root cause of errors
- Suggest debugging strategies
- Explain common pitfalls
- Guide users to fix issues themselves when possible

## Context
${code ? `Current Code:\n\`\`\`javascript\n${code}\n\`\`\`` : ''}
${challengeId ? `Challenge ID: ${challengeId}` : ''}

## Tone
- Friendly and encouraging
- Patient and supportive
- Educational, not just instructional
- Celebrate progress and learning moments

Remember: Your goal is to help users learn, not just solve problems for them.`;

  try {
    // Construct the full message history
    const allMessages: any[] = [];

    // Add history if provided
    if (messages && Array.isArray(messages)) {
      allMessages.push(...messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })));
    }

    // Add the new prompt if provided (useCompletion sends 'prompt')
    if (prompt) {
      allMessages.push({ role: 'user', content: prompt });
    }

    // If no prompt and no messages, error out
    if (allMessages.length === 0) {
       throw new Error("No prompt or messages provided");
    }

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: systemPrompt,
      messages: allMessages,
    });

    const resultStream = result.toUIMessageStreamResponse();

    return resultStream;
  } catch (error) {
    console.error("Playground API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
