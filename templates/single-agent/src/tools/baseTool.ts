export type ToolContext = {
  input: string;
  metadata?: Record<string, unknown>;
};

export type ToolResult = {
  ok: boolean;
  output: string;
  error?: string;
};

export interface BaseTool {
  name: string;
  description: string;
  execute(context: ToolContext): Promise<ToolResult> | ToolResult;
}
