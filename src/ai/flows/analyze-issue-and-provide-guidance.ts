'use server';

/**
 * @fileOverview Analyzes a user-provided description of a labor issue and provides relevant labor rights,
 * applicable government schemes/resources, and clear next steps.
 *
 * - analyzeIssueAndProvideGuidance - A function that handles the issue analysis and guidance process.
 * - AnalyzeIssueAndProvideGuidanceInput - The input type for the analyzeIssueAndProvideGuidance function.
 * - AnalyzeIssueAndProvideGuidanceOutput - The return type for the analyzeIssueAndProvideGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeIssueAndProvideGuidanceInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A detailed description of the labor or employment issue.'),
});
export type AnalyzeIssueAndProvideGuidanceInput = z.infer<
  typeof AnalyzeIssueAndProvideGuidanceInputSchema
>;

const AnalyzeIssueAndProvideGuidanceOutputSchema = z.object({
  laborRights: z
    .string()
    .describe('An explanation of the relevant labor rights in simple language.'),
  governmentSchemes: z
    .string()
    .describe(
      'Applicable government schemes and resources with links and brief descriptions.'
    ),
  nextSteps: z
    .string()
    .describe(
      'Clear next steps for the user, including where to complain, documents needed, and official portals.'
    ),
});
export type AnalyzeIssueAndProvideGuidanceOutput = z.infer<
  typeof AnalyzeIssueAndProvideGuidanceOutputSchema
>;

export async function analyzeIssueAndProvideGuidance(
  input: AnalyzeIssueAndProvideGuidanceInput
): Promise<AnalyzeIssueAndProvideGuidanceOutput> {
  return analyzeIssueAndProvideGuidanceFlow(input);
}

const analyzeIssueAndProvideGuidancePrompt = ai.definePrompt({
  name: 'analyzeIssueAndProvideGuidancePrompt',
  input: {schema: AnalyzeIssueAndProvideGuidanceInputSchema},
  output: {schema: AnalyzeIssueAndProvideGuidanceOutputSchema},
  prompt: `You are an AI assistant specialized in labor and employment issues.

  Analyze the user-provided description of their labor issue and provide the following information:

  1.  Relevant Labor Rights: Explain the relevant labor rights in simple, easy-to-understand language based on the identified issue.
  2.  Applicable Government Schemes/Resources: Suggest applicable government schemes and resources based on the issue. Include links and brief descriptions.
  3.  Next Steps: Provide clear, safe, and general next steps for the user, including where to complain, documents needed, and official portals.

  Issue Description: {{{issueDescription}}}
  `,
});

const analyzeIssueAndProvideGuidanceFlow = ai.defineFlow(
  {
    name: 'analyzeIssueAndProvideGuidanceFlow',
    inputSchema: AnalyzeIssueAndProvideGuidanceInputSchema,
    outputSchema: AnalyzeIssueAndProvideGuidanceOutputSchema,
  },
  async input => {
    const {output} = await analyzeIssueAndProvideGuidancePrompt(input);
    return output!;
  }
);
