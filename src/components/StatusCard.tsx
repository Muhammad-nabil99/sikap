import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, LucideIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "success" | "info";
  showButton?: boolean;
}

export const StatusCard = ({ 
  title, 
  description, 
  icon: Icon, 
  variant = "success",
  showButton = false 
}: StatusCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-in border",
      "bg-card group cursor-pointer",
      variant === "success" && "hover:border-accent/30",
      variant === "info" && "hover:border-primary/30"
    )}>
      {/* Background Gradient Effect */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300",
        variant === "success" && "bg-accent",
        variant === "info" && "bg-primary"
      )}></div>

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className={cn(
            "p-4 rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110",
            variant === "success" && "bg-gradient-to-br from-emerald-500 to-teal-600",
            variant === "info" && "bg-gradient-to-br from-primary to-blue-600"
          )}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <Badge 
            variant="outline" 
            className={cn(
              "gap-1.5 px-3 py-1",
              variant === "success" && "border-accent/30 text-accent",
              variant === "info" && "border-primary/30 text-primary"
            )}
          >
            <Clock className="w-3 h-3" />
            <span className="text-xs font-semibold">Aktif</span>
          </Badge>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground leading-snug pr-4">
            {title}
          </h3>
          
          <div className="flex items-start gap-2.5">
            <CheckCircle className={cn(
              "w-5 h-5 mt-0.5 flex-shrink-0",
              variant === "success" && "text-accent",
              variant === "info" && "text-primary"
            )} />
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {showButton && (
          <Button 
            className={cn(
              "w-full gap-2 shadow-md hover:shadow-lg transition-all font-semibold",
              variant === "info" && "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            )}
          >
            Lihat detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </Card>
  );
};
