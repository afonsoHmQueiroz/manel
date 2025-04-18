
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className={cn("flex flex-col items-center", className)}>
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
