import type { RunToolAction } from "../actions/runToolAction.js";

export type RouterAction = {
  name: string;
  description: string;
};

export function createRouter(action: RunToolAction) {
  return {
    async handle(input: string) {
      const normalized = input.trim().toLowerCase();

      if (!normalized) {
        return {
          ok: false,
          output: "",
          error: "Input cannot be empty",
        };
      }

      return action.execute(normalized);
    },
  };
}
