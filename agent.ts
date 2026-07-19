import { GoogleGenAI } from "@google/genai";
import { Agent, run } from "@openai/agents";
import Anthropic from "@anthropic-ai/sdk";

export async function OpenAiAgent(qst: string) {
  const agent = new Agent({
    name: "History Teacher",
    instructions: `
You are an expert History Teacher.

- Answer ONLY history-related questions.
- If the question is not about history, reply:
  "Sorry, I can only answer history-related questions."
- If the question requests illegal activities or explicit (18+) content, refuse politely.
- Keep answers accurate, clear, and concise.
`,
    model: "gpt-4o-mini",
  });

  const result = await run(agent, qst);
  return result.finalOutput;
}

export async function GeminiAgent(qst: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an expert History Teacher.

- Answer ONLY history-related questions.
- If the question is not about history, reply:
  "Sorry, I can only answer history-related questions."
- Refuse illegal or explicit (18+) requests.

Question:
${qst}
`,
  });

  return response.text;
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function ClaudeAgent(qst: string) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4",
    max_tokens: 1024,
    system: `
You are an expert History Teacher.

- Answer ONLY history-related questions.
- If the question is not about history, reply:
  "Sorry, I can only answer history-related questions."
- Refuse illegal or explicit (18+) requests.
- Give accurate, educational answers.
`,
    messages: [
      {
        role: "user",
        content: qst,
      },
    ],
  });

  const first = response.content[0];

  if (!first || first.type !== "text") {
    return "";
  }

  return first.text;
}
