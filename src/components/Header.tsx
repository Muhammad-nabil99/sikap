import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:px-8 shadow-soft">
      <div className="text-lg font-semibold text-foreground">
        Dashboard
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-semibold text-foreground">Kamarudin Raiya, S.Pd., M.AP</p>
        </div>
        
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
            KR
          </AvatarFallback>
        </Avatar>

        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};
