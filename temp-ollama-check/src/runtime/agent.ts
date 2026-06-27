import type { ModelProvider } from "../providers/baseProvider.js";

export type ToolDefinition = {
  name: string;
  description: string;
};

export type ActionDefinition = {
  name: string;
  description: string;
};

export type AgentRuntimeConfig = {
  name: string;
  prompt: string;
  tools: ToolDefinition[];
  actions: ActionDefinition[];
  router?: unknown;
  orchestrator?: unknown;
  conversationLoop?: unknown;
  state?: unknown;
  memoryManager?: unknown;
  provider?: ModelProvider;
};

export function createAgentRuntime(config: AgentRuntimeConfig) {
  return {
    ...config,
    status: "initialized",
  };
}
