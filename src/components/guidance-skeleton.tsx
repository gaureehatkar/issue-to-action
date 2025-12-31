import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuidanceSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[90%]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
