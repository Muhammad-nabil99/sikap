import NewDocumentUpload from "@/components/NewDocumentUpload";
import GetAllBerkas from "@/features/berkas/GET_ALL_BERKAS/GetAllBerkas";
import useGetStatus from "@/features/status/useGetStatus";
import useUpdateStatus from "@/features/status/useUpdateStatus";
import { CAN_I_UPLOAD } from "@/utils/helper";
import {
  AlertCircle,
  BookText,
  CheckCircle2,
  ExternalLink,
  FileText,
  RefreshCcw,
  Upload,
} from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

// ✅ FIXED CreateKenaikanPangkat Component
function CreateKenaikanPangkat() {
  const { CAN_UPLOAD, PROMOTION_DATE, UPLOAD_ENABLED_DATE, TMT_GOLONGAN } =
    CAN_I_UPLOAD();
  const { onUpdateStatusBerkas, isUpdatingStatusBerkas } = useUpdateStatus();
  const { status, isLoadingStatus } = useGetStatus();

  const NEW_UPLOAD_DOCUMENT = Boolean(status);
  const documentConfigs = GetAllBerkas();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  console.log('NEW_UPLOAD_DOCUMENT',NEW_UPLOAD_DOCUMENT);
  
  // ✅ FIXED: Correct logic - check if array is empty or doesn't exist
  const HAS_NOT_UPLOADED = documentConfigs?.every(
    (item) => !item?.getData?.data || item?.getData?.data.length === 0,
  );

  // Check if all documents are locked (already submitted and locked)
  const HAS_UPLOADED_AND_LOCKED = documentConfigs?.every(
    (item) => item?.getData?.data?.[0]?.is_locked === true,
  );

  // ✅ NEW: Check if TMT Golongan has changed since last upload
  const TMT_HAS_CHANGED = (() => {
    if (!TMT_GOLONGAN || HAS_NOT_UPLOADED) return false;

    // Check any document's upload data
    const anyDocument = documentConfigs?.find(
      (item) => item?.getData?.data && item.getData.data.length > 0,
    );

    if (!anyDocument) return false;

    const lastUploadDate = new Date(anyDocument.getData.data[0].tanggal_upload);
    const currentTMT = new Date(TMT_GOLONGAN);

    // If current TMT is after the last upload date, TMT has changed
    return currentTMT > lastUploadDate;
  })();

  // ✅ FIXED: Determine when to show NewDocumentUpload screen
  // Show NewDocumentUpload when:
  // 1. User has never uploaded (HAS_NOT_UPLOADED) - they need to fill TMT first
  // 2. Upload window is not open yet (!CAN_UPLOAD) - too early to upload
  // 3. Documents are already locked (HAS_UPLOADED_AND_LOCKED) - already submitted
  // 4. NEW_UPLOAD_DOCUMENT is false (status is 0) - form not opened yet

  const SHOULD_SHOW_NEW_UPLOAD_SCREEN =
    !NEW_UPLOAD_DOCUMENT || // Form not opened yet
    HAS_UPLOADED_AND_LOCKED || // Already submitted and locked
    (HAS_NOT_UPLOADED && !CAN_UPLOAD); // Never uploaded and not in upload window

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

    // If file exists and we're in update mode, update; otherwise create
    if (config.getData?.data?.[0]?.[config?.key]) {
      config.onUpdate(formData);
    } else {
      config.onCreate(formData);
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


  // ✅ FIXED: Show NewDocumentUpload with correct conditions
  if (SHOULD_SHOW_NEW_UPLOAD_SCREEN) {
    return ( 
      <NewDocumentUpload
        canIUpload={CAN_UPLOAD || HAS_NOT_UPLOADED} // Can upload OR needs to set TMT
        status={NEW_UPLOAD_DOCUMENT}
        onUpdateStatusBerkas={onUpdateStatusBerkas}
        isUpdatingStatusBerkas={isUpdatingStatusBerkas}
        hasNotUploaded={HAS_NOT_UPLOADED}
        tmtHasChanged={TMT_HAS_CHANGED}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* ✅ Info Banner - Show when in upload window or TMT changed */}
          {(CAN_UPLOAD || TMT_HAS_CHANGED) && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-amber-900 mb-1">
                    {TMT_HAS_CHANGED
                      ? "TMT Golongan Telah Berubah - Perbarui Dokumen"
                      : "Periode Unggahan Aktif"}
                  </h3>
                  <p className="text-xs text-amber-700">
                    {TMT_HAS_CHANGED
                      ? "Sistem mendeteksi perubahan TMT Golongan. Silakan unggah ulang semua dokumen."
                      : `Anda dapat mengunggah dokumen mulai ${formatDate(UPLOAD_ENABLED_DATE)} hingga ${formatDate(PROMOTION_DATE)}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documentConfigs?.map((config) => {
              if (config.isLoading) {
                return (
                  <div key={config.key} className="flex flex-col group">
                    {/* Loading skeleton - keep your existing code */}
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

              const fileUrl = config.getData?.data?.[0]?.[config?.key];
              const hasSubmitted = !!fileUrl;
              const isActionLoading = config.isCreating || config.isUpdating;

              // ✅ NEW: Determine if document needs amber warning (TMT changed)
              const needsUpdate = hasSubmitted && TMT_HAS_CHANGED;

              return (
                <div key={config.key} className="flex flex-col group">
                  <input
                    type="file"
                    hidden
                    ref={(el) => (fileInputRefs.current[config.key] = el)}
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, config)}
                  />

                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${
                          needsUpdate
                            ? "bg-amber-500"
                            : hasSubmitted
                              ? "bg-blue-600"
                              : "bg-amber-400"
                        } p-1.5 rounded-lg transition-colors duration-300`}
                      >
                        <BookText className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                        Dokumen {config.label}
                      </h2>
                    </div>

                    {/* ✅ Status badges with TMT change warning */}
                    {needsUpdate ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" /> PERLU UPDATE
                      </span>
                    ) : hasSubmitted ? (
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
                        className={`bg-white p-3 rounded-lg border shadow-sm transition-colors ${
                          needsUpdate
                            ? "text-amber-600 border-amber-100"
                            : hasSubmitted
                              ? "text-blue-600 border-blue-100"
                              : "text-amber-500 border-amber-100"
                        }`}
                      >
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${
                            needsUpdate
                              ? "text-amber-900"
                              : hasSubmitted
                                ? "text-blue-900"
                                : "text-amber-900"
                          }`}
                        >
                          {hasSubmitted
                            ? `${config.label}.pdf`
                            : "Berkas Kosong"}
                        </p>
                        <p
                          className={`text-[11px] font-medium ${
                            needsUpdate
                              ? "text-amber-600/80"
                              : hasSubmitted
                                ? "text-blue-600/70"
                                : "text-amber-600/80"
                          }`}
                        >
                          {needsUpdate
                            ? "Perlu diperbarui - TMT berubah"
                            : hasSubmitted
                              ? "File tersimpan di sistem"
                              : "Silahkan unggah berkas Anda"}
                        </p>
                      </div>
                    </div>

                    {hasSubmitted && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <button
                          onClick={() => window.open(fileUrl, "_blank")}
                          disabled={!hasSubmitted}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Lihat
                        </button>
                        <button
                          onClick={() =>
                            fileInputRefs.current[config.key]?.click()
                          }
                          disabled={isActionLoading}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" /> Ganti
                        </button>
                      </div>
                    )}

                    {!hasSubmitted && (
                      <button
                        disabled={isActionLoading}
                        onClick={() =>
                          fileInputRefs.current[config.key]?.click()
                        }
                        className="w-full capitalize flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-md shadow-amber-100 transition-all active:scale-[0.98]"
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

export default CreateKenaikanPangkat;
