
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StudentDashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-6">
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Student!</h1>
            <p className="text-muted-foreground">
                Here's a summary of your academic status.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Enrollment Status</CardTitle>
                    <CardDescription>Your current enrollment details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-green-500">Enrolled</p>
                    <p className="text-sm text-muted-foreground">A.Y. 2024-2025, 1st Semester</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Current Block</CardTitle>
                    <CardDescription>Your assigned section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">BSIT 2-A</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Latest news and updates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">Midterm examinations are next week. Good luck!</p>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
