import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const WelcomeCard = () => {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/10 shadow-medium animate-scale-in">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Selamat Datang</h2>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse"></div>
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-strong relative">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
              KR
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-1">
          <p className="text-xl font-bold text-foreground">Kamarudin Raiya, S.Pd., M.AP</p>
          <p className="text-sm text-muted-foreground font-medium">NIP : 197208152000031005</p>
        </div>
      </div>
    </Card>
  );
};
