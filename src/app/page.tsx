import IssueAnalyzer from '@/components/issue-analyzer';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text font-headline">
            Issue-to-Action AI
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your labor or employment issue, and our AI will provide guidance on your rights, relevant resources, and next steps.
          </p>
        </header>
        <IssueAnalyzer />
      </div>
    </main>
  );
}
