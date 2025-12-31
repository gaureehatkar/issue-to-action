'use server';

import { analyzeIssueAndProvideGuidance, AnalyzeIssueAndProvideGuidanceOutput } from '@/ai/flows/analyze-issue-and-provide-guidance';
import { z } from 'zod';

const formSchema = z.object({
  issueDescription: z.string().min(50, 'Please provide a more detailed description of your issue (at least 50 characters).'),
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
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.issueDescription?.join(', ') ?? 'Invalid input.',
    };
  }

  try {
    const result = await analyzeIssueAndProvideGuidance({
      issueDescription: validatedFields.data.issueDescription,
    });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred while analyzing your issue. Please try again later.' };
  }
}
