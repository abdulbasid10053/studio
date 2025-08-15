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
  location: z.string().describe('The customer\u2019s current location.'),
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
  prompt: `You are a helpful assistant that suggests menu items from Nasgor X Starbag Muzar based on the time of day and customer location.

It is currently {{{timeOfDay}}} and the customer is in {{{location}}}.

{% if timeOfDay >= "22:00" and timeOfDay < "02:00" %}
Since it's late, suggest an extra spicy dish.
{% endif %}

{% if timeOfDay >= "00:00" %}
Since it's past midnight, suggest a sleep aid such as hot tea.
{% endif %}

Suggest a maximum of 5 menu items.
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
