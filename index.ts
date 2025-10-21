import "dotenv/config";

import type {
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";

import { OpenAI, type ClientOptions } from "openai";
import promptSync from "prompt-sync";
import chalk from "chalk";

const MODEL = "zai-org/GLM-4.6:zai-org";
const HF_API_TOKEN: string | undefined = process.env.HF_API_TOKEN;

if (!HF_API_TOKEN) {
  console.error(
    chalk.red(
      "Error: Hugging Face API token (HF_API_TOKEN) not set in environment variables.",
    ),
  );
  process.exit(1);
}

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_TOKEN,
} as ClientOptions);

const prompt = promptSync();

const messages: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are a helpful assistant. Use English for start.",
  },
];

async function main() {
  console.log(
    chalk.green("🤖 Welcome to your terminal AI chatbot (type 'exit' to quit)"),
  );

  while (true) {
    const input: string = prompt(chalk.blue("You: ")) ?? "";

    if (input.toLowerCase() === "exit") {
      console.log(chalk.green("👋 Goodbye!"));
      break;
    }

    messages.push({ role: "user", content: input });

    if (messages.length > 10) messages.splice(0, messages.length - 10);

    console.log(chalk.gray("Thinking..."));

    try {
      const chatParams: ChatCompletionCreateParams = {
        model: MODEL,
        messages: messages,
      };

      const chatCompletion = await client.chat.completions.create(chatParams);

      const message = chatCompletion.choices?.[0]?.message?.content;

      if (message) {
        console.log(chalk.yellow("AI:"), message);
      } else {
        console.log(chalk.red("AI returned an empty response."));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(chalk.red("OpenAI API Error:"), error.message);
      } else {
        console.error(chalk.red("Unknown error occurred."), error);
      }
    }
  }
}

main();
