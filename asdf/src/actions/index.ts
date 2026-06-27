import { RunToolAction } from "./runToolAction.js";
import { listTools } from "../tools/index.js";

export function createActions() {
  const tools = listTools();
  const action = new RunToolAction(tools);

  return {
    metadata: [{ name: action.name, description: action.description }],
    runtime: action,
  };
}
