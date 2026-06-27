import { CalculatorTool } from "./calculatorTool.js";
import { SearchTool } from "./searchTool.js";
import type { BaseTool } from "./baseTool.js";

export function listTools(): BaseTool[] {
  return [new SearchTool(), new CalculatorTool()];
}
