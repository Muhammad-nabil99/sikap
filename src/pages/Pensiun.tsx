import { FileText, Hammer, ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Pensiun() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full text-center">
        {/* Decorative Icon Group */}
        <div className="relative inline-block mb-6">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
            <Hammer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm">
            <FileText className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
           Pensiun
          </h1>
          <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 w-fit mx-auto px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
            <Construction className="w-3.5 h-3.5" />
            Sedang Dikembangkan
          </div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[280px] mx-auto">
            Kami sedang menyiapkan fitur pengelolaan pensiun yang lebih mudah dan terintegrasi untuk Anda.
          </p>
        </div>


        {/* Navigation Action */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 flex items-center justify-center gap-2 mx-auto text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali 
        </button>
      </div>
    </div>
  );
}

export default Pensiun;