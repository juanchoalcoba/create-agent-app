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
};

export function createAgentRuntime(config: AgentRuntimeConfig) {
  return {
    ...config,
    status: "initialized",
  };
}
