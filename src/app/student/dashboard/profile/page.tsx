
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { toast } = useToast();
    const [email, setEmail] = useState('student.name@example.com');
    const [contactNumber, setContactNumber] = useState('09123456789');

    const handleSaveChanges = () => {
        // Here you would typically handle form submission, e.g., API call
        toast({
            title: "Profile Updated",
            description: "Your contact information has been successfully updated.",
        });
    };

    return (
        <main className="flex-1 p-4 sm:p-6 space-y-6">
            <div className="space-y-0.5 mb-6">
                <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">
                    View and manage your personal and academic information.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-xl">
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="https://picsum.photos/seed/student-avatar/128/128" alt="Student Name" data-ai-hint="person avatar"/>
                                    <AvatarFallback>SN</AvatarFallback>
                                </Avatar>
                                <Button variant="ghost" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background hover:bg-muted">
                                    <Camera className="h-4 w-4" />
                                    <span className="sr-only">Change photo</span>
                                </Button>
                            </div>
                            <h2 className="text-xl font-semibold">Student Name</h2>
                            <p className="text-sm text-muted-foreground">2022-0001</p>
                        </CardContent>
                    </Card>
                     <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Academic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Course:</span>
                                <span className="font-medium">BS in Information Technology</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Year Level:</span>
                                <span className="font-medium">2nd Year</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Block/Section:</span>
                                <span className="font-medium">BSIT 2-A</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="font-medium text-green-500">Enrolled</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                This information is managed by the registrar. For changes, please contact the admin office.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>First Name</Label>
                                    <Input value="Student" disabled className="rounded-xl" />
                                </div>
                                 <div className="space-y-1">
                                    <Label>Last Name</Label>
                                    <Input value="Name" disabled className="rounded-xl" />
                                </div>
                            </div>
                             <div className="space-y-1">
                                <Label>Date of Birth</Label>
                                <Input value="January 1, 2004" disabled className="rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6 rounded-xl">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Keep your contact details up to date.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor="contact-number">Contact Number</Label>
                                <Input id="contact-number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="rounded-xl" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveChanges} className="rounded-xl">Save Changes</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    );
}
