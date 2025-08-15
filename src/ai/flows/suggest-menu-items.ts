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

const menuCategories = [
  {
    category: "Nasi Goreng",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Magelangan", price: "13K" },
      { name: "Hongkong", price: "14K" },
      { name: "Cumi", price: "15K" },
      { name: "Jumbo", price: "18K" },
      { name: "Mawut", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
      { name: "Spesial", price: "18K" },
      { name: "Istimewa", price: "20K" },
    ],
  },
  {
    category: "Bakmi",
    description: "Goreng / Rebus",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Kwetiau",
    description: "Goreng / Rebus",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Bihun",
    description: "Goreng / Rebus",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Capcay",
    items: [
      { name: "Ayam (Biasa)", price: "13K" },
      { name: "Bakso", price: "13K" },
      { name: "Sosis", price: "13K" },
      { name: "Spesial", price: "18K" },
      { name: "Jumbo", price: "18K" },
      { name: "Ati Ampela", price: "18K" },
    ],
  },
  {
    category: "Topping",
    items: [
      { name: "Telur Dadar", price: "4K" },
      { name: "Telur Ceplok Mata Sapi", price: "4K" },
      { name: "Sosis", price: "1K" },
      { name: "Bakso", price: "1K" },
    ],
  },
  {
    category: "Minuman",
    description: "Es / Panas",
    items: [
        { name: "Teh", price: "3K" },
        { name: "Jeruk", price: "3K" },
        { name: "Lemon", price: "4K" },
        { name: "Nutrisari", price: "4K" },
        { name: "Segar Dingin", price: "4K" },
        { name: "Susu Coklat/Putih", price: "4K" },
        { name: "Good Day", price: "4K" },
        { name: "Indocafe Coffeemix", price: "4K" },
        { name: "Luwak Whitecoffee", price: "4K" },
        { name: "Torabika Cappuccino", price: "4K" },
        { name: "Nescafe Clasic", price: "4K" },
        { name: "Kopi Kapal Api", price: "4K" },
        { name: "Jahe", price: "4K" },
        { name: "Jahe Susu", price: "4K" },
        { name: "Lemontea", price: "4K" },
        { name: "Teh Susu", price: "4K" },
        { name: "Milo", price: "4K" },
        { name: "Chocolatos", price: "4K" },
    ]
  }
];

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
  input: {schema: MenuSuggestionsInputSchema.extend({menu: z.any()})},
  output: {schema: MenuSuggestionsOutputSchema},
  prompt: `You are a helpful assistant that suggests menu items from Nasgor X Starbag Muzar based on the time of day and customer location.

You MUST only suggest items from the following menu. Do not suggest anything that is not on this list.

Menu:
{{#each menu}}
- {{category}}{{#if description}} ({{description}}){{/if}}:
  {{#each items}}
  - {{name}} ({{price}})
  {{/each}}
{{/each}}

It is currently {{{timeOfDay}}} and the customer is in {{{location}}}.

Suggest a maximum of 5 menu items based on the rules below.

- If the time is between 10:00 PM (22:00) and 2:00 AM (02:00), suggest an extra spicy dish. You can suggest any of the Nasi Goreng, Bakmi, Kwetiau, or Bihun dishes and mention that it can be made extra spicy.
- If the time is past midnight (00:00 or later), include a sleep aid such as hot tea ('Teh' panas) in the suggestions.
`,
});

const suggestMenuItemsFlow = ai.defineFlow(
  {
    name: 'suggestMenuItemsFlow',
    inputSchema: MenuSuggestionsInputSchema,
    outputSchema: MenuSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt({...input, menu: menuCategories});
    return output!;
  }
);
