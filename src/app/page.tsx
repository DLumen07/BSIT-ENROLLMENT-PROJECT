import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <span className="text-xl font-bold text-primary">
            BSIT Enrollment
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary"
            prefetch={false}
          >
            Testimonials
          </Link>
          <Link
            href="#cta"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary"
            prefetch={false}
          >
            Enroll
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
                    BSIT Enrollment System
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Streamline your enrollment process with our modern and
                    intuitive system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#">Enroll Now</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="#">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/cs-students/600/400"
                alt="Hero"
                width={600}
                height={400}
                data-ai-hint="computer science students"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose Our System?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our enrollment system is designed to provide a seamless and
                  efficient experience for both students and administrators.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Easy Online Registration</h3>
                <p className="text-muted-foreground">
                  Students can register for courses from anywhere, at any time.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Automated Processing</h3>
                <p className="text-muted-foreground">
                  Reduce manual work with automated approval workflows.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Integrated payment gateway for hassle-free fee collection.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">
              What Our Users Say
            </h2>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <p className="text-lg font-semibold">
                    &ldquo;The new system is a game-changer! It made my
                    enrollment so much faster and easier.&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground">
                    - Jane Doe, BSIT Student
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <p className="text-lg font-semibold">
                    &ldquo;As an admin, I love how it streamlines our
                    workflow. We can now process applications in half the
                    time.&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground">
                    - John Smith, Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the countless students who have already experienced the
                future of enrollment.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg">
                <Link href="#">Enroll Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground text-center">
          &copy; 2024 BSIT Enrollment System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
