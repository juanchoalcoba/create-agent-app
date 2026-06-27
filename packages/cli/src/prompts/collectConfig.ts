import { text, select } from "@clack/prompts";
import type { AgentConfig } from "../types/config.js";

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

  let model: string | undefined;

  if (String(provider) === "ollama") {
    const ollamaModel = await text({
      message: "Which local Ollama model do you want to use?",
      placeholder: "gemma4:latest",
      initialValue: "gemma4:latest",
    });

    model = typeof ollamaModel === "string" ? ollamaModel : "gemma4:latest";
  }

  return {
    projectName: String(projectName),
    architecture: String(architecture),
    provider: String(provider),
    model: model ? String(model) : undefined,
  };
}