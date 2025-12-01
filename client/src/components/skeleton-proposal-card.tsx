import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProposalCard() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <Skeleton className="aspect-[2/3] w-full animate-pulse" />
      <CardContent className="flex-1 p-4 space-y-4">
        <Skeleton className="h-6 w-3/4 animate-pulse" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2 animate-pulse" />
          <Skeleton className="h-4 w-2/3 animate-pulse" />
          <Skeleton className="h-4 w-3/4 animate-pulse" />
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton className="h-1.5 w-full animate-pulse" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16 animate-pulse" />
            <Skeleton className="h-3 w-20 animate-pulse" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2 flex-col">
        <Skeleton className="h-10 w-full animate-pulse" />
        <Skeleton className="h-10 w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
}
