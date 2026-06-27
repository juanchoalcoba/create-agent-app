import { createActions } from "./actions/index.js";
import { buildSystemPrompt } from "./prompts/systemPrompt.js";
import { createProvider } from "./providers/providerFactory.js";
import { createAgentRuntime } from "./runtime/agent.js";
import { createConversationLoop } from "./runtime/conversationLoop.js";
import { createOrchestrator } from "./runtime/orchestrator.js";
import { createRouter } from "./runtime/router.js";
import { createMemoryManager } from "./runtime/memoryManager.js";
import { appendMemory, createAgentState, setLastResult } from "./runtime/state.js";
import { listTools } from "./tools/index.js";
import type { MemoryManager } from "./runtime/memoryManager.js";
import type { AgentState } from "./runtime/state.js";
import type { ModelProvider } from "./providers/baseProvider.js";

export function createAgentBootstrap(providerName = "openai") {
  const tools = listTools();
  const actions = createActions();
  const router = createRouter(actions.runtime);
  const orchestrator = createOrchestrator(actions.runtime);
  const conversationLoop = createConversationLoop(orchestrator.run.bind(orchestrator));
  const state = createAgentState(["bootstrap"]);
  const memoryManager = createMemoryManager();
  const provider = createProvider(providerName);

  return createAgentRuntime({
    name: "single-agent",
    prompt: buildSystemPrompt(),
    tools: tools.map((tool) => ({ name: tool.name, description: tool.description })),
    actions: actions.metadata.map((action) => ({ name: action.name, description: action.description })),
    router,
    orchestrator,
    conversationLoop,
    state,
    memoryManager,
    provider,
  } as any);
}

const agent = createAgentBootstrap("openai") as {
  name: string;
  prompt: string;
  tools: Array<{ name: string; description: string }>;
  actions: Array<{ name: string; description: string }>;
  provider: ModelProvider;
  router: { handle(input: string): Promise<{ ok: boolean; output: string; error?: string }> };
  orchestrator: { run(input: string): Promise<{ ok: boolean; output: string; error?: string }> };
  conversationLoop: { runTurn(input: string): Promise<{ result: { ok: boolean; output: string; error?: string } }> };
  state: AgentState;
  memoryManager: MemoryManager;
};

console.log(`Agent ${agent.name} ready`);
console.log(`System prompt:\n${agent.prompt}`);
console.log(`Registered tools: ${agent.tools.map((tool) => tool.name).join(", ")}`);
console.log(`Registered actions: ${agent.actions.map((action) => action.name).join(", ")}`);
console.log(`Provider: ${agent.provider.name}`);

const routed = await agent.router.handle("search");
console.log(`Router result: ${routed.ok ? routed.output : routed.error}`);

const orchestrated = await agent.orchestrator.run("search");
console.log(`Orchestrator result: ${orchestrated.ok ? orchestrated.output : orchestrated.error}`);

appendMemory(agent.state, "router-ran");
setLastResult(agent.state, orchestrated.output);
agent.memoryManager.add({ role: "user", content: "search", timestamp: new Date().toISOString() });
agent.memoryManager.add({ role: "assistant", content: orchestrated.output, timestamp: new Date().toISOString() });

const promptResponse = await agent.provider.generate("Hello from the agent");
console.log(`Provider response: ${promptResponse}`);

const conversation = await agent.conversationLoop.runTurn("calculator");
console.log(`Conversation turn: ${conversation.result.ok ? conversation.result.output : conversation.result.error}`);
console.log(`Agent memory: ${agent.state.memory.join(", ")}`);
console.log(`Last result: ${agent.state.lastResult}`);
console.log(`Short-term memory: ${agent.memoryManager.getShortTerm(2).map((entry: { content: string }) => entry.content).join(", ")}`);
