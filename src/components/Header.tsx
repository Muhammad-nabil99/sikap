import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, TrendingUp } from "lucide-react";
import useGetNotification from "@/features/notifikasi/useGetNotification";
import { useState } from "react";
import useGetUser from "@/features/user/useGetUser";
import useLogoutUser from "@/features/user/useLogoutUser";
import { shortenName } from "@/utils/helper";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export const Header = () => {
  const { notifications, isLoading } = useGetNotification();
  const { logout, isPending } = useLogoutUser();
  const { user, isLoadingUser } = useGetUser();

  return (
    <header className="h-20 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Sistem Informasi Kenaikan Pangkat
          </p>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="h-10 w-px bg-border hidden md:block"></div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-foreground">
              {user?.data?.nama}
            </p>
            <p className="text-xs text-muted-foreground">Pegawai</p>
          </div>

          <Avatar className="h-9 w-9 sm:h-11 sm:w-11 border-2 border-primary/20 ring-2 ring-primary/10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-sm sm:text-base">
              {shortenName(user?.data?.nama)}
            </AvatarFallback>
          </Avatar>

          <Button
            onClick={() => logout()}
            disabled={isPending}
            variant="outline"
            size="sm"
            className="gap-2 border-border hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Keluar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
