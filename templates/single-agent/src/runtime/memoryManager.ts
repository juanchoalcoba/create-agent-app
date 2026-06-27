export type MemoryEntry = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  timestamp: string;
};

export type MemoryManager = {
  add(entry: MemoryEntry): void;
  getShortTerm(limit?: number): MemoryEntry[];
  getLongTerm(): MemoryEntry[];
};

export function createMemoryManager(): MemoryManager {
  const shortTerm: MemoryEntry[] = [];
  const longTerm: MemoryEntry[] = [];

  return {
    add(entry) {
      shortTerm.push(entry);
      longTerm.push(entry);
    },
    getShortTerm(limit = 5) {
      return shortTerm.slice(-limit);
    },
    getLongTerm() {
      return longTerm;
    },
  };
}
