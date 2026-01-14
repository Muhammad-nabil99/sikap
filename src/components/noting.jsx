import {
  Home,
  FileText,
  User,
  CheckCircle,
  UserCircle,
  History,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: 1, link: "/dashboard", icon: Home, label: "Dashboard" },
  { id: 2, link: "/sk", icon: User, label: "SK" },
  { id: 3, link: "/berkas", icon: FileText, label: "Berkas" },
  { id: 4, link: "/status", icon: CheckCircle, label: "Cek Status" },
  { id: 5, link: "/riwayat", icon: History, label: "Riwayat" },
  // { id: 6, link: "/profile", icon: UserCircle, label: "Profile" },
];

export const Sidebar = () => {
  const { setOpenMobile, isMobile, open } = useSidebar();

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarUI className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 mb-6 sm:mb-8 flex-1 min-w-0"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-blue-600 flex items-center justify-center shadow-md relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-white/10"></div>
              <span className="text-white font-bold text-lg sm:text-xl relative z-10">
                S
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sidebar-foreground font-bold text-lg sm:text-xl block truncate">
                sikepang
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                Sistem Kepegawaian
              </span>
            </div>
          </Link>

          {/* Close Button - Only visible on mobile when sidebar is open */}
          {isMobile && open && (
            <button
              onClick={() => setOpenMobile(false)}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors flex-shrink-0 mb-6 sm:mb-8"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.link}
                      end={item.link === "/dashboard"}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        cn(
                          "w-full flex items-center gap-3 sm:gap-3.5 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl transition-all duration-200 group",
                          "hover:bg-sidebar-accent",
                          isActive
                            ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/25"
                            : "hover:translate-x-1"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              "w-5 h-5 flex-shrink-0 transition-colors",
                              isActive
                                ? "text-white"
                                : "text-sidebar-foreground/60 group-hover:text-primary"
                            )}
                          />
                          <span
                            className={cn(
                              "font-medium transition-colors text-sm truncate",
                              isActive
                                ? "text-white"
                                : "text-sidebar-foreground group-hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          © 2025 Sikepang
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
};