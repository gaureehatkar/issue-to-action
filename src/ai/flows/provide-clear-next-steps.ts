'use server';

/**
 * @fileOverview Provides clear, general next steps for users to address their labor issues.
 *
 * - provideClearNextSteps - A function that provides clear, general next steps.
 * - ProvideClearNextStepsInput - The input type for the provideClearNextSteps function.
 * - ProvideClearNextStepsOutput - The return type for the provideClearNextSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideClearNextStepsInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('The description of the labor or employment issue.'),
});
export type ProvideClearNextStepsInput = z.infer<
  typeof ProvideClearNextStepsInputSchema
>;

const ProvideClearNextStepsOutputSchema = z.object({
  nextSteps: z
    .string()
    .describe(
      'Clear, general next steps for the user, including where to complain, documents needed, and official portals. Should be a numbered or bulleted list.'
    ),
});
export type ProvideClearNextStepsOutput = z.infer<
  typeof ProvideClearNextStepsOutputSchema
>;

export async function provideClearNextSteps(
  input: ProvideClearNextStepsInput
): Promise<ProvideClearNextStepsOutput> {
  return provideClearNextStepsFlow(input);
}

const provideClearNextStepsPrompt = ai.definePrompt({
  name: 'provideClearNextStepsPrompt',
  input: {schema: ProvideClearNextStepsInputSchema},
  output: {schema: ProvideClearNextStepsOutputSchema},
  prompt: `You are an AI assistant that provides users with clear, general next steps they can take to address their labor issues.

  Based on the following description of the issue:
  {{issueDescription}}

  Provide a numbered or bulleted list of general next steps the user can take. Include information such as where to complain, what documents might be needed, and links to official government portals where possible.  Be very clear that the information is not legal advice and is for informational purposes only.
  `,
});

const provideClearNextStepsFlow = ai.defineFlow(
  {
    name: 'provideClearNextStepsFlow',
    inputSchema: ProvideClearNextStepsInputSchema,
    outputSchema: ProvideClearNextStepsOutputSchema,
  },
  async input => {
    const {output} = await provideClearNextStepsPrompt(input);
    return output!;
  }
);
