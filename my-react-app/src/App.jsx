import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// pages
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import Contact from "./page/Contact";
import CourseCatalogue from "./page/CourseCatalogue";
import ProgramDetails from "./page/ProgramDetails";
import Dashboard from "./page/Dashboard";
import PaymentPage from "./page/PaymentPage";
import Login from "./page/Login";
import RegisterPage from "./page/RegisterPage";
import Forgotpassword from "./page/Forgotpassword";
import Profile from "./page/Profile";
import AccountSettings from "./page/AccountSettings";

import { RoleProvider } from "./context/RoleContext";

function App() {
  return (
    <RoleProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/course-catalogue" element={<CourseCatalogue />} />

          {/* Program Details — /program/:id opens a specific course/camp/competition */}
        
          <Route path="/program/:id" element={<ProgramDetails />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/payment/:id" element={<PaymentPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />

          {/* Unknown URL → send back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </RoleProvider>
  );
}

export default App;