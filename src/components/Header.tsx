import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Search, Settings } from "lucide-react";
import useGetNotification from "@/features/notifikasi/useGetNotification";
import useGetUser from "@/features/user/useGetUser";
import useLogoutUser from "@/features/user/useLogoutUser";
import { shortenName } from "@/utils/helper";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { notifications } = useGetNotification();
  const { logout, isPending } = useLogoutUser();
  const { user } = useGetUser();

  // Count unread notifications
  const unreadCount = notifications?.data?.filter((n) => !n.isRead).length || 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-4 sm:px-8">
        {/* LEFT SECTION: Branding & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-600" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-xl font-black text-slate-800 tracking-tight"
              >
                Dashboard
              </Link>
              <Badge
                variant="outline"
                className="hidden lg:flex bg-blue-50 text-blue-600 border-blue-100 font-bold text-[10px] uppercase tracking-wider"
              >
                Pegawai
              </Badge>
            </div>
            <p className="hidden sm:block text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">
              SIKAP • Sistem Kenaikan Pangkat
            </p>
          </div>
        </div>

        {/* CENTER SECTION: Search Placeholder (Optional UX Polish) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Cari fitur atau berkas..."
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-600"
            />
          </div>
        </div>

        {/* RIGHT SECTION: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Notifications Toggle */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-500 hover:bg-slate-50 hover:text-blue-600 relative"
            >
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
              )}
            </Button>
          </div>

          <div className="h-8 w-[1px] bg-slate-100 hidden sm:block" />

          {/* Profile Group */}
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden md:block">
              <p className="capitalize text-sm font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">
                {user?.data?.nama}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                NIP. {user?.data?.nip}
              </p>
            </div>

            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white ring-2 ring-slate-100 shadow-sm transition-transform group-hover:scale-105">
              <AvatarFallback className="uppercase bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm">
                {shortenName(user?.data?.nama)}
              </AvatarFallback>
            </Avatar>

            {/* Logout Action */}
            <Button
              onClick={() => logout()}
              disabled={isPending}
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
