# BSIT Enrollment System Overview

This document provides a high-level overview of the architecture and core logic powering the BSIT Enrollment System application.

## Core Architecture: React Context for State Management

The application is built using a centralized state management pattern powered by **React Context**. Instead of each component managing its own data independently, the application's state is held in a central location and distributed to the components that need it.

This is achieved through three primary "providers":

-   **`AdminProvider`** (`src/app/admin/context/admin-context.tsx`): Manages all data for the administrator portal. This includes lists of students, instructors, applications, blocks, subjects, and schedules. It also tracks the `currentUser` to enable role-based access.
-   **`StudentProvider`** (`src/app/student/context/student-context.tsx`): Manages all data for the student portal, including the student's personal information, academic records, and class schedule.
-   **`InstructorProvider`** (`src/app/instructor/context/instructor-context.tsx`): Manages all data for the instructor portal. It dynamically loads the schedule, classes, and personal information for the logged-in instructor.

### How It Works

1.  **The Provider**: A component (e.g., `AdminProvider`) wraps a major section of the app. It initializes and holds all the relevant data in a React state.
2.  **The Hook**: A custom hook (e.g., `useAdmin()`) is provided. Any component nested within the provider can call this hook to get direct access to the shared data and functions to update that data.
3.  **Updating State**: When a component needs to change data (like approving an application), it calls a setter function (e.g., `setAdminData`) exposed by the hook. This updates the central state, and React automatically re-renders any component that uses that piece of data, ensuring the entire UI stays in sync.

This pattern keeps our components clean and focused on presentation, while the logic for data management is centralized and predictable.

## Data Management & Mock Data

All the data for this application is currently mocked (simulated) and located directly within the `AdminProvider` context file at `src/app/admin/context/admin-context.tsx`. This includes data for students, instructors, administrators, subjects, and more.

This makes it easy to quickly see the data structure and modify it for testing purposes. In a production scenario, the `useEffect` hook within the provider files would be used to fetch this data from a backend API, as outlined in the "Connecting to a Backend" section below.

## Unified Staff Login & Role-Based Access

To streamline access for all staff members, the system uses a single login portal for both administrators and instructors, located at `/admin-login`.

### Login Logic

When a user logs in with their email and password:
1.  The system first checks if the email exists in the `adminUsers` list. If a match is found, the `currentUser` state in the `AdminProvider` is set, and the user is redirected to the Admin Dashboard.
2.  If no admin account is found, it then checks the `instructors` list. If a match is found, the user is redirected to the Instructor Dashboard with their email as a query parameter, which the `InstructorProvider` uses to load the correct data.
3.  If no account is found, a login error is displayed.

### Administrator Roles & Privileges

The admin portal features a role-based access control (RBAC) system to manage permissions. The `currentUser`'s role determines which parts of the dashboard are visible and accessible.

-   **Super Admin**:
    -   Unrestricted access to all modules.
    -   Can view and manage the **Administrators** page to create, edit, and delete other admin accounts.

-   **Admin**:
    -   Access to all modules **except** the "Administrators" page.
    -   Can manage students, instructors, enrollment, subjects, and schedules.

-   **Moderator**:
    -   Has restricted, view-oriented access.
    -   **Cannot** access the "Administrators" or "Instructors" pages.
    -   Can view student data and schedules but has limited editing capabilities.

## Instructor Portal

The system includes a dedicated portal for instructors, providing them with the tools they need to manage their classes and students.

### Key Features:

-   **Personalized Dashboard**: Upon logging in, instructors see a summary of their schedule for the current day and an overview of the classes they are handling.
-   **"My Schedule" Page**: A full, calendar-style view of their weekly teaching schedule, showing all assigned classes, times, and locations.
-   **"My Classes" Page**: This is the core of the instructor portal. For each class, an instructor can:
    -   View a complete roster of enrolled students.
    -   Input and update final grades for each student.
-   **Grade Management**: Grades submitted by instructors are saved directly into the main `grades` object within the `AdminContext`. This ensures that the academic records are always up-to-date and seamlessly integrated with the prerequisite validation system used during enrollment.

## Dynamic Validation Logic

To make the enrollment process more robust, the system includes dynamic validation to check for academic prerequisites and unit completion. This logic is primarily managed within `src/app/admin/context/admin-context.tsx`.

### Key Components:

1.  **`grades` Data**: A `grades` object has been added to the mock data. This object serves as the official academic record, mapping each student's ID to the subjects they've taken and the final grades they received.

2.  **`getCompletedSubjects(studentId)` Function**: This is the core of the validation system. When provided with a student's ID, this function:
    -   Retrieves the student's full grade history.
    -   Filters for subjects where the grade is **3.0 or better** (a passing grade).
    -   Returns a list of subjects the student has successfully completed, along with the units for each.

### How It's Used:

This validation logic is integrated into key parts of the admin dashboard:

-   **Subject Enlistment (Direct Enroll & Schedule Management)**: When an admin attempts to enlist a student in a subject, the system calls `getCompletedSubjects()` to check their academic record. If a subject has a prerequisite, the system verifies it has been met. If not, the subject is disabled in the UI, and a tooltip explains which prerequisite is missing. This prevents invalid enrollments.

-   **Handling New & Transferee Students**: For students without a prior academic record in the system (like transferees), a **"Credential Override"** feature is available during enrollment. This allows an administrator to manually check off any prerequisites the student has fulfilled, ensuring they can be enlisted in the correct subjects.

-   **Unit Calculation**: In the "Direct Enroll" workflow, the total number of units a student has earned is calculated and displayed. This gives the admin immediate insight into the student's academic progress and helps determine their eligibility for a specific year level.

This system ensures that all enrollment decisions are guided by the student's actual academic performance, reducing errors and ensuring a smooth progression.

---

## Connecting to a Backend

To connect this application to a real backend (e.g., a database or an external API), you only need to modify the provider files (`AdminProvider`, `StudentProvider`, and `InstructorProvider`).

### Step-by-Step Integration Guide

Here’s how you would connect the `AdminProvider` to your backend. The same principles apply to the other providers.

#### 1. Locate the Admin Context File

Open `src/app/admin/context/admin-context.tsx`.

You will see the `AdminProvider` component, which currently initializes its state with `mockAdminData`.

#### 2. Fetch Initial Data from Your API

Replace the mock data initialization with a `useEffect` hook to fetch data from your API when the component first loads. You should also add loading and error states.

**Example:**

```tsx
// src/app/admin/context/admin-context.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// ... (keep the existing type definitions)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminData, setAdminData] = useState<AdminDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://your-api.com/admin/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const data = await response.json();
        setAdminData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []); // The empty dependency array ensures this runs only once

  // You can add loading/error UI handling here if you want
  if (loading) {
    return <div>Loading admin dashboard...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AdminContext.Provider value={{ adminData: adminData!, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};
```

#### 3. Handle Data Mutations (Create, Update, Delete)

When performing actions that change data, you would first make an API call to your backend. After a successful response, you update the local state using `setAdminData` to reflect the change in the UI.

**Example (Deleting a User):**

```tsx
const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
        // 1. Make the API call to your backend
        const response = await fetch(`https://your-api.com/admin/users/${selectedUser.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete user.');
        }

        // 2. If successful, update the local state to reflect the change
        setAdminData(prev => ({
            ...prev,
            adminUsers: prev.adminUsers.filter(u => u.id !== selectedUser.id)
        }));

    } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Could not delete user. Please try again.");
    }
};
```

By following this pattern, you can systematically connect the application to a live backend while keeping the UI components clean and decoupled from the data-fetching logic.
