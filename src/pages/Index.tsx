import React, { useMemo } from "react";
import { WelcomeCard } from "@/components/WelcomeCard";
import { StatusCard } from "@/components/StatusCard";
import {
  FileCheck,
  FileWarning,
  Eye,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SkeletonDashboardLoading from "@/components/SkeletonDashboardLoading";
import useGetBerkas from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import useGetSK from "@/features/SK/useGetSK";
import { useDataContext } from "@/context/useDataContext";

const DashboardIndex = () => {
  const { berkas, isLoadingBerkas } = useGetBerkas();
  const { SK, isLoadingSK } = useGetSK();
  const { infoSubmission } = useDataContext();

  const isSubmissionOpen = infoSubmission();
  const currentYear = new Date().getFullYear();

  // Menghitung status pengajuan secara memoized
  const submissionStatus = useMemo(() => {
    const newsBerkas = berkas?.data?.filter(
      (item) => new Date(item.created_at).getFullYear() === currentYear,
    );

    if (isSubmissionOpen) {
      return {
        title: "Batas Waktu Berakhir",
        desc: "Pengumpulan dokumen Kenaikan Pangkat sudah ditutup untuk periode ini.",
        icon: AlertCircle,
        variant: "danger",
        link: null,
        date: SK?.data?.[0]?.tmt_golongan,
      };
    }

    if (newsBerkas?.length > 0) {
      return {
        title: "Pengajuan Selesai",
        desc: "Berkas Anda telah berhasil diunggah dan siap untuk tahap verifikasi.",
        icon: CheckCircle2,
        variant: "success",
        link: "/berkas",
        date: berkas?.data?.[0]?.created_at,
      };
    }

    return {
      title: "Pengajuan Dimulai",
      desc: "Periode kenaikan pangkat telah dibuka. Segera lengkapi berkas Anda.",
      icon: FileWarning,
      variant: "warn",
      link: "/berkas",
      date: SK?.data?.[0]?.tmt_golongan,
    };
  }, [berkas, SK, isSubmissionOpen, currentYear]);

  if (isLoadingBerkas || isLoadingSK) return <SkeletonDashboardLoading />;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-700">
      {/* SECTION 1: WELCOME */}
      <WelcomeCard />

      {/* SECTION 2: QUICK STATS (Optional but Recommended) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatWidget
          label="Total Berkas"
          value={berkas?.data?.length || 0}
          icon={FileText}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatWidget
          label="Tahun Ini"
          value={
            berkas?.data?.filter(
              (b) => new Date(b.created_at).getFullYear() === currentYear,
            ).length || 0
          }
          icon={Clock}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatWidget
          label="Status SK"
          value={SK?.data?.[0] ? "Aktif" : "N/A"}
          icon={FileCheck}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatWidget
          label="Sesi"
          value={isSubmissionOpen ? "Tutup" : "Buka"}
          icon={Eye}
          color="text-amber-600"
          bg="bg-amber-50"
        />
      </div>

      {/* SECTION 3: STATUS CARDS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="h-4 w-1 bg-blue-600 rounded-full" />
          <h2 className="font-bold text-slate-800 tracking-tight">
            Status Pengangkatan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusCard
            title={submissionStatus.title}
            description={submissionStatus.desc}
            icon={submissionStatus.icon}
            variant={submissionStatus.variant}
            linkedTo={submissionStatus.link}
            date={submissionStatus.date}
          />

          <StatusCard
            title="Pengajuan Sebelumnya"
            description="Lihat arsip dan histori verifikasi pengajuan Anda di masa lalu."
            icon={Eye}
            variant="info"
            linkedTo="/riwayat"
            date=""
          />
        </div>
      </div>
    </div>
  );
};

// Sub-component statis untuk tampilan dashboard yang lebih profesional
const StatWidget = ({ label, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
    <div className={`p-3 rounded-xl ${bg} ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="text-xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default DashboardIndex;
