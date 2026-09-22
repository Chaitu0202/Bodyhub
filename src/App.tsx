import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast.tsx';

// Layouts
import { PublicLayout } from './layouts/PublicLayout.tsx';
import { AdminLayout } from './layouts/AdminLayout.tsx';
import { MemberLayout } from './layouts/MemberLayout.tsx';

// Public Pages
import { HomePage } from './pages/public/HomePage.tsx';
import { ProgramsPage } from './pages/public/ProgramsPage.tsx';
import { MembershipPage } from './pages/public/MembershipPage.tsx';
import { TrainersPage } from './pages/public/TrainersPage.tsx';
import { EventsPage } from './pages/public/EventsPage.tsx';
import { AboutPage } from './pages/public/AboutPage.tsx';
import { ContactPage } from './pages/public/ContactPage.tsx';

// Auth Page
import { LoginPage } from './pages/auth/LoginPage.tsx';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminMembersPage } from './pages/admin/AdminMembersPage.tsx';
import { AddMemberPage } from './pages/admin/AddMemberPage.tsx';
import { MemberDetailsPage } from './pages/admin/MemberDetailsPage.tsx';
import { AdminMembershipsPage } from './pages/admin/AdminMembershipsPage.tsx';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage.tsx';
import { AdminEventsPage } from './pages/admin/AdminEventsPage.tsx';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage.tsx';
import { AdminReportsPage } from './pages/admin/AdminReportsPage.tsx';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.tsx';

// Member Pages
import { MemberDashboard } from './pages/member/MemberDashboard.tsx';
import { MemberWorkoutsPage } from './pages/member/MemberWorkoutsPage.tsx';
import { MemberAttendancePage } from './pages/member/MemberAttendancePage.tsx';
import { MemberPaymentsPage } from './pages/member/MemberPaymentsPage.tsx';
import { MemberFeedbackPage } from './pages/member/MemberFeedbackPage.tsx';
import { MemberProfilePage } from './pages/member/MemberProfilePage.tsx';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembersPage />} />
            <Route path="members/new" element={<AddMemberPage />} />
            <Route path="members/:id" element={<MemberDetailsPage />} />
            <Route path="memberships" element={<AdminMembershipsPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="feedback" element={<AdminFeedbackPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Member Routes */}
          <Route path="/member" element={<MemberLayout />}>
            <Route index element={<Navigate to="/member/dashboard" replace />} />
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="workouts" element={<MemberWorkoutsPage />} />
            <Route path="attendance" element={<MemberAttendancePage />} />
            <Route path="payments" element={<MemberPaymentsPage />} />
            <Route path="feedback" element={<MemberFeedbackPage />} />
            <Route path="profile" element={<MemberProfilePage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
