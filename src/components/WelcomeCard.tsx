import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Award } from "lucide-react";

export const WelcomeCard = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-primary shadow-xl border-0 animate-scale-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <Avatar className="h-28 w-28 border-4 border-white/30 shadow-2xl relative ring-4 ring-white/20">
              <AvatarFallback className="bg-gradient-to-br from-white to-blue-100 text-primary text-3xl font-bold">
                KR
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent hover:bg-accent text-white border-0 shadow-lg">
              <Award className="w-3 h-3 mr-1" />
              Aktif
            </Badge>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Selamat Datang Kembali!
              </h2>
              <p className="text-xl font-semibold text-white/90">
                Kamarudin Raiya, S.Pd., M.AP
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">NIP: 197208152000031005</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Kepegawaian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
