
'use client';
import React, { useState, useMemo } from 'react';
import { useInstructor } from '@/app/instructor/context/instructor-context';
import { useAdmin } from '@/app/admin/context/admin-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, Users, Edit } from 'lucide-react';
import type { Student } from '@/app/admin/context/admin-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type InstructorClass = {
    block: string;
    subjectCode: string;
    subjectDescription: string;
    studentCount: number;
};

export default function MyClassesPage() {
    const { instructorData, updateStudentGrade } = useInstructor();
    const { adminData } = useAdmin();
    const { toast } = useToast();
    
    const [selectedClass, setSelectedClass] = useState<InstructorClass | null>(null);
    const [isStudentsDialogOpen, setIsStudentsDialogOpen] = useState(false);
    
    const [gradeEdit, setGradeEdit] = useState<{ studentId: string, subjectCode: string, grade: string } | null>(null);

    const studentsInClass = useMemo(() => {
        if (!selectedClass) return [];
        return adminData.students.filter(s => s.block === selectedClass.block);
    }, [selectedClass, adminData.students]);

    const openStudentsDialog = (c: InstructorClass) => {
        setSelectedClass(c);
        setIsStudentsDialogOpen(true);
    };

    const handleSaveGrade = () => {
        if (!gradeEdit) return;

        const gradeValue = parseFloat(gradeEdit.grade);
        if (isNaN(gradeValue) || gradeValue < 1.0 || gradeValue > 5.0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Grade',
                description: 'Please enter a valid grade between 1.0 and 5.0.',
            });
            return;
        }
        
        updateStudentGrade(gradeEdit.studentId, gradeEdit.subjectCode, gradeValue);

        toast({
            title: 'Grade Updated',
            description: `Grade has been saved for student ${gradeEdit.studentId}.`,
        });
        setGradeEdit(null);
    };

    if (!instructorData) return null;

    const { classes, grades } = instructorData;

    return (
        <>
            <main className="flex-1 p-4 sm:p-6 space-y-6">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold tracking-tight">My Classes</h1>
                    <p className="text-muted-foreground">
                        View student lists and manage grades for your assigned classes.
                    </p>
                </div>
                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Class List</CardTitle>
                        <CardDescription>A list of all classes you handle this semester.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Students</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {classes.map(c => (
                                        <TableRow key={`${c.block}-${c.subjectCode}`}>
                                            <TableCell className="font-medium">{c.block}</TableCell>
                                            <TableCell>
                                                <div>{c.subjectCode}</div>
                                                <div className="text-xs text-muted-foreground">{c.subjectDescription}</div>
                                            </TableCell>
                                            <TableCell>{c.studentCount}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" onClick={() => openStudentsDialog(c)}>
                                                    View Class
                                                    <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <Dialog open={isStudentsDialogOpen} onOpenChange={setIsStudentsDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Class Roster: {selectedClass?.block} - {selectedClass?.subjectCode}</DialogTitle>
                        <DialogDescription>
                            {selectedClass?.subjectDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead className="text-right">Final Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentsInClass.map(student => {
                                    const currentGrade = grades[student.studentId]?.find(g => g.subjectCode === selectedClass?.subjectCode)?.grade;
                                    const isEditing = gradeEdit?.studentId === student.studentId && gradeEdit?.subjectCode === selectedClass?.subjectCode;
                                    
                                    return (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person avatar" />
                                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{student.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{student.studentId}</TableCell>
                                            <TableCell className="text-right">
                                                {isEditing ? (
                                                     <div className="flex justify-end items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            step="0.25"
                                                            min="1.0"
                                                            max="5.0"
                                                            value={gradeEdit.grade}
                                                            onChange={(e) => setGradeEdit({ ...gradeEdit, grade: e.target.value })}
                                                            className="h-8 w-24 rounded-md"
                                                            autoFocus
                                                            onBlur={handleSaveGrade}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveGrade()}
                                                        />
                                                     </div>
                                                ) : (
                                                    <div className="flex justify-end items-center gap-2 group">
                                                        <span className="font-semibold">{currentGrade?.toFixed(2) || 'N/A'}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                                            onClick={() => setGradeEdit({ studentId: student.studentId, subjectCode: selectedClass!.subjectCode, grade: currentGrade?.toString() || '' })}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsStudentsDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
