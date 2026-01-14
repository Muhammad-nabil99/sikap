import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Clock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";

interface StatusCardProps {
  title: string;
  description: string;
  date: string;
  linkedTo: string;
  icon: LucideIcon;
  variant?: "success" | "info" | "warn" | "danger";
  showButton?: boolean;
}

export const StatusCard = ({
  title,
  description,
  icon: Icon,
  variant = "success",
  linkedTo,
  date,
}: StatusCardProps) => {
  const hasUploaded = variant == "warn";

  const deadlineSubmitDocument = `${new Date(date)?.getDate()}/${new Date(
    date
  )?.getMonth()}/${new Date(date)?.getFullYear() + 1}`;


  return (
    <Card
      className={cn(
        "relative overflow-hidden p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-in border",
        "bg-card group cursor-pointer",
        variant === "success" && "hover:border-accent/30",
        variant === "info" && "hover:border-primary/30",
        variant === "warn" && "hover:border-yellow-400/30",
        variant === "danger" && "hover:border-red-400/30"
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300",
          variant === "success" && "bg-accent",
          variant === "info" && "bg-primary",
          variant === "warn" && "bg-yellow-400",
          variant === "danger" && "bg-red-400"
        )}
      ></div>

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "p-4 rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110",
              variant === "success" &&
                "bg-gradient-to-br from-emerald-500 to-teal-600",
              variant === "info" &&
                "bg-gradient-to-br from-primary to-blue-600",
              variant === "warn" &&
                "bg-gradient-to-br from-yellow-400 to-amber-500",
              variant === "danger" &&
                "bg-gradient-to-r from-pink-500 to-red-600"
            )}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {date && (
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-3 py-1",
                variant === "success" && "border-accent/30 text-accent",
                variant === "info" && "border-primary/30 text-primary",
                variant === "warn" && "border-yellow-400/30 text-yellow-500",
                variant === "danger" && "border-red-400/30 text-red-500"
              )}
            >
              <Clock className="w-3 h-3" />
              <span className="text-xs font-semibold capitalize">
                {hasUploaded
                  ? `batas mengupload berkas : ${new Date(
                      deadlineSubmitDocument
                    ).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}`
                  : new Date(date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
              </span>
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="capitalize text-lg font-bold text-foreground leading-snug pr-4">
            {title}
          </h3>

          <div className="flex items-start gap-2.5">
            <CheckCircle
              className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                variant === "success" && "text-accent",
                variant === "info" && "text-primary",
                variant === "warn" && "text-yellow-500",
                variant === "danger" && "text-red-500"
              )}
            />
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {linkedTo && (
          <NavLink to={linkedTo}>
            <Button
              className={cn(
                "w-full my-2 gap-4 shadow-md hover:shadow-lg transition-all font-semibold",
                variant === "info" &&
                  "bg-gradient-to-r  from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
                variant === "warn" &&
                  "bg-gradient-to-r  from-yellow-400 to-amber-500 hover:from-yellow-400/90 hover:to-amber-500/90"
              )}
            >
              Lihat detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </NavLink>
        )}
      </div>
    </Card>
  );
};
