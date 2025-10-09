
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
                    <CardDescription>Review and process student applications. 'Pending' is the default view.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="pending" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pending">
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Pending Applications</CardTitle>
                                    <CardDescription>Applications awaiting review.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Pending application content will be displayed here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="approved">
                             <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Approved Applications</CardTitle>
                                    <CardDescription>Applications that have been approved.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Approved application content will be displayed here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="rejected">
                             <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Rejected Applications</CardTitle>
                                    <CardDescription>Applications that have been rejected.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Rejected application content will be displayed here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </main>
    </>
  );
}
