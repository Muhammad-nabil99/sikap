import { Home, FileText, User, CheckCircle, UserCircle, History } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "Data KP", active: false },
  { icon: User, label: "Data Diri", active: false },
  { icon: CheckCircle, label: "Cek Status", active: false },
  { icon: UserCircle, label: "Profile", active: false },
  { icon: History, label: "Riwayat", active: false },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-sidebar-foreground font-bold text-xl">sikepang</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              "hover:bg-sidebar-accent hover:shadow-soft",
              item.active && "bg-sidebar-accent shadow-soft border border-sidebar-primary/20"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              item.active ? "text-sidebar-primary" : "text-sidebar-foreground/70"
            )} />
            <span className={cn(
              "font-medium transition-colors",
              item.active ? "text-sidebar-primary" : "text-sidebar-foreground"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
