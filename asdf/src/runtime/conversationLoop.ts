import type { AgentExecutionResult } from "./orchestrator.js";

export type ConversationTurn = {
  input: string;
  result: AgentExecutionResult;
};

export function createConversationLoop(run: (input: string) => Promise<AgentExecutionResult>) {
  const history: ConversationTurn[] = [];

  return {
    async runTurn(input: string) {
      const result = await run(input);
      history.push({ input, result });
      return { result, history };
    },
    getHistory() {
      return history;
    },
  };
}
