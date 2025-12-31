import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Landmark, ListChecks } from 'lucide-react';
import type { AnalyzeIssueAndProvideGuidanceOutput } from '@/ai/flows/analyze-issue-and-provide-guidance';
import { FormattedText } from './formatted-text';

type Props = {
  result: AnalyzeIssueAndProvideGuidanceOutput;
};

const guidanceSections = [
  {
    title: 'Your Rights',
    icon: Scale,
    contentKey: 'laborRights',
  },
  {
    title: 'Applicable Government Schemes',
    icon: Landmark,
    contentKey: 'governmentSchemes',
  },
  {
    title: 'Next Steps',
    icon: ListChecks,
    contentKey: 'nextSteps',
  },
] as const;

export default function GuidanceDisplay({ result }: Props) {
  return (
    <div className="space-y-8">
      {guidanceSections.map((section) => {
        const Icon = section.icon;
        const content = result[section.contentKey];
        
        if (!content) return null;

        return (
          <Card key={section.title} className="shadow-lg animate-in fade-in-0 duration-500">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormattedText text={content} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
