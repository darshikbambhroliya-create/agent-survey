# GenAI Self-Consistency CLI

## Overview

This project demonstrates the **Self-Consistency** technique using multiple Large Language Models (LLMs). Instead of relying on a single AI model, the application collects responses from multiple models and synthesizes them into one improved answer.

The application is built as a **CLI (Command Line Interface)** using **Bun** and **TypeScript**.

## Features

* Accepts a user question from the terminal.
* Sends the same question to:

  * OpenAI
  * Google Gemini
  * Claude
* Displays each model's response.
* Uses Claude as the evaluator to compare all responses.
* Generates a single refined answer.
* Restricts responses to **history-related questions**.
* Rejects non-history, illegal, or explicit (18+) requests.

## Tech Stack

* Bun
* TypeScript
* OpenAI Agents SDK
* Google GenAI SDK
* Anthropic SDK

## Project Structure

```text
.
├── index.ts
├── agents.ts
├── evaluator.ts
├── .env
└── README.md
```

## Installation

Clone the repository and install dependencies:

```bash
bun install
```

or

```bash
bun add ai @openai/agents @google/genai @anthropic-ai/sdk dotenv
```

## Environment Variables

Create a `.env` file in the project root.

```env
OPENAI_API_KEY=your_openai_api_key
GEMINI_KEY=your_gemini_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Running the Project

```bash
bun index.ts
```

or

```bash
bun run index.ts
```

## Workflow

1. User enters a history question.
2. The question is sent simultaneously to OpenAI, Gemini, and Claude.
3. Each model generates its own answer.
4. Claude receives all three responses.
5. Claude compares the responses and combines their strongest points.
6. A single synthesized answer is displayed.

## Example

```text
Ask a history question:

Who was Ashoka?

------------------------------------
OpenAI
...

------------------------------------
Gemini
...

------------------------------------
Claude
...

------------------------------------
Final Synthesized Answer
...
```

## Notes

* Only history-related questions are supported.
* Non-history, illegal, and explicit (18+) requests are rejected.
* API calls to OpenAI, Gemini, and Claude are executed in parallel using `Promise.all()` for better performance.

## Author

Darshit Patel
