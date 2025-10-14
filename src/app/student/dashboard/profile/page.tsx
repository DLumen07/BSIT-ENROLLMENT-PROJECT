
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const studentData = {
    personal: {
        firstName: 'Student',
        lastName: 'Name',
        middleName: 'Dela Cruz',
        birthdate: 'January 1, 2004',
        sex: 'Male',
        civilStatus: 'Single',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        dialect: 'Tagalog',
    },
    contact: {
        email: 'student.name@example.com',
        phoneNumber: '09123456789',
    },
    address: {
        currentAddress: '123 Main St, Quezon City, Metro Manila',
        permanentAddress: '456 Provincial Rd, Cebu City, Cebu',
    },
    family: {
        fathersName: 'Father Name',
        fathersOccupation: 'Engineer',
        mothersName: 'Mother Name',
        mothersOccupation: 'Teacher',
        guardiansName: '',
        guardiansOccupation: '',
        guardiansAddress: '',
    },
    additional: {
        livingWithFamily: true,
        boarding: false,
        differentlyAbled: false,
        disability: '',
        minorityGroup: false,
        minority: '',
        emergencyContactName: 'Emergency Contact',
        emergencyContactAddress: '123 Main St, Quezon City',
        emergencyContactNumber: '09987654321',
    },
    education: {
        elementary: 'Central Elementary School',
        elemYear: '2016',
        secondary: 'National High School',
        secondaryYear: '2022',
        collegiate: 'N/A',
        collegiateYear: 'N/A',
    },
    academic: {
        studentId: '2022-0001',
        course: 'BS in Information Technology',
        yearLevel: '2nd Year',
        block: 'BSIT 2-A',
        status: 'Enrolled'
    }
};

const InfoField = ({ label, value }: { label: string; value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="space-y-1">
            <Label className="text-muted-foreground">{label}</Label>
            <p className="font-medium text-sm">{value}</p>
        </div>
    );
};

export default function ProfilePage() {
    const { toast } = useToast();
    const [email, setEmail] = useState(studentData.contact.email);
    const [contactNumber, setContactNumber] = useState(studentData.contact.phoneNumber);
    const [currentAddress, setCurrentAddress] = useState(studentData.address.currentAddress);

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
                            <h2 className="text-xl font-semibold">{`${studentData.personal.firstName} ${studentData.personal.lastName}`}</h2>
                            <p className="text-sm text-muted-foreground">{studentData.academic.studentId}</p>
                        </CardContent>
                    </Card>
                     <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Academic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <InfoField label="Course" value={studentData.academic.course} />
                            <InfoField label="Year Level" value={studentData.academic.yearLevel} />
                            <InfoField label="Block/Section" value={studentData.academic.block} />
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="font-medium text-green-500">{studentData.academic.status}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Tabs defaultValue="personal">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-xl">
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="address">Address & Family</TabsTrigger>
                            <TabsTrigger value="additional">Additional</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal">
                            <Card className="rounded-xl mt-4">
                                <CardHeader>
                                    <CardTitle>Personal & Contact</CardTitle>
                                    <CardDescription>Your personal and contact details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <InfoField label="First Name" value={studentData.personal.firstName} />
                                        <InfoField label="Last Name" value={studentData.personal.lastName} />
                                        <InfoField label="Middle Name" value={studentData.personal.middleName} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Date of Birth" value={studentData.personal.birthdate} />
                                        <InfoField label="Sex" value={studentData.personal.sex} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Civil Status" value={studentData.personal.civilStatus} />
                                        <InfoField label="Nationality" value={studentData.personal.nationality} />
                                    </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Religion" value={studentData.personal.religion} />
                                        <InfoField label="Dialect" value={studentData.personal.dialect} />
                                    </div>
                                    <div className="space-y-2 border-t pt-4">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-number">Contact Number</Label>
                                        <Input id="contact-number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="rounded-xl" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveChanges} className="rounded-xl">Save Contact Info</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="address">
                             <Card className="rounded-xl mt-4">
                                <CardHeader>
                                    <CardTitle>Address & Family</CardTitle>
                                    <CardDescription>Your addresses and family background.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="current-address">Current Address</Label>
                                        <Input id="current-address" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} className="rounded-xl" />
                                    </div>
                                    <InfoField label="Permanent Address" value={studentData.address.permanentAddress} />
                                     <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Father's Name" value={studentData.family.fathersName} />
                                        <InfoField label="Father's Occupation" value={studentData.family.fathersOccupation} />
                                     </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Mother's Name" value={studentData.family.mothersName} />
                                        <InfoField label="Mother's Occupation" value={studentData.family.mothersOccupation} />
                                     </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Guardian's Name" value={studentData.family.guardiansName} />
                                        <InfoField label="Guardian's Occupation" value={studentData.family.guardiansOccupation} />
                                     </div>
                                     <InfoField label="Guardian's Address" value={studentData.family.guardiansAddress} />
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveChanges} className="rounded-xl">Save Address</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                         <TabsContent value="additional">
                             <Card className="rounded-xl mt-4">
                                <CardHeader>
                                    <CardTitle>Additional Information</CardTitle>
                                    <CardDescription>Other personal and emergency contact details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Living with Family" value={studentData.additional.livingWithFamily ? 'Yes' : 'No'} />
                                        <InfoField label="Boarding" value={studentData.additional.boarding ? 'Yes' : 'No'} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Differently Abled" value={studentData.additional.differentlyAbled ? 'Yes' : 'No'} />
                                        <InfoField label="Disability" value={studentData.additional.disability} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Belongs to Minority Group" value={studentData.additional.minorityGroup ? 'Yes' : 'No'} />
                                        <InfoField label="Minority Group" value={studentData.additional.minority} />
                                    </div>
                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Emergency Contact</h4>
                                        <div className="space-y-4">
                                            <InfoField label="Name" value={studentData.additional.emergencyContactName} />
                                            <InfoField label="Address" value={studentData.additional.emergencyContactAddress} />
                                            <InfoField label="Number" value={studentData.additional.emergencyContactNumber} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="education">
                             <Card className="rounded-xl mt-4">
                                <CardHeader>
                                    <CardTitle>Educational Background</CardTitle>
                                    <CardDescription>Your academic history.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Elementary School" value={studentData.education.elementary} />
                                        <InfoField label="Year Graduated" value={studentData.education.elemYear} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Secondary School" value={studentData.education.secondary} />
                                        <InfoField label="Year Graduated" value={studentData.education.secondaryYear} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Collegiate School (Transferee)" value={studentData.education.collegiate} />
                                        <InfoField label="Year Graduated" value={studentData.education.collegiateYear} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}

    