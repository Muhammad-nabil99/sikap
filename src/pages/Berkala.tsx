import { useRef, useState } from "react";

import {
  BookText,
  CheckCircle2,
  FileText,
  ExternalLink,
  RefreshCcw,
  Upload,
  AlertCircle,
} from "lucide-react";

import toast from "react-hot-toast";
import useGetSK from "@/features/SK/useGetSK";
import useCreateBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useCreateBerkasKenaikanPangkatPangkatTerakhir";
import useUpdateBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useUpdateBerkasKenaikanPangkatPangkatTerakhir";
import useGetBerkasKenaikanPangkatPangkatTerakhir from "@/features/berkas/PANGKAT_TERAKHIR/useGetDataBerkasKenaikanPangkatPengkatTerakhir";
import useGetBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useGetDataBerkasKenaikanPangkatGajiBerkala";
import useCreateBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useCreateBerkasKenaikanPangkatGajiBerkala";
import useUpdateBerkasKenaikanPangkatGajiBerkala from "@/features/berkas/GAJI_BERKALA/useUpdateBerkasKenaikanPangkatGajiBerkala";

// Type definition for document config
export type DocumentConfig = {
  key: string;
  label: string;
  fieldName: string;
  getData: any;
  onCreate: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isLoading: boolean;
};

function Berkala() {
  // ✅ CREATE REF OBJECT OUTSIDE THE LOOP
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const { SK, isLoadingSK } = useGetSK();

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

  // Configuration for each document type
  const documentConfigs: DocumentConfig[] = [
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

  const TMT_GOLONGAN = new Date(SK?.data?.[0]?.tmt_golongan);
  const PROMOTION_DATE = new Date(TMT_GOLONGAN);
  PROMOTION_DATE.setFullYear(PROMOTION_DATE.getFullYear() + 4);

  // Subtract 3 months to get the date when upload should be enabled
  const UPLOAD_ENABLED_DATE = new Date(PROMOTION_DATE);
  UPLOAD_ENABLED_DATE.setMonth(UPLOAD_ENABLED_DATE.getMonth() - 3);

  // Check if current date is on or after the upload enabled date
  const TODAY = new Date();
  const CAN_UPLOAD = TODAY <= UPLOAD_ENABLED_DATE;

  // Handle File Upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    config: DocumentConfig,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    const formData = new FormData();
    formData.append(config.fieldName, file);

    // Check if file already exists (data is not null)
    if (config.getData?.data) {
      // Create new file
      config.onCreate(formData);
    } else {
      // Update existing file
      config.onUpdate(formData);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Info Banner */}
          {!CAN_UPLOAD && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-amber-900 mb-1">
                    Unggahan Belum Tersedia
                  </h3>
                  <p className="text-xs text-amber-700">
                    Anda dapat mengunggah dokumen mulai tanggal{" "}
                    <span className="font-bold">
                      {formatDate(UPLOAD_ENABLED_DATE)}
                    </span>{" "}
                    (3 bulan sebelum tanggal kenaikan pangkat:{" "}
                    <span className="font-bold">
                      {formatDate(PROMOTION_DATE)}
                    </span>
                    )
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documentConfigs?.map((config) => {
              // Show loading skeleton if data is still loading
              if (config.isLoading) {
                return (
                  <div key={config.key} className="flex flex-col group">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-300 p-1.5 rounded-lg animate-pulse">
                          <BookText className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                          Dokumen {config.label}
                        </h2>
                      </div>
                      <div className="h-6 w-24 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl mb-4">
                        <div className="bg-white p-3 rounded-lg border shadow-sm animate-pulse">
                          <FileText className="w-7 h-7 text-slate-300" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                          <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                );
              }

              // getData.data is now a string (file URL) or null
              const fileUrl = config.getData?.data?.[0]?.[config?.key];
              const hasSubmitted = !!fileUrl;
              const isActionLoading = config.isCreating || config.isUpdating;

              return (
                <div key={config.key} className="flex flex-col group">
                  <input
                    type="file"
                    hidden
                    ref={(el) => (fileInputRefs.current[config.key] = el)} // ✅ CHANGED: Store ref using config.key
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, config)}
                  />

                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${hasSubmitted ? "bg-blue-600" : "bg-amber-400"} p-1.5 rounded-lg transition-colors duration-300`}
                      >
                        <BookText className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                        Dokumen {config.label}
                      </h2>
                    </div>
                    {hasSubmitted ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        <CheckCircle2 className="w-3.5 h-3.5" /> TERISI
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" /> BELUM UNGGAH
                      </span>
                    )}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    {/* Current File */}
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl mb-4">
                      <div
                        className={`bg-white p-3 rounded-lg border shadow-sm transition-colors ${hasSubmitted ? "text-blue-600 border-blue-100" : "text-amber-500 border-amber-100"}`}
                      >
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${hasSubmitted ? "text-blue-900" : "text-amber-900"}`}
                        >
                          {hasSubmitted
                            ? `${config.label}.pdf`
                            : "Berkas Kosong"}
                        </p>
                        <p
                          className={`text-[11px] font-medium ${hasSubmitted ? "text-blue-600/70" : "text-amber-600/80"}`}
                        >
                          {hasSubmitted
                            ? "File tersimpan di sistem"
                            : "Silahkan unggah berkas Anda"}
                        </p>
                      </div>
                    </div>

                    {hasSubmitted && (
                      <div className="grid grid-cols-1 gap-3 mb-3">
                        <button
                          onClick={() => window.open(fileUrl, "_blank")}
                          disabled={!hasSubmitted}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Lihat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Berkala;
