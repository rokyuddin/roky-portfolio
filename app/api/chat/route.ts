import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { portfolioContext } from "@/lib/data/portfolio-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const systemPrompt = `
    You are an AI assistant for Roky's portfolio website.
    Your role is to answer questions about Roky, his skills, projects, and experience.
    
    Here is the context about Roky:
    ${JSON.stringify(portfolioContext, null, 2)}
    
    Instructions:
    - Be friendly, professional, and concise.
    - Only answer questions based on the provided context.
    - If you don't know the answer, say "I don't have that information in my current context, but you can contact Roky directly."
    - Do not make up facts.
    - You are speaking on behalf of Roky's portfolio.
  `;

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
