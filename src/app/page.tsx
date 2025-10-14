'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { User, UserCog } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const TechShape = ({ className }: { className?: string }) => (
    <div
      className={cn(
        'absolute rounded-full bg-primary/10 animate-float',
        className
      )}
    />
  );

export default function Home() {
  const schoolLogo = PlaceHolderImages.find(p => p.id === 'school-logo');

  return (
    <div className={cn(
        "relative flex flex-col min-h-screen bg-background overflow-hidden",
        "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),hsl(var(--background)))]",
        "animate-background-pan"
    )}>
        <TechShape className="h-32 w-32 top-1/4 left-1/4" style={{ animationDelay: '0s', animationDuration: '10s' }}/>
        <TechShape className="h-48 w-48 top-1/2 left-2/3" style={{ animationDelay: '2s', animationDuration: '12s' }} />
        <TechShape className="h-24 w-24 bottom-1/4 right-1/4" style={{ animationDelay: '4s', animationDuration: '8s' }} />
        <TechShape className="h-16 w-16 bottom-1/2 left-1/3" style={{ animationDelay: '6s', animationDuration: '15s' }} />
        <TechShape className="hidden md:block h-40 w-40 top-1/3 right-1/4" style={{ animationDelay: '1s', animationDuration: '11s' }} />

      <main className="flex-1 flex flex-col items-center justify-center text-center p-4 z-10">
        <div className="flex flex-col items-center space-y-4 border rounded-3xl p-8 md:p-12 bg-background/50 backdrop-blur-sm shadow-[0_8px_16px_-4px_hsl(var(--primary)/0.3),0_-8px_16px_-4px_hsl(var(--accent)/0.3)]">
          {schoolLogo && (
            <Image
              src={schoolLogo.imageUrl}
              alt={schoolLogo.description}
              width={250}
              height={250}
              data-ai-hint={schoolLogo.imageHint}
              className="rounded-full"
            />
          )}
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            BSIT Enrollment System
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xs">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/student-login">
                <User />
                Students
              </Link>
            </Button>
            <Button asChild variant="accent" size="lg" className="rounded-full">
              <Link href="/admin-login">
                <UserCog />
                Administrator
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background/50 backdrop-blur-sm z-10">
        <p className="text-xs text-muted-foreground text-center">
          &copy; BUMBBLEBITTECH | All rights reserved.
        </p>
      </footer>
    </div>
  );
}
