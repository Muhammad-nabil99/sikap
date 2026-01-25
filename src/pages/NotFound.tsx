import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Audit logging for developers
    console.error(
      `[404 Not Found]: ${location.pathname} at ${new Date().toISOString()}`
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-slate-50 px-6 py-12 antialiased">
      <div className="relative flex flex-col items-center text-center">
        
        {/* Decorative Background Element */}
        <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        {/* Icon & Error Code */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-blue-100/50 border border-slate-100">
          <AlertCircle className="h-12 w-12 text-blue-600" />
        </div>

        <h1 className="mb-2 text-8xl font-black tracking-tighter text-slate-900">
          404
        </h1>
        
        <h2 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="mb-10 max-w-md text-balance text-slate-500">
          Maaf, halaman <span className="font-mono font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">"{location.pathname}"</span> 
          tidak tersedia atau telah dipindahkan ke alamat lain.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button 
            variant="default" 
            size="lg" 
            className="group h-12 gap-2 rounded-xl bg-blue-600 px-8 font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Ke Beranda
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="h-12 gap-2 rounded-xl border-slate-200 bg-white px-8 font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-16 flex items-center gap-2 text-sm font-medium text-slate-400">
          <Search className="h-4 w-4" />
          <span>Butuh bantuan? Hubungi Admin IT</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;