import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BASE_DOCUMENT } from "@/utils/config";
import { PlusCircle, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useGetBerkas from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import useGetSK from "@/features/SK/useGetSK";
import { DocumentKP } from "@/services/Berkas/CPNS/BERKAS_CPNS_API";
import BerkasSkeleton from "@/components/BerkasSkeleton";
import { useDataContext } from "@/context/useDataContext";

function Pensiun() {
  const { infoSubmission } = useDataContext();
  const isSubmissionOpen = infoSubmission();

  const { berkas, isLoadingBerkas } = useGetBerkas();
  const { SK, isLoadingSK } = useGetSK();
  const [upload, setUpload] = useState(false);
  const hasFilled = SK?.data?.length;
  const hasUpload = berkas?.data?.find(
    (item) =>
      new Date(item.created_at).getFullYear() === new Date().getFullYear(),
  );

  const isLoading = isLoadingBerkas || isLoadingSK;
  const getNewsBerkas = berkas?.data?.filter(
    (item) =>
      new Date(item.created_at).getFullYear() === new Date().getFullYear(),
  );

  useEffect(() => {
    if (!isSubmissionOpen && hasFilled && !hasUpload) {
      setUpload(true);
    } else {
      setUpload(false);
    }
  }, [SK?.data?.length, getNewsBerkas?.length]);

  if (isLoading) return <BerkasSkeleton />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Header */}
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
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

        {upload && (
          <NavLink to={"/berkas/tambah"} className="w-full sm:w-auto">
            <Button
              className={cn(
                "w-full sm:w-fit bg-blue-600 capitalize gap-2 shadow-md hover:shadow-lg transition-all font-semibold text-sm sm:text-base py-2 sm:py-2.5"
              )}
            >
              Tambahkan
              <PlusCircle className="w-4 h-4" />
            </Button>
          </NavLink>
        )}
      </div> */}

      {/* Title */}
      {/* <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 capitalize">
          Data Pensiun
        </h1>
      </div> */}

      {/* Desktop Table View - Hidden on mobile */}
      {/* <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-50 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-center">SK PNS</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK CPNS</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK Gaji Berkala</th>
              <th className="px-4 lg:px-6 py-3 text-center">SK Jabatan</th>
              <th className="px-4 lg:px-6 py-3 text-center">
                SK Pangkat Terakhir
              </th>
              <th className="px-4 lg:px-6 py-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {getNewsBerkas?.map((item: DocumentKP) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 lg:px-6 py-3 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_pns}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_cpns}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_gaji_berkala}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_jabatan}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <a
                    href={`${BASE_DOCUMENT}/${item.sk_pangkat_terakhir}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Lihat Dokumen
                  </a>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <Link
                    to={`/berkas/${item.id}`}
                    className="text-blue-600 hover:underline font-medium text-xs sm:text-sm"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* Mobile Card View - Visible only on mobile */}
      {/* <div className="md:hidden space-y-4">
        {getNewsBerkas?.map((item: DocumentKP) => (
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
                <Link
                  to={`/berkas/${item.id}`}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Detail →
                </Link>
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
      </div> */}

      {/* No Data Message */}
      {/* {getNewsBerkas?.length === 0 && ( */}
      <div className="text-center mt-10 py-8 text-gray-500 text-sm sm:text-base">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="capitalize">Belum ada dokumen pensiun kepegawaian.</p>
      </div>
      {/* )} */}
    </div>
  );
}

export default Pensiun;
