import {
  Home,
  FileText,
  User,
  UserCircle,
  History,
  X,
  ChevronDown,
  HandCoins,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import favicon from "@/assets/favicon.ico";

const menuItems = [
  { id: 1, link: "/dashboard", icon: Home, label: "Dashboard" },
  {
    id: 2,
    link: "/sk",
    icon: User,
    label: "SK",
    
  },
  { id: 6, link: "/profile", icon: UserCircle, label: "Profile" },
  { id: 3, link: "/berkas", icon: FileText, label: "Berkas", children: [
      { id: 11, link: "/berkas/pensiun", icon: HandCoins, label: "Pensiun" },
      { id: 22, link: "/berkas/berkala", icon: TrendingUp, label: "Berkala" },
      {
        id: 33,
        link: "/berkas/kenaikan-pangkat",
        icon: TrendingUp,
        label: "Kenaikan Pangkat",
      },
    ],},
  { id: 5, link: "/arsip", icon: History, label: "Arsip" },
];

export const Sidebar = () => {
  const { setOpenMobile, isMobile, open } = useSidebar();
  const location = useLocation();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const [openSK, setOpenSK] = useState(location.pathname.startsWith("/sk"));

  return (
    <SidebarUI className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 mb-6 sm:mb-8 flex-1 min-w-0"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-white/10"></div>
              <span className="text-white font-bold text-lg sm:text-xl relative z-10">
                <img src={favicon} alt="logo" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sidebar-foreground font-bold text-lg sm:text-xl block truncate">
                SIKAP
              </span>
              <span className="capitalize text-xs text-muted-foreground block truncate">
                selamat datang
              </span>
            </div>
          </Link>

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
              {menuItems.map((item) => {
                const isActive = location.pathname === item.link;
                const hasChildren = item.children?.length > 0;

                return (
                  <SidebarMenuItem key={item.id}>
                    {/* Parent Item - NavLink for navigation, button for dropdown toggle */}
                    {hasChildren ? (
                      <button
                        onClick={() => setOpenSK(!openSK)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all",
                          "hover:bg-sidebar-accent",
                          location.pathname.startsWith(item.link) &&
                            "bg-gradient-to-r from-primary to-blue-600 text-white"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            openSK && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.link}
                        onClick={handleLinkClick}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all",
                          "hover:bg-sidebar-accent",
                          isActive &&
                            "bg-gradient-to-r from-primary to-blue-600 text-white"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.label}
                        </span>
                      </NavLink>
                    )}

                    {/* Dropdown for children */}
                    {hasChildren && openSK && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.id}
                            to={child.link}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all",
                              "hover:bg-sidebar-accent",
                              location.pathname === child.link &&
                                "bg-primary/10 text-primary"
                            )}
                          >
                            <child.icon className="w-4 h-4" />
                            <span>{child.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          © 2025 SIKAP
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
}