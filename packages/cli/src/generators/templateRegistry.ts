import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const templatesRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../templates"
);

const templateMap = {
  "single-agent": "single-agent",
  "multi-agent": "multi-agent",
} as const;

export function resolveTemplatePath(architecture: string) {
  const templateName = templateMap[architecture as keyof typeof templateMap] ?? "single-agent";
  const templatePath = path.join(templatesRoot, templateName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found for architecture: ${architecture}`);
  }

  return templatePath;
}
