"use server";

import { suggestMenuItems } from "@/ai/flows/suggest-menu-items";
import { z } from "zod";

const SuggestionInputSchema = z.object({
  timeOfDay: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
});

export async function getMenuSuggestions(prevState: any, formData: FormData) {
  const parsed = SuggestionInputSchema.safeParse({
    timeOfDay: formData.get("timeOfDay"),
    location: formData.get("location"),
  });

  if (!parsed.success) {
    return {
      message: "Invalid input.",
      errors: parsed.error.flatten().fieldErrors,
      suggestions: [],
    };
  }
  
  try {
    const result = await suggestMenuItems(parsed.data);
    if (!result || !result.suggestions || result.suggestions.length === 0) {
      return { message: "Could not generate suggestions. Please try again.", suggestions: [] };
    }
    return { message: "Success", suggestions: result.suggestions };
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return { message: "An unexpected error occurred.", suggestions: [] };
  }
}
