import { text, select } from "@clack/prompts";
import type { AgentConfig } from "../types/config";

export async function collectConfig(): Promise<AgentConfig> {
  const projectName = await text({
    message: "Project name?",
    placeholder: "my-agent",
  });

  const architecture = await select({
    message: "Choose architecture",
    options: [
      {
        value: "single-agent",
        label: "Single Agent",
      },
      {
        value: "multi-agent",
        label: "Multi Agent",
      },
    ],
  });

  const provider = await select({
    message: "Choose LLM provider",
    options: [
      {
        value: "openai",
        label: "OpenAI",
      },
      {
        value: "ollama",
        label: "Ollama",
      },
      {
        value: "custom",
        label: "Custom",
      },
    ],
  });

  return {
    projectName: String(projectName),
    architecture: String(architecture),
    provider: String(provider),
  };
}