import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout({ children }) {
  return (
    <div dir="rtl" className="min-h-screen bg-brand-light font-body text-brand-text">
      <Header />

      <main className="p-5">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;