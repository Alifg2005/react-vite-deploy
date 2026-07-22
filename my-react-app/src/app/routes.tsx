import { Routes, Route, Navigate } from "react-router-dom";

// sandbox page
import SandboxPage from "../features/sandbox/pages/SandBoxPage";

import HomePage from "../features/home/pages/HomePage";
import AboutPage from "../features/about/pages/AboutPage";
import Contact from "../features/contact/pages/Contact";
import CourseCatalogue from "../features/courses/pages/CourseCatalogue";
import ProgramDetails from "../features/courses/pages/ProgramDetails";
import Dashboard from "../features/dashboard/pages/Dashboard";
import PaymentPage from "../features/payment/pages/PaymentPage";
import Login from "../features/auth/pages/Login";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import Profile from "../features/profile/pages/Profile";
import AccountSettings from "../features/profile/pages/AccountSettings";

import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../features/student/pages/StudentDashboard";
import StudentActivities from "../features/student/pages/StudentActivities";
import StudentNotifications from "../features/student/pages/StudentNotifications";
import StudentSchedule from "../features/student/pages/StudentSchedule";
import StudentWishlist from "../features/student/pages/StudentWishlist";
import StudentSupport from "../features/student/pages/StudentSupport";
import TermsAndConditions from "../features/student/pages/TermsAndConditions";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import ApprovalRequestDetail from "../features/admin/pages/ApprovalRequestDetail";
import ProgramManagement from "../features/admin/pages/ProgramManagement";
import ProgramNew from "../features/admin/pages/ProgramNew";
import ProgramEdit from "../features/admin/pages/ProgramEdit";
import UserManagement from "../features/admin/pages/UserManagement";
import Reports from "../features/admin/pages/Reports";
import ComplaintsReplies from "../features/admin/pages/ComplaintsReplies";
import AdminNotifications from "../features/admin/pages/AdminNotifications";
import AdminSchedule from "../features/admin/pages/AdminSchedule";
import NewsEventsManagement from "../features/admin/pages/NewsEventsManagement";
import NewsEventEditor from "../features/admin/pages/NewsEventEditor";
import TeamManagement from "../features/admin/pages/TeamManagement";
import TeamMemberForm from "../features/admin/pages/TeamMemberForm";
import SetPassword from "../features/admin/pages/SetPassword";

import TrainerDashboard from "../features/trainer/pages/TrainerDashboard";
import TrainerNotifications from "../features/trainer/pages/TrainerNotifications";
import TrainerPrograms from "../features/trainer/pages/TrainerPrograms";
import TrainerSchedule from "../features/trainer/pages/TrainerSchedule";
import TrainerSupport from "../features/trainer/pages/TrainerSupport";

import CompanyDashboard from "../features/company/pages/CompanyDashboard";
import CompanyActivities from "../features/company/pages/CompanyActivities";
import CompanyRequests from "../features/company/pages/CompanyRequests";
import CompanySchedule from "../features/company/pages/CompanySchedule";
import CompanySupport from "../features/company/pages/CompanySupport";
import CompanyPrograms from "../features/company/pages/CompanyPrograms";
import CompanyNotifications from "../features/company/pages/CompanyNotifications";

export default function AppRoutes() {
  return (
    <Routes>

      
      <Route path="/sandbox" element={<SandboxPage />} />


      
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course-catalogue" element={<CourseCatalogue />} />
      <Route path="/program/:id" element={<ProgramDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/payment/:id" element={<PaymentPage />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/approval-requests/:kind/:id" element={<ApprovalRequestDetail />} />
      <Route path="/admin/programs" element={<ProgramManagement />} />
      <Route path="/admin/programs/new" element={<ProgramNew />} />
      <Route path="/admin/programs/:id/edit" element={<ProgramEdit />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/complaints" element={<ComplaintsReplies />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/schedule" element={<AdminSchedule />} />
      <Route path="/admin/news-events" element={<NewsEventsManagement />} />
      <Route path="/admin/news-events/new" element={<NewsEventEditor />} />
      <Route path="/admin/news-events/:id/edit" element={<NewsEventEditor />} />
      <Route path="/admin/team" element={<TeamManagement />} />
      <Route path="/admin/team/new" element={<TeamMemberForm />} />
      <Route path="/admin/team/:id/edit" element={<TeamMemberForm />} />

      <Route path="/trainer" element={<TrainerDashboard />} />
      <Route path="/trainer/notifications" element={<TrainerNotifications />} />
      <Route path="/trainer/programs" element={<TrainerPrograms />} />
      <Route path="/trainer/schedule" element={<TrainerSchedule />} />
      <Route path="/trainer/support" element={<TrainerSupport />} />

    {/* Student area — keeps the site Header/Footer via MainLayout, adds its own sidebar */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"     element={<StudentDashboard />} />
            <Route path="activities"    element={<StudentActivities />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="schedule"      element={<StudentSchedule />} />
            <Route path="wishlist"      element={<StudentWishlist />} />
            <Route path="support"       element={<StudentSupport />} />
            <Route path="terms"         element={<TermsAndConditions />} />
          </Route>

      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/company/activities" element={<CompanyActivities />} />
      <Route path="/company/requests" element={<CompanyRequests />} />
      <Route path="/company/schedule" element={<CompanySchedule />} />
      <Route path="/company/support" element={<CompanySupport />} />
      <Route path="/company/programs" element={<CompanyPrograms />} />
      <Route path="/company/notifications" element={<CompanyNotifications />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
