import { intro } from "@clack/prompts";
import { collectConfig } from "./prompts/collectConfig";

async function main() {
  intro("Welcome to create-agent-app 🚀");

  const config = await collectConfig();

  console.log(config);
}

main();