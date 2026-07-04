import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

function MainLayout({ children }) {
  return (
    <div dir="rtl" className="min-h-screen bg-brand-light font-body text-brand-text">
      <Topbar />

      <main className="p-5">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;