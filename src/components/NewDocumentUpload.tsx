import {
  PlusCircle,
  Lock,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function NewDocumentUpload({
  onUpdateStatusBerkas,
  isUpdatingStatusBerkas,
  canIUpload,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[450px] w-full p-4">
      <div
        className={`
          relative overflow-hidden w-full max-w-xl flex flex-col items-center justify-center p-8 md:p-12 
          border-2 border-dashed rounded-[2.5rem] transition-all duration-500 group
          ${
            canIUpload
              ? "border-slate-200 bg-white hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100/50"
              : "border-slate-100 bg-slate-50/50"
          }
        `}
      >
        {/* Decorative Background Blobs */}
        <div
          className={`absolute -top-12 -right-12 w-40 h-40 blur-3xl rounded-full transition-colors duration-500 ${canIUpload ? "bg-blue-100/50" : "bg-slate-200/50"}`}
        />
        <div
          className={`absolute -bottom-12 -left-12 w-40 h-40 blur-3xl rounded-full transition-colors duration-500 ${canIUpload ? "bg-indigo-50/50" : "bg-slate-100/50"}`}
        />

        {/* Icon Section */}
        <div
          className={`
          relative p-7 rounded-3xl mb-8 shadow-sm transition-all duration-500
          ${
            canIUpload
              ? "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 group-hover:scale-110 group-hover:rotate-3"
              : "bg-slate-200 text-slate-400"
          }
        `}
        >
          {canIUpload ? (
            <PlusCircle className="w-14 h-14" />
          ) : (
            <Lock className="w-14 h-14" />
          )}
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 z-10">
          <h3
            className={`text-2xl font-black tracking-tight ${canIUpload ? "text-slate-800" : "text-slate-500"}`}
          >
            {canIUpload ? "Mulai Unggah Dokumen" : "Unggahan Terkunci"}
          </h3>

          <div className="max-w-sm mx-auto">
            {canIUpload ? (
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Sistem mendeteksi Anda telah memenuhi syarat. Silakan buka form
                untuk melengkapi berkas kenaikan pangkat Anda.
              </p>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-start gap-3 p-4 bg-white border border-amber-100 rounded-2xl shadow-sm mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs text-left leading-relaxed">
                    Fitur unggah belum tersedia. Anda perlu memperbarui{" "}
                    <span className="font-bold text-slate-800">
                      TMT Golongan
                    </span>{" "}
                    pada SK pegawai terlebih dahulu.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/sk/tambah")}
                  className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors group/link"
                >
                  Perbarui SK
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {canIUpload && (
          <button
            disabled={isUpdatingStatusBerkas}
            onClick={() => onUpdateStatusBerkas({ status: 1 })}
            className="
              relative mt-10 px-10 py-4 bg-blue-600 text-white text-sm font-bold rounded-2xl
              shadow-[0_20px_40px_-12px_rgba(37,99,235,0.4)] hover:bg-blue-700 
              hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300
              disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3
            "
          >
            {isUpdatingStatusBerkas ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menyiapkan Form...
              </>
            ) : (
              <>
                Buka Form Unggahan
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default NewDocumentUpload;
