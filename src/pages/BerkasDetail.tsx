import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import { SkeletonBerkasDetail } from "@/components/SkeletonBerkasDetail";
import useGetDataKP from "@/features/berkas/CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import { BASE_DOCUMENT } from "@/utils/config";
import CreateBerkas from "./CreateBerkas";
import useGetSK from "@/features/SK/useGetSK";
import { listGolonganRuang, updateGolonganRuang } from "@/utils/helper";

function BerkasDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  // const { berkas, isLoadingBerkas } = useGetDataKP();
  const { SK, isLoadingSK } = useGetSK();
  // const isLoading =  isLoadingBerkas || isLoadingSK;

  // if (isLoading) return <SkeletonBerkasDetail />;

  // const findBerkas = berkas?.data?.find((item) => item?.id == id);
  const findBerkas = {
    created_at: "",
    users_id: "",
    pegawai: "",
    pegawais_id: "",
    file_sk: "",
    status: "",
  };
  const {
    created_at,
    users_id,
    pegawai,
    pegawais_id,
    file_sk,
    status,
    // sk_cpns
    // ,sk_pns
    // ,sk_gaji_berkala
    // ,sk_pangkat_terakhir
    // ,sk_jabatan,
    ...document
  } = findBerkas;

  const {
    nomor_sk,
    tanggal_sk,
    masa_gk_bulanan,
    masa_gk_tahunan,
    nomor_pertek_bkn,
    jenis_kp,
    golongan_ruang,
    tanggal_pertek_bkn,
  } = SK?.data?.[0] ?? [];

  // const bulanan = masa_gk_bulanan?.split("-")?.[1]?.split("");

  // const shortBulanan = bulanan?.length > 1 ? bulanan?.[1] : bulanan?.[0];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Kembali
        </button>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="destructive"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            Hapus
            <Trash className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white",
            )}
          >
            {edit ? "Batal Edit" : "Edit"}
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
        Detail Kenaikan Pangkat
      </h1>

      {/* Info Table */}
      <div className="overflow-x-auto border border-gray-100 shadow-sm rounded-xl mb-10">
        {SK?.data[0] ? (
          <table className="w-full text-sm text-gray-700">
            <tbody className="divide-y">
              <tr>
                <td className="px-6 py-3 font-medium w-1/2">Jenis KP</td>
                <td className="px-6 py-3">: {jenis_kp}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium capitalize">
                  Masa kerja Golongan (Tahun)
                </td>
                <td className="px-6 py-3">: {masa_gk_tahunan}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium capitalize">
                  Masa kerja Golongan (Bulan)
                </td>
                <td className="px-6 py-3">: {masa_gk_bulanan}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">TMT Golongan</td>
                <td className="px-6 py-3">: 2024-08-12</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Golongan Ruang</td>
                <td className="px-6 py-3 flex gap-2">
                  :<span className="font-semibold">{golongan_ruang}</span>
                  akan naik ke
                  <span className="font-semibold">
                    {listGolonganRuang[updateGolonganRuang(golongan_ruang) + 1]}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Nomor SK</td>
                <td className="px-6 py-3">: {nomor_sk}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Tanggal SK</td>
                <td className="px-6 py-3">: {tanggal_sk}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Nomor Pertek BKN</td>
                <td className="px-6 py-3">: {nomor_pertek_bkn}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Tanggal Pertek BKN</td>
                <td className="px-6 py-3">: {tanggal_pertek_bkn}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center bg-red-50 rounded-xl">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <Trash className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg capitalize font-semibold text-red-800">
              Data Diri Terhapus
            </h3>
            <p className="mt-2 text-sm text-red-600">
              Kami tidak dapat menemukan data diri pegawai yang terkait dengan
              pengajuan Kenaikan Pangkat ini. Silahkan isi ulang!
            </p>
          </div>
        )}
      </div>

      {/* Document Table */}
      <form>
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-50 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left capitalize">Nama Dokumen</th>
                <th className="px-6 py-3 text-center capitalize">Lihat</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {Object?.entries(document)?.map(([key, value]) => {
                if (typeof value !== "string" || !value.includes("berkas"))
                  return null;

                const formattedKey = key.replace(/_/g, " ").toUpperCase();

                return (
                  <tr key={key}>
                    <td className="px-6 py-3 font-medium">{formattedKey}</td>
                    <td className="px-6 py-3 flex justify-center gap-3">
                      {edit && (
                        <input
                          type="file"
                          className="block w-40 text-xs text-gray-600
                        file:mr-3 file:px-3
                        file:rounded-full file:border-0
                        file:text-xs file:font-medium
                        file:bg-blue-50 file:text-gray-800
                        hover:file:bg-blue-100"
                        />
                      )}

                      <a
                        href={`${BASE_DOCUMENT}/${value}`}
                        target="_blank"
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition"
                      >
                        Lihat Dokumen
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
          <CreateBerkas berkas={""} isOpen={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
}

export default BerkasDetail;
