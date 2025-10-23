import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeCard } from "@/components/WelcomeCard";
import { StatusCard } from "@/components/StatusCard";
import { Card } from "@/components/ui/card";
import { FileCheck, Eye, TrendingUp, Clock } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <WelcomeCard />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Pengajuan</p>
              <p className="text-3xl font-bold text-foreground">12</p>
              <div className="flex items-center gap-1 text-accent text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>+3 bulan ini</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disetujui</p>
              <p className="text-3xl font-bold text-foreground">8</p>
              <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>66.7%</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dalam Proses</p>
              <p className="text-3xl font-bold text-foreground">2</p>
              <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold">
                <Clock className="w-3 h-3" />
                <span>Sedang berjalan</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ditolak</p>
              <p className="text-3xl font-bold text-foreground">2</p>
              <div className="flex items-center gap-1 text-destructive text-xs font-semibold">
                <span>16.7%</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Main Status Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatusCard
            title="Pangajuan Kenaikan Pangkat Akan Dimulai"
            description="kamu sudah mengupload berkas yang diperlukan dan siap untuk diproses"
            icon={FileCheck}
            variant="success"
          />
          
          <StatusCard
            title="Pengajuan Sebelumnya"
            description="telah terverifikasi dan disetujui oleh sistem"
            icon={Eye}
            variant="info"
            showButton
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
