'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Loader2 } from 'lucide-react';
import { getGuidance } from '@/app/actions';
import GuidanceDisplay from './guidance-display';
import { useToast } from "@/hooks/use-toast";
import GuidanceSkeleton from './guidance-skeleton';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Get Guidance'
      )}
    </Button>
  );
}

function FormContent({ formAction }: { formAction: (payload: FormData) => void }) {
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="issueDescription"
          placeholder="For example: 'I have been working for over 10 hours a day without overtime pay for the last 3 months...'"
          className="min-h-[150px] text-base resize-y"
          required
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Press Ctrl+Enter (or ⌘+Enter) to submit
          </p>
          <SubmitButton />
        </div>
      </form>
      {pending && <GuidanceSkeleton />}
    </>
  );
}


export default function IssueAnalyzer() {
  const [state, formAction] = useActionState(getGuidance, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Describe Your Issue</CardTitle>
          <CardDescription>
            Provide a detailed description of your labor or employment situation. The more detail, the better the guidance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormContent formAction={formAction} />
        </CardContent>
      </Card>
      
      {state.data && !state.error && <GuidanceDisplay result={state.data} />}

      <Alert variant="default" className="bg-card border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="font-headline">Disclaimer</AlertTitle>
        <AlertDescription>
          The information provided by this tool is for informational purposes only and does not constitute legal advice. Please consult with a qualified professional for advice on your specific situation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
