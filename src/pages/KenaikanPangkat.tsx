import { useRef, useState } from "react";
import useUpdateBerkas from "@/features/berkas/CPNS/useUpdateBerkasKenaikanPangkatCPNS";
import useCreateBerkas from "@/features/berkas/CPNS/useCreateBerkasKenaikanPangkatCPNS";
import useGetBerkas from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import useGetSK from "@/features/SK/useGetSK";

import {
  BookText,
  CheckCircle2,
  FileText,
  ExternalLink,
  RefreshCcw,
  Upload,
  ChevronDown,
  ChevronUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { BASE_DOCUMENT } from "@/utils/config";
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
import toast from "react-hot-toast";

// Type definition for document config
type DocumentConfig = {
  key: string;
  label: string;
  fieldName: string;
  getData: any;
  onCreate: (formData: FormData) => void;
  onUpdate: (params: { id: number; formData: FormData }) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isLoading: boolean;
  isSingleFile: boolean;
};

function KenaikanPangkat() {
  // State for toggling archive view for each document
  const [expandedArchives, setExpandedArchives] = useState<{
    [key: string]: boolean;
  }>({});

  // CPNS Hooks
  const {
    onCreateBerkasKenaikanPangkatCPNS,
    isCreatingBerkasKenaikanPangkatCPNS,
  } = useCreateBerkas();
  const {
    onUpdateBerkasKenaikanPangkatCPNS,
    isUpdatingBerkasKenaikanPangkatCPNS,
  } = useUpdateBerkas();
  const {
    getBerkasKenaikanPangkatCPNS,
    isLoadingGetBerkasKenaikanPangkatCPNS,
  } = useGetBerkas();

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

  // Configuration for each document type
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
      isSingleFile: true,
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
      isSingleFile: true,
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
      isSingleFile: false,
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
      isSingleFile: false,
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
      isSingleFile: false,
    },
  ];

  // Toggle archive visibility
  const toggleArchive = (key: string) => {
    setExpandedArchives((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

    console.log(`📤 Uploading ${config.label}:`, file.name);

    if (config.isSingleFile) {
      // CPNS & PNS - Single file logic
      const existingData = config.getData?.data;

      if (existingData?.id) {
        console.log(`✏️ Updating ${config.label} ID:`, existingData.id);
        config.onUpdate({ id: existingData.id, formData });
      } else {
        console.log(`➕ Creating new ${config.label}`);
        config.onCreate(formData);
      }
    } else {
      // Array-based documents - Find by year
      const dataArray = Array.isArray(config.getData?.data)
        ? config.getData.data
        : [];

      const currentYearBerkas = dataArray.find(
        (item: any) =>
          new Date(item.created_at).getFullYear() === new Date().getFullYear(),
      );

      if (currentYearBerkas?.id) {
        console.log(`✏️ Updating ${config.label} ID:`, currentYearBerkas.id);
        config.onUpdate({ id: currentYearBerkas.id, formData });
      } else {
        console.log(`➕ Creating new ${config.label}`);
        config.onCreate(formData);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documentConfigs.map((config) => {
              const fileInputRef = useRef<HTMLInputElement>(null);

              // Handle both single file and array data
              let existingFileUrl: string | undefined;
              let hasFile = false;
              let currentYearBerkas: any = null;
              let previousYearFiles: any[] = [];
              let allFiles: any[] = [];
              const hasMultipleFiles = !config?.isSingleFile;

              if (config.isSingleFile) {
                // CPNS & PNS - Single file
                const singleData = config.getData?.data;
                existingFileUrl = singleData?.[config.fieldName];
                hasFile = !!existingFileUrl;
              } else {
                // Array-based - Get all files and sort by year
                const dataArray = Array.isArray(config.getData?.data)
                  ? config.getData.data
                  : [];

                allFiles = dataArray;
                const currentYear = new Date().getFullYear();

                // Find current year file
                currentYearBerkas = dataArray.find(
                  (item: any) =>
                    new Date(item.created_at).getFullYear() === currentYear,
                );

                // Get previous years' files (exclude current year)
                previousYearFiles = dataArray
                  .filter(
                    (item: any) =>
                      new Date(item.created_at).getFullYear() !== currentYear,
                  )
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  );

                existingFileUrl = config?.getData?.data;
                // existingFileUrl = currentYearBerkas?.[config.fieldName];

                hasFile = !!existingFileUrl;
                // console.log(`${config.label} hasfile`, );
              }

              const isActionLoading = config.isCreating || config.isUpdating;
              const isExpanded = expandedArchives[config.key] || false;

              const hasSubmited = config.isSingleFile
                ? !!config?.getData?.data?.[config?.fieldName]
                : Array.isArray(config?.getData?.data) &&
                  (config.getData.data as any[]).length > 0;

              return (
                <div key={config.key} className="flex flex-col group">
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, config)}
                  />

                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${hasSubmited ? "bg-blue-600" : "bg-amber-400"} p-1.5 rounded-lg transition-colors duration-300`}
                      >
                        <BookText className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                        Dokumen {config.label}
                      </h2>
                    </div>
                    {hasSubmited ? (
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
                    {/* Current Year File */}
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl mb-4">
                      <div
                        className={`bg-white p-3 rounded-lg border shadow-sm transition-colors ${hasSubmited ? "text-blue-600 border-blue-100" : "text-amber-500 border-amber-100"}`}
                      >
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${hasSubmited ? "text-blue-900" : "text-amber-900"}`}
                        >
                          {hasSubmited
                            ? `${config.label} ${"currentYear"}.pdf`
                            : "Berkas Kosong"}
                        </p>
                        <p
                          className={`text-[11px] font-medium ${hasSubmited ? "text-blue-600/70" : "text-amber-600/80"}`}
                        >
                          {hasSubmited
                            ? "File tersimpan di sistem"
                            : "Silahkan unggah berkas Anda"}
                        </p>
                      </div>
                    </div>

                    {hasSubmited && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <button
                          onClick={() => window.open(existingFileUrl, "_blank")}
                          disabled={!hasSubmited}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Lihat
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isActionLoading}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" /> Ganti
                        </button>
                      </div>
                    )}

                    {!hasSubmited && (
                      <button
                        disabled={isActionLoading}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full capitalize flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-100 transition-all active:scale-[0.98]"
                      >
                        {isActionLoading ? (
                          <span className="animate-pulse">Memproses...</span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" /> Unggah Sekarang
                          </>
                        )}
                      </button>
                    )}

                    {/* Archive Button - Only for array-based documents */}
                    {!config.isSingleFile && previousYearFiles.length > 0 && (
                      <>
                        <button
                          onClick={() => toggleArchive(config.key)}
                          className="mt-3 w-full py-3 bg-white/60 border border-blue-100 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2 transition-all"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {isExpanded
                            ? "Sembunyikan Arsip"
                            : `Lihat ${previousYearFiles.length} Arsip Sebelumnya`}
                        </button>

                        {/* Previous Years Archive */}
                        {isExpanded && (
                          <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="text-[10px] font-bold uppercase text-slate-400 px-2 mb-2">
                              Arsip Dokumen
                            </div>
                            {previousYearFiles.map(
                              (file: any, index: number) => {
                                const fileYear = new Date(
                                  file.created_at,
                                ).getFullYear();
                                const fileUrl = file[config.fieldName];

                                return (
                                  <div
                                    key={file.id || index}
                                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-all"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white rounded-lg">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-700">
                                          {config.label} {fileYear}
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                          {new Date(
                                            file.created_at,
                                          ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        window.open(fileUrl, "_blank")
                                      }
                                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        )}
                      </>
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

export default KenaikanPangkat;
