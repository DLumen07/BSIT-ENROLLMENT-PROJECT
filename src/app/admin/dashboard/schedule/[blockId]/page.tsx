
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Trash2, Pencil, Clock } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Subject = {
    id: number;
    code: string;
    description: string;
    day: string;
    startTime: string;
    endTime: string;
    instructor: string;
    color: string;
};

const initialSubjects: Subject[] = [
    { id: 1, code: 'IT-101', description: 'Intro to Computing', day: 'Monday', startTime: '09:00', endTime: '10:30', instructor: 'Mr. Smith', color: 'bg-blue-200/50 dark:bg-blue-800/50 border-blue-400' },
    { id: 2, code: 'MATH-101', description: 'Calculus I', day: 'Tuesday', startTime: '13:00', endTime: '14:30', instructor: 'Ms. Jones', color: 'bg-green-200/50 dark:bg-green-800/50 border-green-400' },
    { id: 3, code: 'ENG-101', description: 'English Composition', day: 'Wednesday', startTime: '11:00', endTime: '12:30', instructor: 'Dr. Brown', color: 'bg-yellow-200/50 dark:bg-yellow-800/50 border-yellow-400' },
    { id: 4, code: 'PE-101', description: 'Physical Education', day: 'Friday', startTime: '08:00', endTime: '10:00', instructor: 'Coach Dave', color: 'bg-orange-200/50 dark:bg-orange-800/50 border-orange-400' },
    { id: 5, code: 'IT-102', description: 'Programming 1', day: 'Monday', startTime: '14:00', endTime: '16:00', instructor: 'Mr. Smith', color: 'bg-purple-200/50 dark:bg-purple-800/50 border-purple-400' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = Array.from({ length: 12 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`); // 7 AM to 6 PM

const HOUR_HEIGHT_REM = 4; // 4rem = 64px per hour

const timeToPosition = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const totalMinutes = (hour - 7) * 60 + minute;
    return (totalMinutes / 60) * HOUR_HEIGHT_REM;
};

const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

export default function SchedulePage() {
    const params = useParams();
    const blockId = decodeURIComponent(params.blockId as string);

    const [subjects] = React.useState<Subject[]>(initialSubjects);

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
                <CardContent className="p-4 overflow-x-auto">
                    <div className="grid grid-cols-[4rem_1fr] min-w-[800px]">
                        {/* Time Column */}
                        <div className="flex flex-col">
                           <div className="h-10"></div> {/* Spacer for day header */}
                           {timeSlots.map(time => (
                               <div key={time} className="h-16 flex items-start justify-end pr-2">
                                   <span className="text-xs text-muted-foreground -translate-y-1/2">{formatTime(time)}</span>
                               </div>
                           ))}
                        </div>

                        {/* Schedule Grid */}
                        <div className="grid grid-cols-6 relative">
                            {/* Day Headers */}
                            {days.map(day => (
                                <div key={day} className="h-10 text-center font-semibold text-muted-foreground text-sm p-2 sticky top-0 bg-background z-10">{day}</div>
                            ))}

                            {/* Grid Lines */}
                             <div className="col-span-6 grid grid-cols-6 grid-rows-12 relative">
                                {Array.from({ length: 12 * 6 }).map((_, i) => (
                                    <div key={i} className="h-16 border-t border-r border-dashed"></div>
                                ))}
                            </div>
                            
                            {/* Scheduled Subjects */}
                            <div className="absolute inset-0 top-10">
                                {subjects.map(subject => {
                                    const top = timeToPosition(subject.startTime);
                                    const height = timeToPosition(subject.endTime) - top;
                                    const dayIndex = days.indexOf(subject.day);
                                    
                                    if (dayIndex === -1) return null;

                                    return (
                                        <div
                                            key={subject.id}
                                            className={cn("absolute rounded-lg p-2 border text-xs overflow-hidden m-px w-[calc(100%-4px)]", subject.color)}
                                            style={{
                                                top: `${top}rem`,
                                                height: `${height}rem`,
                                                left: `calc(${(100 / 6) * dayIndex}% + 2px)`,
                                                width: `calc(${(100 / 6)}% - 4px)`,
                                            }}
                                        >
                                            <p className="font-bold truncate">{subject.code}</p>
                                            <p className="truncate">{subject.description}</p>
                                            <p className="truncate text-muted-foreground">{subject.instructor}</p>
                                            
                                            <div className="absolute bottom-1 right-1 left-1 text-muted-foreground flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-sm text-[10px]">
                                                <Clock className="h-3 w-3 shrink-0" />
                                                <span className="truncate">{formatTime(subject.startTime)} - {formatTime(subject.endTime)}</span>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="absolute top-0 right-0 h-6 w-6 p-1 text-muted-foreground hover:bg-transparent hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
