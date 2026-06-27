import { OpenAI } from "openai";
import type { ModelProvider } from "./baseProvider.js";

const nodeProcess = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process;

export class OpenAIProvider implements ModelProvider {
  name = "openai";

  async generate(prompt: string): Promise<string> {
    const apiKey = nodeProcess?.env?.OPENAI_API_KEY;
    const model = nodeProcess?.env?.OPENAI_MODEL ?? "gpt-4o-mini";

    if (!apiKey) {
      return `OpenAI provider configured, but OPENAI_API_KEY is not set. Prompt: ${prompt}`;
    }

    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model,
      input: prompt,
    });

    return response.output_text ?? "No response from OpenAI";
  }
}
