"use server";

import { ai } from "@/ai/genkit";
import { z } from "zod";
import { menuCategories } from "@/components/menu.ts";

const OrderItemSchema = z.object({
  name: z.string().describe("The exact name of the menu item as defined in the menu list."),
  category: z.string().describe("The exact category name of the menu item."),
  quantity: z.number().int().positive().describe("The quantity ordered."),
  options: z.object({
    level: z.string().optional().describe("Spiciness level: 'Tidak Pedas', 'Sedang', 'Pedas', or 'Sangat Pedas'. Only for food."),
    temp: z.string().optional().describe("Temperature: 'Es', 'Hangat', or 'Panas'. Only for drinks."),
  }).optional()
});

const ParseOrderResponse = z.object({
  items: z.array(OrderItemSchema)
});

export async function parseVoiceOrder(transcript: string) {
  const menuInfo = JSON.stringify(menuCategories);
  
  const { object } = await ai.generate({
    model: "googleai/gemini-2.0-flash",
    system: `You are an AI assistant for a restaurant cashier. The user will provide a voice transcript of a customer's order.
Your task is to extract the ordered items, map them EXACTLY to the names and categories provided in the menu, and determine the quantity.
For food categories (like Nasi Goreng, Bakmi, etc.), default spiciness to 'Sedang' if not specified.
For Minuman, default temperature to 'Es' if not specified.
If the transcript mentions something not on the menu, ignore it or do your best to match it to a similar item.

Menu:
${menuInfo}
`,
    prompt: `Customer order transcript: "${transcript}"`,
    output: { schema: ParseOrderResponse }
  });
  
  return object?.items || [];
}
