import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Login/Register/Forgot-password bring their own minimal logo+back header
// (see AuthLayout) and skip the site Header/Footer entirely.
const NO_CHROME_ROUTES = ["/login", "/register", "/forgot-password"];

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const hideChrome = NO_CHROME_ROUTES.includes(pathname);

  if (hideChrome) {
    return (
      <div dir="rtl" className="min-h-screen bg-brand-light font-body text-brand-text">
        {children}
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-brand-light font-body text-brand-text">
      <Header />

      <main className="p-5 pb-16">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;