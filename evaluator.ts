import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function evaluatorAgent(
  question: string,
  openai: string,
  gemini: string,
  claude: string
) {
  const SYSTEMPROMPT = `Rules:
  1. Answer ONLY history-related questions.
  2. If the user's question is NOT about history, do not evaluate the model responses.
  3. If the question requests illegal activities, explicit sexual (18+) content, or any harmful content, do not evaluate the responses.
  4. In these cases, immediately reply with:
     "Sorry, I can only help with history-related questions."
  If the question is a valid history question:
  - Compare the OpenAI, Gemini, and Claude responses.
  - Keep the strongest and most accurate points.
  - Remove incorrect or repetitive information.
  - Produce one clear, accurate final answer.
  - Return only the final synthesized answer.
`;
  const userPrompt = `
  Question:
  ${question}
  
  OpenAI:
  ${openai}
  
  Gemini:
  ${gemini}
  
  Claude:
  ${claude}
  `;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4",
    max_tokens: 1024,
    system: SYSTEMPROMPT,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });
  const first = response.content[0];

  if (!first || first.type !== "text") {
    return "";
  }

  return first.text;
}
