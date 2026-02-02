import useCreateBerkasKenaikanPangkatPNS from "@/features/berkas/PNS/useCreateBerkasKenaikanPangkatPNS";
import useUpdateBerkasKenaikanPangkatPNS from "@/features/berkas/PNS/useUpdateBerkasKenaikanPangkatPNS";
import useGetBerkasKenaikanPangkatPNS from "@/features/berkas/PNS/useGetDataBerkasKenaikanPangkatPNS";
import useCreateBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useCreateBerkasKenaikanPangkatPangkatTerakhir";
import useUpdateBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useUpdateBerkasKenaikanPangkatPangkatTerakhir";
import useGetBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useGetDataBerkasKenaikanPangkatPengkatTerakhir";
import useGetBerkasKenaikanPangkatJabatan from "@/features/berkas/JABATAN/useGetDataBerkasKenaikanPangkatJabatan";
import useCreateBerkasKenaikanPangkatJabatan from "@/features/berkas/JABATAN/useCreateBerkasKenaikanPangkatJabatan";
import useUpdateBerkasKenaikanPangkatJabatan from "@/features/berkas/JABATAN/useUpdateBerkasKenaikanPangkatJabatan";
import useGetBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useGetDataBerkasKenaikanPangkatGajiBerkala";
import useCreateBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useCreateBerkasKenaikanPangkatGajiBerkala";
import useUpdateBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useUpdateBerkasKenaikanPangkatGajiBerkala";
import { FileText, History, ChevronDown, ExternalLink } from "lucide-react";
import React, { useRef, useState } from "react";
import { DocumentConfig } from "./KenaikanPangkat";
import useCreateBerkasKenaikanPangkatCPNS from "@/features/berkas/CPNS/useCreateBerkasKenaikanPangkatCPNS";
import useUpdateBerkasKenaikanPangkatCPNS from "@/features/berkas/CPNS/useUpdateBerkasKenaikanPangkatCPNS";
import useGetBerkasKenaikanPangkatCPNS from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";

export interface Data {
  id: number;
  file: string;
  created_at: string;
}

interface History {
  id: number;
  sk_pns: string;
  sk_cpns: string;
  sk_gaji_berkala: string;
  sk_jabatan: string;
  sk_pangkat_terakhir: string;
  created_at: string;
}

function ArsipKenaikanPangkat() {
  const THIS_YEAR = new Date().getFullYear();
  // CPNS Hooks
  const {
    onCreateBerkasKenaikanPangkatCPNS,
    isCreatingBerkasKenaikanPangkatCPNS,
  } = useCreateBerkasKenaikanPangkatCPNS();
  const {
    onUpdateBerkasKenaikanPangkatCPNS,
    isUpdatingBerkasKenaikanPangkatCPNS,
  } = useUpdateBerkasKenaikanPangkatCPNS();
  const {
    getBerkasKenaikanPangkatCPNS,
    isLoadingGetBerkasKenaikanPangkatCPNS,
  } = useGetBerkasKenaikanPangkatCPNS();

  // PNS Hooks
  const {
    onCreateBerkasKenaikanPangkatPNS,
    isCreatingBerkasKenaikanPangkatPNS,
  } = useCreateBerkasKenaikanPangkatPNS();
  const {
    onUpdateBerkasKenaikanPangkatPNS,
    isUpdatingBerkasKenaikanPangkatPNS,
  } = useUpdateBerkasKenaikanPangkatPNS();
  const { getBerkasKenaikanPangkatPNS, isLoadingGetBerkasKenaikanPangkatPNS } =
    useGetBerkasKenaikanPangkatPNS();

  // PANGKAT TERAKHIR Hooks
  const {
    getBerkasKenaikanPangkatPangkatTerakhir,
    isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
  } = useGetBerkasKenaikanPangkatPangkatTerakhir();
  const {
    onCreateBerkasKenaikanPangkatPangkatTerakhir,
    isCreatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useCreateBerkasKenaikanPangkatPangkatTerakhir();
  const {
    onUpdateBerkasKenaikanPangkatPangkatTerakhir,
    isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useUpdateBerkasKenaikanPangkatPangkatTerakhir();

  // JABATAN Hooks
  const {
    getBerkasKenaikanPangkatJabatan,
    isLoadingGetBerkasKenaikanPangkatJabatan,
  } = useGetBerkasKenaikanPangkatJabatan();
  const {
    onCreateBerkasKenaikanPangkatJabatan,
    isCreatingBerkasKenaikanPangkatJabatan,
  } = useCreateBerkasKenaikanPangkatJabatan();
  const {
    onUpdateBerkasKenaikanPangkatJabatan,
    isUpdatingBerkasKenaikanPangkatJabatan,
  } = useUpdateBerkasKenaikanPangkatJabatan();

  // GAJI BERKALA Hooks
  const {
    getBerkasKenaikanPangkatGajiBerkala,
    isLoadingGetBerkasKenaikanPangkatGajiBerkala,
  } = useGetBerkasKenaikanPangkatGajiBerkala();
  const {
    onCreateBerkasKenaikanPangkatGajiBerkala,
    isCreatingBerkasKenaikanPangkatGajiBerkala,
  } = useCreateBerkasKenaikanPangkatGajiBerkala();
  const {
    onUpdateBerkasKenaikanPangkatGajiBerkala,
    isUpdatingBerkasKenaikanPangkatGajiBerkala,
  } = useUpdateBerkasKenaikanPangkatGajiBerkala();

  const documentConfigs: DocumentConfig[] = [
    {
      key: "sk_cpns",
      label: "SK CPNS",
      fieldName: "sk_cpns",
      getData: getBerkasKenaikanPangkatCPNS,
      onCreate: onCreateBerkasKenaikanPangkatCPNS,
      onUpdate: onUpdateBerkasKenaikanPangkatCPNS,
      isCreating: isCreatingBerkasKenaikanPangkatCPNS,
      isUpdating: isUpdatingBerkasKenaikanPangkatCPNS,
      isLoading: isLoadingGetBerkasKenaikanPangkatCPNS,
    },
    {
      key: "sk_pns",
      label: "SK PNS",
      fieldName: "sk_pns",
      getData: getBerkasKenaikanPangkatPNS,
      onCreate: onCreateBerkasKenaikanPangkatPNS,
      onUpdate: onUpdateBerkasKenaikanPangkatPNS,
      isCreating: isCreatingBerkasKenaikanPangkatPNS,
      isUpdating: isUpdatingBerkasKenaikanPangkatPNS,
      isLoading: isLoadingGetBerkasKenaikanPangkatPNS,
    },
    {
      key: "sk_pangkat_terakhir",
      label: "SK Pangkat Terakhir",
      fieldName: "sk_pangkat_terakhir",
      getData: getBerkasKenaikanPangkatPangkatTerakhir,
      onCreate: onCreateBerkasKenaikanPangkatPangkatTerakhir,
      onUpdate: onUpdateBerkasKenaikanPangkatPangkatTerakhir,
      isCreating: isCreatingBerkasKenaikanPangkatPangkatTerakhir,
      isUpdating: isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
      isLoading: isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
    },
    {
      key: "sk_jabatan",
      label: "SK Jabatan",
      fieldName: "sk_jabatan",
      getData: getBerkasKenaikanPangkatJabatan,
      onCreate: onCreateBerkasKenaikanPangkatJabatan,
      onUpdate: onUpdateBerkasKenaikanPangkatJabatan,
      isCreating: isCreatingBerkasKenaikanPangkatJabatan,
      isUpdating: isUpdatingBerkasKenaikanPangkatJabatan,
      isLoading: isLoadingGetBerkasKenaikanPangkatJabatan,
    },
    {
      key: "sk_gaji_berkala",
      label: "SK Gaji Berkala",
      fieldName: "sk_gaji_berkala",
      getData: getBerkasKenaikanPangkatGajiBerkala,
      onCreate: onCreateBerkasKenaikanPangkatGajiBerkala,
      onUpdate: onUpdateBerkasKenaikanPangkatGajiBerkala,
      isCreating: isCreatingBerkasKenaikanPangkatGajiBerkala,
      isUpdating: isUpdatingBerkasKenaikanPangkatGajiBerkala,
      isLoading: isLoadingGetBerkasKenaikanPangkatGajiBerkala,
    },
  ];
  const [isPending, setIsPending] = React.useState(false);

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 mt-20 max-w-3xl mx-auto px-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-5/6"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-4/6"></div>
      </div>
    );
  }

  const hasAnyArchive = documentConfigs?.some((document) => {
    return (
      document?.getData?.data?.length !== 0 &&
      document?.getData?.data?.some(
        (item: Data) =>
          new Date(item?.created_at).getFullYear() != new Date().getFullYear(),
      )
    );
  });

  const ArsipKenaikanPangkatCard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {documentConfigs?.map((document) => {
        const archiveDocuments =
          document?.getData?.data?.filter((item: Data) => {
            if (new Date(item?.created_at).getFullYear() < THIS_YEAR)
              return item;
          }) || [];

        if (archiveDocuments?.length == 0) return null;
        return (
          <div
            key={document?.key}
            className="bg-amber-50/50 border border-amber-200 rounded-3xl p-6 relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-slate-800">
                Arsip {document?.label}
              </h3>
            </div>
            {archiveDocuments.map((item: Data, index: number) => {
              return (
                <div className="space-y-4 my-1" key={index}>
                  <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm relative">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-sm"></div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic">
                        Terakhir (Aktif)
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 italic">
                        {new Date(item?.created_at)?.getFullYear()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700 truncate">
                          {document?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => window.open(item?.file, "_blank")}
                        className="px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-[10px] font-bold text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const EmptyCard = () => (
    <div className="flex items-center justify-center py-16">
      <div className="max-w-md w-full text-center">
        {/* Icon Container */}
        <div className="relative inline-block mb-6">
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <History className="w-5 h-5 text-amber-600" />
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
            <FileText className="w-20 h-20 text-slate-300 mx-auto" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 px-4">
          <h3 className="text-xl font-bold text-slate-800">
            Belum Ada Arsip Dokumen
          </h3>
          <p className="capitalize text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
            Arsip dokumen kenaikan pangkat Anda akan muncul di sini setelah
            dokumen tahun sebelumnya tersimpan di sistem.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-1 w-8 bg-amber-200 rounded-full"></div>
          <div className="h-1 w-12 bg-amber-300 rounded-full"></div>
          <div className="h-1 w-8 bg-amber-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Arsip Dokumen Kenaikan Pangkat
          </h1>
          <p className="text-slate-500 mt-1 capitalize">
            Kelola dokumen Arsip kenaikan pangkat Anda.
          </p>
        </div>

        {/* FASE 2: Arsip KARIR (MULTIPLE / TIMELINE) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-500 p-1.5 rounded-md">
              <History className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
              Arsip
            </h2>
          </div>
          {hasAnyArchive ? <ArsipKenaikanPangkatCard /> : <EmptyCard />}
        </section>
      </div>
    </div>
  );
}
export default ArsipKenaikanPangkat;
