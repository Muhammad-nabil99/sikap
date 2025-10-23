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
    <aside className="w-72 bg-sidebar-background border-r border-sidebar-border flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-blue-600 flex items-center justify-center shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <span className="text-white font-bold text-xl relative z-10">S</span>
          </div>
          <div>
            <span className="text-sidebar-foreground font-bold text-xl block">sikepang</span>
            <span className="text-xs text-muted-foreground">Sistem Kepegawaian</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group",
              "hover:bg-sidebar-accent",
              item.active 
                ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/25" 
                : "hover:translate-x-1"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              item.active ? "text-white" : "text-sidebar-foreground/60 group-hover:text-primary"
            )} />
            <span className={cn(
              "font-medium transition-colors text-sm",
              item.active ? "text-white" : "text-sidebar-foreground group-hover:text-foreground"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          © 2025 Sikepang
        </div>
      </div>
    </aside>
  );
};
