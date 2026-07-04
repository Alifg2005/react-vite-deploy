import { Routes, Route, Navigate } from "react-router";

// pages
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./page/Dashboard";
import AboutPage from "./page/AboutPage";
// import ProgramDetails from "./page/ProgramDetails"
import PaymentPage from "./page/PaymentPage"
import CourseCatalogue from "./page/CourseCatalogue"
import Login from "./page/Login"
import RegisterPage from "./page/RegisterPage"
import Forgotpassword from "./page/Forgotpassword"

import { RoleProvider } from "./context/RoleContext";

function App() {
  return (
    <RoleProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/courseCatalogue" element={<CourseCatalogue/>}/>
          <Route path="/Forgotpassword" element={<Forgotpassword/>}/>

          <Route path="/Login" element={<Login/>}/>
          <Route path="/RegisterPage" element={<RegisterPage/>}/>

          {/* Program Details — /program/:id opens a specific product */}
          {/* <Route path="/program" element={<ProgramDetails />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
          
          {/* If the user enters a wrong URL, send them back to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </RoleProvider>
  );
}

export default App;