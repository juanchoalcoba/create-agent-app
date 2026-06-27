import type { BaseTool, ToolContext, ToolResult } from "../tools/baseTool.js";

export class RunToolAction {
  readonly name = "runTool";
  readonly description = "Execute a registered tool by name";

  constructor(private readonly tools: BaseTool[]) {}

  async execute(input: string): Promise<ToolResult> {
    const toolName = input.trim().toLowerCase();
    const tool = this.tools.find((candidate) => candidate.name === toolName);

    if (!tool) {
      return {
        ok: false,
        output: "",
        error: `Tool not found: ${toolName}`,
      };
    }

    const context: ToolContext = { input: toolName };
    return tool.execute(context);
  }
}
