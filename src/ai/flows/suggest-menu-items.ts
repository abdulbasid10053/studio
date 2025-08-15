'use server';

/**
 * @fileOverview A flow for generating intelligent menu suggestions based on time of day and location.
 *
 * - suggestMenuItems - A function that returns menu suggestions.
 * - MenuSuggestionsInput - The input type for the suggestMenuItems function.
 * - MenuSuggestionsOutput - The return type for the suggestMenuItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuSuggestionsInputSchema = z.object({
  timeOfDay: z
    .string()
    .describe("The current time of day, e.g., '10:00 PM'."),
  location: z.string().describe('The customer’s current location.'),
});

export type MenuSuggestionsInput = z.infer<typeof MenuSuggestionsInputSchema>;

const MenuSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested menu items.'),
});

export type MenuSuggestionsOutput = z.infer<typeof MenuSuggestionsOutputSchema>;

export async function suggestMenuItems(input: MenuSuggestionsInput): Promise<MenuSuggestionsOutput> {
  return suggestMenuItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuSuggestionsPrompt',
  input: {schema: MenuSuggestionsInputSchema},
  output: {schema: MenuSuggestionsOutputSchema},
  prompt: `You are a helpful assistant for a modern, street-food style fried rice restaurant called "Nasgor X Starbag Muzar".

Your goal is to suggest creative and appealing menu items based on the time of day and the customer's location. The restaurant is open from 4:00 PM (16:00) to 2:00 AM (02:00).

It is currently {{{timeOfDay}}} and the customer is in {{{location}}}.

Suggest a maximum of 5 menu items based on the rules below:

- If the time is between 10:00 PM (22:00) and 2:00 AM (02:00), suggest something extra spicy and satisfying for a late-night craving. For example, "Nasi Goreng Mawut extra pedas" or "Bakmi Goreng Spesial dengan topping lelehan telur."
- If the time is past midnight (00:00 or later), include a comforting drink suggestion like hot tea ('Teh' panas) or ginger milk ('Jahe Susu').
- Be creative with your suggestions. You can combine items or suggest variations (e.g., "extra spicy", "with a sunny-side-up egg").
- Keep the suggestions exciting and in line with a modern, trendy street food vibe.
`,
});

const suggestMenuItemsFlow = ai.defineFlow(
  {
    name: 'suggestMenuItemsFlow',
    inputSchema: MenuSuggestionsInputSchema,
    outputSchema: MenuSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
