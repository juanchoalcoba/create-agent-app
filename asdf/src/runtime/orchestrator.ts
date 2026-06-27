import type { ToolResult } from "../tools/baseTool.js";
import type { RunToolAction } from "../actions/runToolAction.js";

export type AgentExecutionResult = {
  ok: boolean;
  output: string;
  error?: string;
  toolResult?: ToolResult;
};

export function createOrchestrator(action: RunToolAction) {
  return {
    async run(input: string): Promise<AgentExecutionResult> {
      const result = await action.execute(input);

      return {
        ok: result.ok,
        output: result.output,
        error: result.error,
        toolResult: result,
      };
    },
  };
}
