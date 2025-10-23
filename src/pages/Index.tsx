import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeCard } from "@/components/WelcomeCard";
import { StatusCard } from "@/components/StatusCard";
import { FileCheck, Eye } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <WelcomeCard />
        
        <div className="grid md:grid-cols-2 gap-6">
          <StatusCard
            title="Pangajuan Kenaikan Pangkat Akan Dimulai"
            description="kamu sudah mengupload berkas"
            icon={FileCheck}
            variant="success"
          />
          
          <StatusCard
            title="Pengajuan Sebelumnya"
            description="terverifikasi"
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
