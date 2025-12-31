'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining labor rights in a clear and simple manner.
 *
 * - explainLaborRightsClearly - A function that takes an issue description as input and returns a simplified explanation of relevant labor rights.
 * - ExplainLaborRightsClearlyInput - The input type for the explainLaborRightsClearly function.
 * - ExplainLaborRightsClearlyOutput - The return type for the explainLaborRightsClearly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainLaborRightsClearlyInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the labor or employment issue.'),
});
export type ExplainLaborRightsClearlyInput = z.infer<typeof ExplainLaborRightsClearlyInputSchema>;

const ExplainLaborRightsClearlyOutputSchema = z.object({
  simplifiedExplanation: z
    .string()
    .describe('A simplified explanation of the relevant labor rights.'),
});
export type ExplainLaborRightsClearlyOutput = z.infer<typeof ExplainLaborRightsClearlyOutputSchema>;

export async function explainLaborRightsClearly(
  input: ExplainLaborRightsClearlyInput
): Promise<ExplainLaborRightsClearlyOutput> {
  return explainLaborRightsClearlyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLaborRightsClearlyPrompt',
  input: {schema: ExplainLaborRightsClearlyInputSchema},
  output: {schema: ExplainLaborRightsClearlyOutputSchema},
  prompt: `You are an AI assistant specializing in labor rights. A user will describe their issue, and you will respond with a simplified explanation of their labor rights.

Issue Description: {{{issueDescription}}}

Simplified Explanation:`,
});

const explainLaborRightsClearlyFlow = ai.defineFlow(
  {
    name: 'explainLaborRightsClearlyFlow',
    inputSchema: ExplainLaborRightsClearlyInputSchema,
    outputSchema: ExplainLaborRightsClearlyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
