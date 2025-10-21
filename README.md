# Terminal AI Chatbot using Hugging Face with Bun & TypeScript

A simple terminal-based AI chatbot built with Bun and TypeScript, leveraging Hugging Face's OpenAI-compatible inference API and the official OpenAI SDK.

---

## Features

- Interactive terminal chat experience with `prompt-sync`
- Uses Hugging Face models via OpenAI-compatible API endpoint
- Maintains conversation context for better AI responses
- Clear error handling and environment variable validation
- Written in TypeScript for type safety
- Lightweight and fast using Bun runtime
- Colored terminal output using `chalk`
- Environment variables loaded using `dotenv`

---

## Prerequisites

- [Bun](https://bun.sh/) installed
- Hugging Face API token with inference permissions — get one from [Hugging Face Tokens](https://huggingface.co/settings/tokens)
- Node.js (optional, if you want to run outside Bun)

---

## Setup & Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Create a .env file in the root directory and add your Hugging Face API token:
   ```env
   HF_API_TOKEN=your_huggingface_api_token_here
   ```
3. Install dependencies with Bun:
   ```bash
   bun install
   ```

### Usage

Start the chatbot with:

```bash
bun run start
```

Type your messages in the terminal and get responses from the AI.
To exit the chat, type:

```bash
exit
```

### Environment Variables

| Variable       | Description                                    | Required |
| -------------- | ---------------------------------------------- | -------- |
| `HF_API_TOKEN` | Your Hugging Face API token for authentication | Yes      |

### Troubleshooting

- Token issues: Make sure your Hugging Face API token is valid and has inference scope.

- Model errors: Verify the model ID and provider name in the code matches available models on Hugging Face.

- Network: Ensure your machine can reach `https://router.huggingface.co/v1`.

- Bun version: Use the latest stable Bun version for best compatibility.
