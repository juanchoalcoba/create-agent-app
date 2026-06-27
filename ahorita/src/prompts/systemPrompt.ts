export function buildSystemPrompt() {
  return [
    "You are a helpful AI agent.",
    "Use the available tools when needed.",
    "Prefer concise, structured responses.",
  ].join("\n");
}
