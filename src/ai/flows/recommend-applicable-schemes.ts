'use server';
/**
 * @fileOverview Recommends government schemes and resources applicable to a labor issue.
 *
 * - recommendApplicableSchemes - A function that recommends government schemes and resources.
 * - RecommendApplicableSchemesInput - The input type for the recommendApplicableSchemes function.
 * - RecommendApplicableSchemesOutput - The return type for the recommendApplicableSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendApplicableSchemesInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the labor or employment issue.'),
});
export type RecommendApplicableSchemesInput = z.infer<
  typeof RecommendApplicableSchemesInputSchema
>;

const SchemeSchema = z.object({
  name: z.string().describe('The name of the government scheme or resource.'),
  description: z.string().describe('A brief description of the scheme.'),
  link: z.string().url().describe('A link to the official scheme website.'),
});

const RecommendApplicableSchemesOutputSchema = z.array(SchemeSchema).describe(
  'A list of applicable government schemes and resources.'
);
export type RecommendApplicableSchemesOutput = z.infer<
  typeof RecommendApplicableSchemesOutputSchema
>;

export async function recommendApplicableSchemes(
  input: RecommendApplicableSchemesInput
): Promise<RecommendApplicableSchemesOutput> {
  return recommendApplicableSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendApplicableSchemesPrompt',
  input: {schema: RecommendApplicableSchemesInputSchema},
  output: {schema: RecommendApplicableSchemesOutputSchema},
  prompt: `You are an AI assistant specialized in recommending applicable government schemes and resources for labor and employment issues.

  Based on the following issue description, identify and recommend relevant government schemes and resources that could assist the user.
  Include a brief description of each scheme and a link to the official website.

  Issue Description: {{{issueDescription}}}

  Format your response as a JSON array of objects, where each object represents a scheme or resource with a name, description, and link.
  `,
});

const recommendApplicableSchemesFlow = ai.defineFlow(
  {
    name: 'recommendApplicableSchemesFlow',
    inputSchema: RecommendApplicableSchemesInputSchema,
    outputSchema: RecommendApplicableSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
