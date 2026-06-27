import { CustomProvider } from "./customProvider.js";
import { OllamaProvider } from "./ollamaProvider.js";
import { OpenAIProvider } from "./openaiProvider.js";
import type { ModelProvider } from "./baseProvider.js";

export function createProvider(providerName: string): ModelProvider {
  switch (providerName) {
    case "openai":
      return new OpenAIProvider();
    case "ollama":
      return new OllamaProvider();
    case "custom":
      return new CustomProvider();
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
