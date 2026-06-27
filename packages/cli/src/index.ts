import { intro } from "@clack/prompts";
import { collectConfig } from "./prompts/collectConfig.js";
import { generateProject } from "./generators/generateProject.js";

async function main() {
  intro("Welcome to create-agent-app 🚀");

  const config = await collectConfig();

  await generateProject(config);
}

main();