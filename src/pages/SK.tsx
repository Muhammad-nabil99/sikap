import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  FileText,
  Calendar,
  ShieldCheck,
  Banknote,
  ExternalLink,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useGetSK from "@/features/SK/useGetSK";
import SKSkeleton from "@/components/SKSkeleton";
import { golonganRuang } from "@/utils/helper";

const SK = () => {
  const { SK, isLoadingSK } = useGetSK();
  if (isLoadingSK) return <SKSkeleton />;

  const detailData = SK?.data?.[0];
  const hasData = !!detailData;
  const { pangkat: namaPangkat } = golonganRuang(detailData?.golongan_ruang);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="bg-slate-50 p-10 rounded-full border-2 border-dashed border-slate-200">
          <FileText className="w-16 h-16 text-slate-300" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Data SK Belum Tersedia
          </h2>
          <p className="text-slate-500 max-w-sm">
            Silahkan tambahkan informasi Surat Keputusan Kenaikan Pangkat Anda
            terlebih dahulu.
          </p>
        </div>
        <NavLink to="/sk/tambah">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 px-8 py-6 rounded-2xl gap-2 font-bold transition-all active:scale-95">
            <PlusCircle className="w-5 h-5" />
            Tambahkan Data SK
          </Button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Data SK Pegawai
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manajemen Surat Keputusan & Kenaikan Pangkat
          </p>
        </div>
        <NavLink to="/sk/tambah">
          <Button className="bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 shadow-sm px-6 rounded-xl font-bold flex items-center gap-2 transition-all">
            <ExternalLink className="w-4 h-4" />
            Perbarui Data SK
          </Button>
        </NavLink>
      </div>

      {/* HIGHLIGHT CARDS (Pangkat & Golongan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 flex items-center gap-5">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">
              Pangkat / Golongan
            </p>
            <h3 className="text-xl font-black capitalize">
              {namaPangkat || detailData.pangkat || "-"}
            </h3>
            <p className="text-sm font-medium opacity-90">
              {detailData.golongan_ruang}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              TMT Golongan
            </p>
            <h3 className="text-xl font-black text-slate-800">
              {new Date(detailData.tmt_golongan).toLocaleDateString() || "-"}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="bg-amber-50 p-4 rounded-2xl text-amber-600">
            <Banknote className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Gaji Pokok
            </p>
            <h3 className="text-xl font-black text-slate-800">
              Rp {detailData.gaji_pokok?.toLocaleString("id-ID") || "0"}
            </h3>
          </div>
        </div>
      </div>

      {/* DETAIL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Administrasi SK */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <h4 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">
              Administrasi SK
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DetailItem label="Nomor SK" value={detailData.nomor_sk} />
            <DetailItem
              label="Tanggal SK"
              value={new Date(detailData.tanggal_sk).toLocaleDateString()}
            />
            <DetailItem
              label="Nomor Pertek BKN"
              value={detailData.nomor_pertek_bkn}
            />
            <DetailItem
              label="Tanggal Pertek BKN"
              value={new Date(
                detailData.tanggal_pertek_bkn,
              ).toLocaleDateString()}
            />
          </div>
        </div>

        {/* Info Tambahan */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h4 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">
              Keterangan Kenaikan Pangkat
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DetailItem
              label="Jenis Kenaikan pangkat"
              value={detailData.jenis_kp}
            />
            <DetailItem
              label="KGB terakhir"
              value={`${new Date(detailData.kgb_terakhir).toLocaleDateString()}`}
            />
            <DetailItem
              label="Masa Kerja Golongan"
              value={`${detailData.masa_gk_tahunan} Tahun ${new Date(detailData.masa_gk_bulanan).getMonth() + 1} Bulan`}
            />
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                Status Verifikasi
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle className="w-4 h-4" /> Data SK Terverifikasi Sistem
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-Component for cleaner look
const DetailItem = ({ label, value }) => (
  <div className="group">
    <p className=" text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">
      {label}
    </p>
    <p className="capitalize text-sm font-bold text-slate-700 break-words">
      {value || (
        <span className="text-slate-300 italic font-normal">
          Data tidak tersedia
        </span>
      )}
    </p>
  </div>
);

// Helper icons that were missing
const CheckCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default SK;
