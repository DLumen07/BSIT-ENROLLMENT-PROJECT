
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ManageApplicationsPage() {
  return (
    <>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Link href="/admin/dashboard" className="hover:text-foreground">Admin</Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/admin/dashboard/manage-enrollment" className="hover:text-foreground">Manage Enrollment</Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">Manage Applications</span>
                </div>
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Applications</CardTitle>
                    <CardDescription>Review and process student applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Application management content goes here.</p>
                </CardContent>
            </Card>
        </main>
    </>
  );
}
