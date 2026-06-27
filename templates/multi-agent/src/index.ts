import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import { stdin as input, stdout as output } from "node:process";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return {} as Record<string, string>;
  }

  return readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .reduce<Record<string, string>>((acc, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return acc;
      }

      const separator = trimmed.indexOf("=");

      if (separator === -1) {
        return acc;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      acc[key] = value;
      return acc;
    }, {});
}

function getOllamaConfig() {
  const env = loadEnv();
  return {
    baseUrl: env.OLLAMA_BASE_URL || process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    model: env.OLLAMA_MODEL || process.env.OLLAMA_MODEL || "gemma4:latest",
  };
}

async function callOllama(prompt: string, config: { baseUrl: string; model: string }) {
  const response = await fetch(`${config.baseUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    return `Ollama is not available at ${config.baseUrl}.`;
  }

  const data = (await response.json()) as { response?: string };
  return data.response ?? "No response from Ollama.";
}

console.log("Multi-agent scaffold ready");
console.log("Type 'exit' to quit.\n");

const config = getOllamaConfig();
console.log(`Using Ollama model: ${config.model} at ${config.baseUrl}\n`);

const rl = createInterface({ input, output });

try {
  while (true) {
    const message = (await rl.question("You: ")).trim();

    if (!message) {
      continue;
    }

    if (message.toLowerCase() === "exit") {
      break;
    }

    const response = await callOllama(message, config);
    console.log(`Assistant: ${response}`);
    console.log();
  }
} finally {
  rl.close();
}
