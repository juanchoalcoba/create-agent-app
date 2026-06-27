export type AgentState = {
  memory: string[];
  lastResult?: string;
};

export function createAgentState(initialMemory: string[] = []): AgentState {
  return {
    memory: [...initialMemory],
    lastResult: undefined,
  };
}

export function appendMemory(state: AgentState, entry: string) {
  state.memory.push(entry);
}

export function setLastResult(state: AgentState, result: string) {
  state.lastResult = result;
}
