import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Building2, CreditCard } from "lucide-react";
import useGetUser from "@/features/user/useGetUser";
import { shortenName } from "@/utils/helper";

export const WelcomeCard = () => {
  const { user, isLoadingUser } = useGetUser();

  if (isLoadingUser) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-primary shadow-2xl border-0">
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="h-28 w-28 rounded-full bg-white/20 animate-pulse"></div>
            <div className="flex-1 space-y-4 w-full">
              <div className="h-8 bg-white/20 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-6 bg-white/20 rounded-lg animate-pulse w-1/2"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-white/20 rounded-lg animate-pulse w-32"></div>
                <div className="h-10 bg-white/20 rounded-lg animate-pulse w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 shadow-2xl border-0 transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-3xl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-2xl opacity-20"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full"></div>

      <div className="relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Enhanced Avatar Section */}
          <div className="relative group">
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-200 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300 animate-pulse"></div>

            {/* Avatar Container */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white/40 shadow-2xl relative ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
                <AvatarFallback className="uppercase bg-gradient-to-br from-white via-blue-50 to-blue-100 text-blue-700 text-4xl font-black tracking-tight">
                  {shortenName(user?.data?.nama)}
                </AvatarFallback>
              </Avatar>

              {/* Status Badge */}
              <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-white shadow-lg px-3 py-1 transition-all duration-700 hover:scale-110">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                <span className="font-bold text-xs">AKTIF</span>
              </Badge>
            </div>
          </div>

          {/* Enhanced Info Section */}
          <div className="flex-1 text-center md:text-left space-y-5">
            {/* Greeting */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="h-1 w-12 bg-white/40 rounded-full"></div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest">
                  Selamat Datang
                </h3>
              </div>
              <h2 className="capitalize text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tight leading-tight">
                {user?.data?.nama?.split(" ")[0]}
                <span className="text-white/60">!</span>
              </h2>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
              {/* NIP Card */}
              <div className="group flex items-center gap-3 text-white bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-xl">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                    NIP
                  </p>
                  <p className="text-sm font-bold">{user?.data?.nip || "—"}</p>
                </div>
              </div>

              {/* Unit Kerja Card */}
              {user?.data?.unit_kerja && (
                <div className="group flex items-center gap-3 text-white bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-xl">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                      Unit Kerja
                    </p>
                    <p className="text-sm font-bold capitalize">
                      {user?.data?.unit_kerja
                        ?.split("_")
                        ?.map((item, index) =>
                          index === 0 ? item.toLowerCase() : item.toUpperCase(),
                        )
                        ?.join(" ")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info Footer */}
            <div className="pt-2 flex items-center gap-2 text-white/60 text-xs justify-center md:justify-start">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </Card>
  );
};
