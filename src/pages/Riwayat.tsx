import useGetBerkas from "@/features/berkas/useGetDataBerkas";
import useGetDataKP from "@/features/berkas/useGetDataBerkas";
import { BASE_DOCUMENT } from "@/utils/config";
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar } from "lucide-react";

interface History {
  id: number;
  sk_pns: string;
  sk_cpns: string;
  sk_gaji_berkala: string;
  sk_jabatan: string;
  sk_pangkat_terakhir: string;
  created_at: string;
}

const Riwayat: React.FC = () => {
  const [isPending, setIsPending] = React.useState(false);
  const { berkas, isLoadingBerkas } = useGetBerkas();
  const getHistory = berkas?.data
    ?.filter(
      (item) =>
        new Date(item?.created_at)?.getFullYear() < new Date()?.getFullYear()
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getFullYear() -
        new Date(a.created_at).getFullYear()
    );

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 mt-20 max-w-3xl mx-auto px-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-5/6"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-4/6"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Kembali
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          Riwayat
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Riwayat dokumen kepegawaian Anda.
        </p>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-50 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-center">SK PNS</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK CPNS</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK Gaji Berkala</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK Jabatan</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK Pangkat Terakhir</th>
              <th className="px-4 lg:px-6 py-3 text-center">Tahun</th>
            </tr>
          </thead>
          <tbody>
            {getHistory?.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 lg:px-6 py-4 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_pns}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-4 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_cpns}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-4 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_gaji_berkala}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-4 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_jabatan}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-4 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_pangkat_terakhir}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-4 text-center font-medium text-gray-700">
                  {new Date(item.created_at).getFullYear()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden space-y-4">
        {getHistory?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Dokumen Kepegawaian
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white px-2.5 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(item.created_at).getFullYear()}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-medium">SK PNS</p>
                <a
                  href={`${BASE_DOCUMENT}/${item.sk_pns}`}
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                >
                  Lihat Dokumen
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-medium">SK CPNS</p>
                <a
                  href={`${BASE_DOCUMENT}/${item.sk_cpns}`}
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                >
                  Lihat Dokumen
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-medium">SK Gaji Berkala</p>
                <a
                  href={`${BASE_DOCUMENT}/${item.sk_gaji_berkala}`}
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                >
                  Lihat Dokumen
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-medium">SK Jabatan</p>
                <a
                  href={`${BASE_DOCUMENT}/${item.sk_jabatan}`}
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                >
                  Lihat Dokumen
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-medium">SK Pangkat Terakhir</p>
                <a
                  href={`${BASE_DOCUMENT}/${item.sk_pangkat_terakhir}`}
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                >
                  Lihat Dokumen
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getHistory?.length === 0 && (
        <div className="text-center mt-10 py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm sm:text-base">Belum ada riwayat dokumen kepegawaian.</p>
        </div>
      )}
    </div>
  );
};

export default Riwayat;