import type { ModelProvider } from "./baseProvider.js";

const nodeProcess = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process;

export class CustomProvider implements ModelProvider {
  name = "custom";

  async generate(prompt: string): Promise<string> {
    const baseUrl = nodeProcess?.env?.CUSTOM_PROVIDER_BASE_URL ?? "http://localhost:3000";
    return `Custom provider response for: ${prompt} (using ${baseUrl})`;
  }
}
