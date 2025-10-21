
'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  LogOut,
  User,
  CalendarCheck2,
  GraduationCap,
  FileSignature,
  ClipboardList,
  Settings,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { StudentProvider, useStudent } from '@/app/student/context/student-context';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const Breadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const searchParams = useSearchParams();
    const emailQuery = searchParams.toString();

    const formatSegment = (s: string) => {
        if (!s) return '';
        const decoded = decodeURIComponent(s);
        const str = decoded.replace(/-/g, ' ');
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (segments.length < 2) {
        return null;
    }

    const breadcrumbs = segments.map((segment, index) => {
        let path = `/${segments.slice(0, index + 1).join('/')}`;
        let name = formatSegment(segment);
        let href = `${path}?${emailQuery}`;

        if (segment === 'student' || segment === 'dashboard') {
             if (segment === 'student') return null;
             name = 'Dashboard';
             href = `/student/dashboard?${emailQuery}`;
        }

        return { name, href };
    }).filter(Boolean);

    return (
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {breadcrumbs.map((crumb, index) => {
                if (!crumb) return null;
                const isLast = index === breadcrumbs.length - 1;
                return (
                    <React.Fragment key={`${crumb.href}-${crumb.name}`}>
                        {index > 0 && <ChevronRight className="h-4 w-4" />}
                        {isLast ? (
                            <span className="text-foreground">{crumb.name}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-foreground">
                                {crumb.name}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};


function Header() {
    const { studentData } = useStudent();
    const searchParams = useSearchParams();

    if (!studentData) return null;

    return (
         <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
              <Breadcrumb />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image
                      src="https://picsum.photos/seed/student-avatar/32/32"
                      width={32}
                      height={32}
                      alt="Student Avatar"
                      className="rounded-full"
                      data-ai-hint="person avatar"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{studentData.personal.firstName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/student/dashboard/settings?${searchParams.toString()}`}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                    <Link href="/">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
    )
}

function StudentLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const schoolLogo = PlaceHolderImages.find(p => p.id === 'school-logo-sm');
  const { toast } = useToast();
  const emailQuery = searchParams.toString();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            {schoolLogo && (
                <Image
                src={schoolLogo.imageUrl}
                alt={schoolLogo.description}
                width={60}
                height={60}
                data-ai-hint={schoolLogo.imageHint}
                className="rounded-full"
                />
            )}
            <span className="font-semibold text-lg">Student Portal</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard'}>
                <Link href={`/student/dashboard?${emailQuery}`}>
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard/profile'}>
                <Link href={`/student/dashboard/profile?${emailQuery}`}>
                  <User />
                  Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/student/dashboard/enrollment')}>
                <Link href={`/student/dashboard/enrollment?${emailQuery}`}>
                  <FileSignature />
                  Enrollment
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard/schedule'}>
                <Link href={`/student/dashboard/schedule?${emailQuery}`}>
                  <CalendarCheck2 />
                  Schedule
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard/grades'}>
                <Link href={`/student/dashboard/grades?${emailQuery}`}>
                  <GraduationCap />
                  Grades
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard/records'}>
                <Link href={`/student/dashboard/records?${emailQuery}`}>
                  <ClipboardList />
                  Records
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/student/dashboard/settings'}>
                <Link href={`/student/dashboard/settings?${emailQuery}`}>
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <LogOut />
                  Logout
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <StudentProvider>
        <StudentLayoutContent>{children}</StudentLayoutContent>
      </StudentProvider>
    </Suspense>
  );
}
