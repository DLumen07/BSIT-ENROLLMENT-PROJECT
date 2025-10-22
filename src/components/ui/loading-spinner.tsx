
'use client';

import { cn } from '@/lib/utils';

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
        <div className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 rounded-full bg-foreground animate-bounce"></div>
    </div>
  );
}
