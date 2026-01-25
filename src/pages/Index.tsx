import React, { useMemo } from "react";
import { WelcomeCard } from "@/components/WelcomeCard";
import { StatusCard } from "@/components/StatusCard";
import {
  FileText,
  Clock,
  Eye,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import SkeletonDashboardLoading from "@/components/SkeletonDashboardLoading";
import useGetBerkas from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import useGetSK from "@/features/SK/useGetSK";
import { useDataContext } from "@/context/useDataContext";
import useGetUser from "@/features/user/useGetUser";
import { cn } from "@/lib/utils";

const DashboardIndex = () => {
  const { berkas, isLoadingBerkas } = useGetBerkas();
  const { user, isLoadingUser } = useGetUser();
  const { SK, isLoadingSK } = useGetSK();
  const { infoSubmission } = useDataContext();

  const isSubmissionOpen = infoSubmission();
  const currentYear = new Date().getFullYear();

  // --- Logic Helpers ---
  const missingUserFields = useMemo(
    () =>
      user?.data ? Object.keys(user.data).filter((key) => !user.data[key]) : [],
    [user],
  );

  const missingSKFields = useMemo(() => {
    const required = [
      "tmt_golongan",
      "golongan_ruang",
      "nomor_sk",
      "pangkat",
      "gaji_pokok",
    ];
    return required.filter((field) => !SK?.data?.[0]?.[field]);
  }, [SK]);

  const submissionStatus = useMemo(() => {
    const newsBerkas = berkas?.data?.filter(
      (item) => new Date(item.created_at).getFullYear() === currentYear,
    );

    if (isSubmissionOpen)
      return {
        title: "Periode Ditutup",
        desc: "Batas waktu pengumpulan dokumen telah berakhir.",
        icon: AlertCircle,
        variant: "danger",
        link: null,
      };

    if (newsBerkas?.length > 0)
      return {
        title: "Berkas Terkirim",
        desc: "Dokumen Anda sedang dalam antrean verifikasi pusat.",
        icon: CheckCircle2,
        variant: "success",
        link: "/berkas/kenaikan-pangkat",
      };

    return {
      title: "Lengkapi Berkas",
      desc: "Periode baru telah dibuka. Segera unggah dokumen Anda.",
      icon: FileWarning,
      variant: "warn",
      link: "/berkas/kenaikan-pangkat",
    };
  }, [berkas, isSubmissionOpen, currentYear]);

  if (isLoadingBerkas || isLoadingSK || isLoadingUser)
    return <SkeletonDashboardLoading />;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* 1. WELCOME SECTION */}
      <header className="relative overflow-hidden rounded-[2rem]">
        <WelcomeCard />
      </header>

      {/* 2. BENTO STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget
          label="Total Berkas"
          value={berkas?.data?.length || 0}
          icon={FileText}
          theme="blue"
        />
        <StatWidget
          label="Update Terbaru"
          value={currentYear}
          icon={Clock}
          theme="purple"
        />
        <StatWidget
          label="Pangkat Saat Ini"
          value={SK?.data?.[0]?.pangkat || "-"}
          icon={UserCheck}
          theme="emerald"
        />
        <StatWidget
          label="Sesi Pengajuan"
          value={isSubmissionOpen ? "Tutup" : "Aktif"}
          icon={Eye}
          theme={isSubmissionOpen ? "rose" : "amber"}
        />
      </section>

      {/* 3. ALERT CENTER (Conditional) */}
      {(missingUserFields.length > 0 || missingSKFields.length > 0) && (
        <section className="space-y-6">
          <SectionHeader
            title="Pusat Tindakan"
            subtitle="Lengkapi data berikut untuk menghindari kendala verifikasi"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WarningCard
              title="Kelengkapan Profil"
              fields={missingUserFields}
            />
            <WarningCard title="Kelengkapan Data SK" fields={missingSKFields} />
          </div>
        </section>
      )}

      {/* 4. SERVICE STATUS */}
      <section className="space-y-6">
        <SectionHeader
          title="Status Layanan"
          subtitle="Pantau progres pengajuan kenaikan pangkat Anda"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StatusCard
            title={submissionStatus.title}
            description={submissionStatus.desc}
            icon={submissionStatus.icon}
            variant={submissionStatus.variant}
            linkedTo={submissionStatus.link}
          />
          <StatusCard
            title="Riwayat Berkas"
            description="Akses dokumen pengajuan dari tahun-tahun sebelumnya."
            icon={Eye}
            variant="info"
            linkedTo="/arsip"
          />
        </div>
      </section>
    </div>
  );
};

// --- REDESIGNED SUB-COMPONENTS ---

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="space-y-1 ml-1">
    <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
    )}
  </div>
);

const WarningCard = ({
  title,
  fields,
}: {
  title: string;
  fields: string[];
}) => {
  if (fields.length === 0) return null;
  return (
    <div className="group bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-amber-600">
          <div className="p-2 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-700">{title}</span>
        </div>
        <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">
          {fields.length} Item
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {fields.map((field) => (
          <span
            key={field}
            className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-[10px] font-bold uppercase transition-colors hover:bg-amber-50 hover:text-amber-600 cursor-default"
          >
            {field.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </div>
  );
};

const StatWidget = ({ label, value, icon: Icon, theme }: any) => {
  const themes: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div
        className={cn(
          "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] transition-transform group-hover:scale-150",
          themes[theme].split(" ")[0],
        )}
      />
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border transition-transform group-hover:rotate-12",
          themes[theme],
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="capitalize text-2xl font-black text-slate-900 truncate tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DashboardIndex;
