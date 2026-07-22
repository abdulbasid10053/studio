"use server";

export interface ParsedVoiceItem {
  category: string;
  name: string;
  options?: Record<string, any>;
  quantity: number;
}

// Genkit AI telah dihapus. Fungsi ini tidak lagi digunakan.
export async function parseVoiceOrder(_transcript: string): Promise<ParsedVoiceItem[]> {
  return [];
}
