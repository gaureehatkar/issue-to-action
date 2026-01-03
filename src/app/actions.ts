'use server';

import { analyzeIssueAndProvideGuidance, AnalyzeIssueAndProvideGuidanceOutput } from '@/ai/flows/analyze-issue-and-provide-guidance';
import { z } from 'zod';

const formSchema = z.object({
  issueDescription: z.string().min(50, 'Please provide a more detailed description of your issue (at least 50 characters).'),
  issueCategory: z.string(),
});

interface ActionState {
  data: AnalyzeIssueAndProvideGuidanceOutput | null;
  error: string | null;
}

export async function getGuidance(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = formSchema.safeParse({
    issueDescription: formData.get('issueDescription'),
    issueCategory: formData.get('issueCategory') || 'Other',
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = fieldErrors.issueDescription?.join(', ') || 'Invalid input.';
    return {
      data: null,
      error: errorMessage,
    };
  }
  
  const issueWithCategory = `Category: ${validatedFields.data.issueCategory}\n\nIssue: ${validatedFields.data.issueDescription}`;

  try {
    const result = await analyzeIssueAndProvideGuidance({
      issueDescription: issueWithCategory,
    });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred while analyzing your issue. Please try again later.' };
  }
}
