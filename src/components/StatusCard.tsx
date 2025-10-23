import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
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
      "p-6 transition-all duration-300 hover:shadow-strong hover:-translate-y-1 animate-slide-in",
      "bg-gradient-to-br border-2",
      variant === "success" && "from-emerald-50 to-teal-50 border-emerald-200/50",
      variant === "info" && "from-blue-50 to-indigo-50 border-blue-200/50"
    )}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-xl shadow-soft",
            variant === "success" && "bg-gradient-to-br from-emerald-500 to-teal-500",
            variant === "info" && "bg-gradient-to-br from-blue-500 to-indigo-500"
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <div className="flex items-center gap-2">
              <CheckCircle className={cn(
                "w-5 h-5",
                variant === "success" && "text-emerald-600",
                variant === "info" && "text-blue-600"
              )} />
              <p className="text-sm text-muted-foreground font-medium">{description}</p>
            </div>
          </div>
        </div>

        {showButton && (
          <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-medium transition-all">
            Lihat detail
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};
