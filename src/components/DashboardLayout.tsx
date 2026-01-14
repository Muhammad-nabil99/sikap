import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const DashboardLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const element = document.querySelector("main");
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar />

        <SidebarInset className="flex flex-1 flex-col">
          <Header />

          <main className="flex-1 overflow-y-scroll no-scrollbar p-4 sm:p-6 md:p-8 animate-fade-in">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
