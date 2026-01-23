import SKSkeleton from "@/components/SKSkeleton";
import { Button } from "@/components/ui/button";
import useGetUser from "@/features/user/useGetUser";
import { cn } from "@/lib/utils";
import {
  Edit3,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
  Calendar,
  Briefcase,
  Info,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const DataPegawai: React.FC = () => {
  const { user, isLoadingUser } = useGetUser();
  const userData = user?.data;

  // Membagi field menjadi kategori agar lebih terstruktur
  const mainInfo = [
    { label: "NIP", value: userData?.nip, icon: Info },
    { label: "Email", value: userData?.email, icon: Mail },
    { label: "Nomor Telepon", value: userData?.nomor, icon: Phone },
    {
      label: "Unit Kerja",
      value: `${userData?.unit_kerja}`?.split("_").join(" "),
      icon: Briefcase,
    },
  ];

  const personalInfo = [
    { label: "Agama", value: userData?.agama },
    { label: "Jenis Kelamin", value: userData?.jenis_kelamin },
    { label: "Tempat Lahir", value: userData?.tempat_lahir },
    { label: "Tanggal Lahir", value: userData?.tanggal_lahir },
    { label: "Alamat", value: userData?.alamat, fullWidth: true },
  ];

  if (isLoadingUser) return <SKSkeleton />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

        <div className="relative px-8 pb-8 pt-16 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-xl border border-slate-100 transform transition-transform hover:scale-105">
              <div className="w-full h-full rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                <UserIcon className="w-16 h-16 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <div className="flex-1 mb-2 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight capitalize">
              {userData?.nama || "Nama Pegawai"}
            </h1>
            <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                Pegawai Aktif
              </span>
            </p>
          </div>

          <NavLink to="/data-pegawai/tambah" className="mb-2">
            <Button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm px-6 gap-2 rounded-xl transition-all active:scale-95">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span className="font-bold">Ubah Profil</span>
            </Button>
          </NavLink>
        </div>
      </div>

      {/* SECTION 2: INFORMATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Contacts */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            Konektivitas
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            {mainInfo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-slate-700 truncate">
                    {item.value || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Personal Details */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            Detail Personal
          </h3>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {personalInfo.map((item, idx) => (
                <div
                  key={idx}
                  className={cn("group", item.fullWidth && "md:col-span-2")}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-slate-700 border-b border-transparent group-hover:border-blue-100 pb-1 transition-all capitalize">
                    {item.value || (
                      <span className="text-slate-300 italic font-normal">
                        Belum dilengkapi
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPegawai;
