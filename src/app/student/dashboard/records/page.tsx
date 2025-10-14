
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const enrollmentHistory = [
    { semester: 'A.Y. 2024-2025, 1st Sem', status: 'Enrolled', date: '2024-08-15', gpa: null },
    { semester: 'A.Y. 2023-2024, 2nd Sem', status: 'Completed', date: '2024-05-20', gpa: '1.75' },
    { semester: 'A.Y. 2023-2024, 1st Sem', status: 'Completed', date: '2023-12-18', gpa: '1.50' },
    { semester: 'A.Y. 2022-2023, 2nd Sem', status: 'Completed', date: '2023-05-22', gpa: '1.85' },
    { semester: 'A.Y. 2022-2023, 1st Sem', status: 'Completed', date: '2022-12-19', gpa: '1.65' },
];

const studentDocuments = [
    { name: 'Birth Certificate (PSA)', status: 'Submitted' },
    { name: 'Form 138 (High School Card)', status: 'Submitted' },
    { name: 'Certificate of Good Moral Character', status: 'Submitted' },
    { name: 'Enrollment Form (A.Y. 2024-2025, 1st Sem)', status: 'Submitted' },
    { name: 'Medical Certificate', status: 'Pending' },
];


export default function RecordsPage() {

    const getStatusVariant = (status: string) => {
        if (status === 'Enrolled') return 'default';
        if (status === 'Completed') return 'secondary';
        return 'outline';
    };

    const getDocStatusVariant = (status: string) => {
        if (status === 'Submitted') return 'secondary';
        if (status === 'Pending') return 'destructive';
        return 'outline';
    };


    return (
        <main className="flex-1 p-4 sm:p-6 space-y-6">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold tracking-tight">My Records</h1>
                <p className="text-muted-foreground">
                    A comprehensive history of your academic and enrollment records.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Enrollment History</CardTitle>
                            <CardDescription>A timeline of your past and present enrollment statuses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pl-6">
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                                {enrollmentHistory.map((item, index) => (
                                    <div key={index} className="relative mb-8 last:mb-0">
                                        <div className="absolute -left-9 h-6 w-6 rounded-full bg-background flex items-center justify-center">
                                            {item.status === 'Completed' ? <CheckCircle className="h-6 w-6 text-green-500" /> : <Clock className="h-6 w-6 text-primary" />}
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-semibold">{item.semester}</p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                                                <span className="text-muted-foreground">{item.date}</span>
                                            </div>
                                            {item.gpa && <p className="text-sm mt-1">GPA: <span className="font-medium">{item.gpa}</span></p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Document Records</CardTitle>
                            <CardDescription>Status of your submitted documents.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Document</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentDocuments.map((doc) => (
                                        <TableRow key={doc.name}>
                                            <TableCell className="font-medium">{doc.name}</TableCell>
                                            <TableCell className="text-right">
                                                 <Badge variant={getDocStatusVariant(doc.status)}>{doc.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
