import type { ModelProvider } from "./baseProvider.js";

const nodeProcess = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process;

export class OllamaProvider implements ModelProvider {
  name = "ollama";

  async generate(prompt: string): Promise<string> {
    const baseUrl = nodeProcess?.env?.OLLAMA_BASE_URL ?? "http://localhost:11434";
    const model = nodeProcess?.env?.OLLAMA_MODEL ?? "llama3.2";
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      return `Ollama provider is not available at ${baseUrl}. Prompt: ${prompt}`;
    }

    const data = (await response.json()) as { response?: string };
    return data.response ?? "No response from Ollama";
  }
}
