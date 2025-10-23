import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-20 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Selamat datang kembali</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-secondary"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white text-xs">
            3
          </Badge>
        </Button>

        <div className="h-10 w-px bg-border hidden md:block"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-foreground">Kamarudin Raiya, S.Pd., M.AP</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          
          <Avatar className="h-11 w-11 border-2 border-primary/20 ring-2 ring-primary/10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-base">
              KR
            </AvatarFallback>
          </Avatar>

          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 border-border hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
