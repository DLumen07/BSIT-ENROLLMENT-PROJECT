
'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Subject = {
    id: number;
    code: string;
    description: string;
    day: string;
    time: string;
};

const initialSubjects: Subject[] = [
    { id: 1, code: 'IT-101', description: 'Introduction to Computing', day: 'Monday', time: '9:00 AM - 10:30 AM' },
    { id: 2, code: 'MATH-101', description: 'Calculus I', day: 'Tuesday', time: '1:00 PM - 2:30 PM' },
    { id: 3, code: 'ENG-101', description: 'English Composition', day: 'Wednesday', time: '11:00 AM - 12:30 PM' },
];

export default function SchedulePage() {
    const params = useParams();
    const blockId = decodeURIComponent(params.blockId as string);

    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

    return (
        <main className="flex-1 p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold tracking-tight">Class Schedule for {blockId}</h1>
                    <p className="text-muted-foreground">
                        Manage the subjects, schedule, and instructors for this block.
                    </p>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Subject
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Scheduled Subjects</CardTitle>
                    <CardDescription>
                        The following subjects are scheduled for this block.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(subject => (
                                <TableRow key={subject.id}>
                                    <TableCell className="font-medium">{subject.code}</TableCell>
                                    <TableCell>{subject.description}</TableCell>
                                    <TableCell>{subject.day}</TableCell>
                                    <TableCell>{subject.time}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
