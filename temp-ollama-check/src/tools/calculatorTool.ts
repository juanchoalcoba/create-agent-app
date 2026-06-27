import type { BaseTool, ToolContext, ToolResult } from "./baseTool.js";

export class CalculatorTool implements BaseTool {
  name = "calculator";
  description = "Perform simple arithmetic calculations";

  execute(context: ToolContext): ToolResult {
    const normalized = context.input.trim();
    const result = Number(normalized);

    if (Number.isNaN(result)) {
      return {
        ok: false,
        output: "",
        error: "Input must be a number",
      };
    }

    return {
      ok: true,
      output: `Result: ${result}`,
    };
  }
}
