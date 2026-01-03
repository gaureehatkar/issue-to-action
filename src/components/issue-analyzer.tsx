'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Loader2, Pencil, BotMessageSquare } from 'lucide-react';
import { getGuidance } from '@/app/actions';
import GuidanceDisplay from './guidance-display';
import { useToast } from "@/hooks/use-toast";
import GuidanceSkeleton from './guidance-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from './ui/label';

const initialState = {
  data: null,
  error: null,
};

const issueCategories = [
  "Salary / Wage Issues",
  "PF / ESI Issues",
  "Wrongful Termination",
  "Overtime / Work Hours",
  "Other",
];

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
  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="issueCategory">Select an issue category</Label>
        <Select name="issueCategory" defaultValue="Other">
          <SelectTrigger id="issueCategory" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {issueCategories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueDescription">Describe your issue in detail</Label>
        <Textarea
          id="issueDescription"
          name="issueDescription"
          placeholder="For example: 'I have been working for over 10 hours a day without overtime pay for the last 3 months...'"
          className="min-h-[150px] text-base resize-y"
          required
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          Press Ctrl+Enter (or ⌘+Enter) to submit
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}


export default function IssueAnalyzer() {
  const [state, formAction] = useActionState(getGuidance, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const [submittedIssue, setSubmittedIssue] = useState<{ description: string; category: string } | null>(null);

  const handleFormAction = (formData: FormData) => {
    const description = formData.get('issueDescription') as string;
    const category = formData.get('issueCategory') as string;

    if(description && category) {
      setSubmittedIssue({ description, category });
    }
    
    formAction(formData);
  };
  
  const resetForm = () => {
    setSubmittedIssue(null);
    // A bit of a hack to reset the action state without a native reset API
    (initialState as any).data = null;
    (initialState as any).error = null;
  };

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
      {/* Show submitted issue or the form */}
      {submittedIssue && !pending ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Pencil className="w-6 h-6 text-primary" />
              Your Submitted Issue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-base font-semibold">{submittedIssue.category}</p>
             </div>
             <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-base whitespace-pre-wrap">{submittedIssue.description}</p>
             </div>
             <div className="pt-4">
              <Button variant="outline" onClick={resetForm}>Start New Issue</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Describe Your Issue</CardTitle>
            <CardDescription>
              Provide a detailed description of your labor or employment situation. The more detail, the better the guidance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormContent formAction={handleFormAction} />
          </CardContent>
        </Card>
      )}

      {/* Show loading skeleton */}
      {pending && <GuidanceSkeleton />}
      
      {/* Show results */}
      {state.data && !state.error && !pending && (
        <div className="space-y-8 animate-in fade-in-0 duration-500">
           <div className="flex items-center gap-3 my-4">
             <div className="w-full h-px bg-border" />
             <div className="flex items-center gap-2 flex-shrink-0">
               <BotMessageSquare className="w-6 h-6 text-primary"/>
               <h2 className="text-xl font-bold text-muted-foreground">AI Guidance</h2>
             </div>
             <div className="w-full h-px bg-border" />
          </div>
          <GuidanceDisplay result={state.data} />
        </div>
      )}

      {/* Always show disclaimer at the bottom */}
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
