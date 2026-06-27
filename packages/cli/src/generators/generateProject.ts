import path from "node:path";
import type { AgentConfig } from "../types/config.js";
import { scaffoldProject } from "./scaffoldProject.js";

export async function generateProject(config: AgentConfig) {
  scaffoldProject(config);

  const projectPath = path.join(process.cwd(), config.projectName);
  console.log(`\nProject created successfully at ${projectPath}`);
  console.log("Next steps:");
  console.log(`  cd ${config.projectName}`);
  console.log("  copy .env.example .env");
  console.log("  npm install");
  console.log("  npm run dev\n");
}