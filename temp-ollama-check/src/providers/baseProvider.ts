export interface ModelProvider {
  name: string;
  generate(prompt: string, options?: Record<string, unknown>): Promise<string>;
}
