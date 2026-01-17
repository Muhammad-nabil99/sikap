import { WelcomeCard } from "@/components/WelcomeCard";
import { StatusCard } from "@/components/StatusCard";
import { FileCheck, FileWarning, Eye, TrendingUp, Clock } from "lucide-react";
import SkeletonDashboardLoading from "@/components/SkeletonDashboardLoading";
import useGetBerkas from "@/features/berkas/useGetDataBerkas";
import useGetSK from "@/features/SK/useGetSK";
import { useDataContext } from "@/context/useDataContext";

const Index = () => {
  const { berkas, isLoadingBerkas } = useGetBerkas();
  const { infoSubmission } = useDataContext();
  const { SK, isLoadingSK } = useGetSK();

  const isSubmissionOpen = infoSubmission();
  if (isLoadingBerkas || isLoadingSK) return <SkeletonDashboardLoading />;

  const getNewsBerkas = berkas?.data?.filter(
    (item) =>
      new Date(item.created_at).getFullYear() == new Date().getFullYear()
  );

  function renderCard() {
    if (isSubmissionOpen) {
      return (
        <StatusCard
          title="Batas Waktu Pengumpulan Berkas Telah Berakhir"
          description="Pengumpulan dokumen Kenaikan Pangkat sudah ditutup. Proses selanjutnya akan segera dimulai."
          icon={FileWarning}
          variant="danger"
          linkedTo={null} 
          date={SK?.data?.[0]?.tmt_golongan}
        />
      );
    } 
    if (getNewsBerkas?.length) {
      return (
        <StatusCard
          title="Pangajuan Kenaikan selesai"
          description="kamu sudah mengupload berkas yang diperlukan dan siap untuk diproses"
          icon={FileCheck}
          variant="success"
          date={berkas?.data?.[0]?.created_at}
          linkedTo={"/berkas"}
        />
      );
    } else {
      return (
        <StatusCard
          title="Pangajuan Kenaikan Pangkat telah Dimulai"
          description="silahkan mengupload berkas yang diperlukan dan siap untuk diproses"
          icon={FileWarning}
          variant="warn"
          linkedTo="/berkas"
          date={SK?.data?.[0]?.tmt_golongan}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-0">
      <WelcomeCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {renderCard()}
        <StatusCard
          title="Pengajuan Sebelumnya"
          description="telah terverifikasi dan disetujui oleh sistem"
          icon={Eye}
          variant="info"
          linkedTo="/riwayat"
          date={""}
        />
      </div>
    </div>
  );
};

export default Index;
