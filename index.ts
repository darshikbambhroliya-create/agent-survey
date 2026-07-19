import "dotenv/config";

import { evaluatorAgent } from "./evaluator";
import { ClaudeAgent, GeminiAgent, OpenAiAgent } from "./agent";

async function main() {
  const question = prompt("Ask a history question: ");

  if (!question) {
    console.log("Please enter a question.");
    return;
  }

  console.log("\nGenerating responses...\n");

  const [openai, gemini, claude] = await Promise.all([
    OpenAiAgent(question),
    GeminiAgent(question),
    ClaudeAgent(question),
  ]);

  console.log("\n========== OpenAI ==========");
  console.log(openai);

  console.log("\n========== Gemini ==========");
  console.log(gemini);

  console.log("\n========== Claude ==========");
  console.log(claude);

  console.log("\nGenerating Final Answer...\n");

  const finalAnswer = await evaluatorAgent(
    question,
    openai ?? "",
    gemini ?? "",
    claude ?? ""
  );

  console.log("\n========== FINAL ANSWER ==========");
  console.log(finalAnswer);
}

main().catch((error) => {
  console.error("Error:", error);
});
