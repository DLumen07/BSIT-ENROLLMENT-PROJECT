import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-primary text-primary-foreground">
        <Link href="#" className="flex items-center justify-center font-semibold">
          <GraduationCap className="h-6 w-6 mr-2" />
          BSIT Enrollment
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <Image
          src={PlaceHolderImages[0].imageUrl}
          alt="School Logo"
          width={150}
          height={150}
          data-ai-hint={PlaceHolderImages[0].imageHint}
          className="mb-8"
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
          BSIT Enrollment System
        </h1>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button asChild size="lg">
            <Link href="#">Students</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="#">Administrator</Link>
          </Button>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground text-center">
          &copy; 2024 BSIT Enrollment System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
