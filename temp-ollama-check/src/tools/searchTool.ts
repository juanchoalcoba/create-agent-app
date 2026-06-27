import type { BaseTool, ToolContext, ToolResult } from "./baseTool.js";

export class SearchTool implements BaseTool {
  name = "search";
  description = "Search the web or a local index";

  execute(context: ToolContext): ToolResult {
    return {
      ok: true,
      output: `Search executed for: ${context.input}`,
    };
  }
}
