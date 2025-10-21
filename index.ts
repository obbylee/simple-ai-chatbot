import { GoogleGenerativeAI } from "@google/generative-ai";
import promptSync from "prompt-sync";
import chalk from "chalk";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

const prompt = promptSync();

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      temperature: 0.9,
    },
  });

  console.log(chalk.blueBright('🤖 Gemini Chatbot (type "exit" to quit)'));

  while (true) {
    const userInput = prompt(chalk.green("You: "));
    if (userInput.trim().toLowerCase() === "exit") {
      console.log(chalk.yellow("Goodbye!"));
      break;
    }

    try {
      const result = await chat.sendMessage(userInput);
      const reply = result.response.text();
      console.log(chalk.cyan("Gemini:"), reply);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(chalk.red("❌ Error:"), error.message);
      } else {
        console.error(chalk.red("Unknown error occurred."), error);
      }
    }
  }
}

run().catch(console.error);
