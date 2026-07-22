import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../shared/components/Footer";
import Header from "../shared/components/Header";
import { useRole } from "../shared/context/RoleContext";

// These routes render their own minimal auth header — skip site chrome entirely.
const NO_CHROME_ROUTES = ["/login", "/register", "/forgot-password"];

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();
  const { direction } = useRole();
  const hideChrome = NO_CHROME_ROUTES.includes(pathname);

  if (hideChrome) {
    return (
      <div dir={direction} className="min-h-screen bg-brand-light font-body text-brand-text">
        {children}
      </div>
    );
  }

  return (
    /*
     * CHANGE 1 — removed any implicit top spacing from this wrapper.
     * The outer div must start at the very top of the viewport with no
     * margin or padding so the sticky Header can touch the top edge.
     */
    <div dir={direction} className="flex min-h-screen flex-col bg-brand-light font-body text-brand-text">
      <Header />

      {/*
       * CHANGE 2 — kept side/bottom padding (p-5 pb-16) but removed any
       * top padding (pt-*). Because Header uses `sticky` (not `fixed`),
       * it stays in document flow and naturally pushes <main> down —
       * no manual top offset is needed here.
       */}
      <main className="flex-1 px-5 pb-16 pt-5">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;
