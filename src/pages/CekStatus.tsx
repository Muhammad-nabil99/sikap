import CekStatusSkeleton from "@/components/CekStatusSkeleton";
import useGetBerkas from "@/features/berkas/useGetDataBerkas";
import useGetDataKP from "@/features/berkas/useGetDataBerkas";
import { BASE_DOCUMENT } from "@/utils/config";
import { colorindicatorStatus } from "@/utils/helper";
import React from "react";

type Incident = {
  id: number;
  title: string;
  status: "selesai" | "diproses" | "ditolak" | "terkirim";
  date: string;
  description: string;
};

const CekStatus: React.FC = () => {
  const { berkas, isLoadingBerkas } = useGetBerkas();

  const incidentData: Incident[] = [
    {
      id: 0,
      title: "Berkas terkirim",
      status: "terkirim",
      date: new Date().toLocaleDateString(),
      description:
        "Anda telah berhasil mengisi dan menyimpan semua data yang diperlukan untuk pengajuan kenaikan pangkat. Pengajuan siap dikirim.",
    },
    {
      id: 1,
      title: "telah dikirim ke BKD",
      status: "diproses",
      date: new Date().toLocaleDateString(),
      description:
        "Berkas pengajuan kenaikan pangkat telah diverifikasi dan diteruskan oleh unit kepegawaian ke Badan Kepegawaian Daerah (BKD) untuk diproses lebih lanjut.",
    },
    {
      id: 2,
      title: "telah dikirim ke BKN",
      status: "diproses",
      date: new Date().toLocaleDateString(),
      description:
        "Data pengajuan Anda telah dikirimkan ke Badan Kepegawaian Negara (BKN) untuk proses persetujuan dan penerbitan Nomor Induk Pegawai (NIP) baru.",
    },

    {
      id: 3,
      title: "SK telah terbit",
      status: "selesai",
      date: new Date().toLocaleDateString(),
      description:
        "Surat Keputusan (SK) kenaikan pangkat Anda telah resmi diterbitkan. Dokumen final dapat diakses dan diunduh.",
    },
    // Example of a 'ditolak' status (optional, but useful for testing)
    // {
    //   id: 6,
    //   title: "Revisi Berkas Diperlukan",
    //   status: "ditolak",
    //   date: "2025-01-12 10:00 WIB",
    //   description: "Pengajuan ditolak karena dokumen persyaratan tertentu tidak lengkap atau tidak sesuai. Mohon perbaiki dan ajukan kembali.",
    // },
  ];
  // const incidents: Incident[] = [
  //   {
  //     id: "1",
  //     title: "SK Kenaikan Pangkat Telah Terbit",
  //     status: "selesai",
  //     date: "Jan 22, 2025 - 09:45 UTC",
  //     description:
  //       "Surat Keputusan (SK) kenaikan pangkat Anda telah resmi diterbitkan oleh BKD Provinsi. Anda dapat mengunduh dokumen SK melalui portal SIKEPANG.",
  //   },
  //   {
  //     id: "2",
  //     title: "Verifikasi Berkas Diterima",
  //     status: "terkirim",
  //     date: "Jan 18, 2025 - 15:20 UTC",
  //     description:
  //       "Seluruh berkas pengajuan kenaikan pangkat telah diterima oleh tim kepegawaian dan sedang menunggu proses verifikasi awal.",
  //   },
  //   {
  //     id: "3",
  //     title: "Proses Penilaian Kinerja",
  //     status: "diproses",
  //     date: "Jan 19, 2025 - 11:10 UTC",
  //     description:
  //       "Tim penilai sedang melakukan evaluasi terhadap dokumen kinerja Anda selama dua tahun terakhir untuk memastikan kelayakan kenaikan pangkat.",
  //   },
  //   {
  //     id: "4",
  //     title: "Pengajuan Telah terkirim",
  //     status: "terkirim",
  //     date: "Jan 20, 2025 - 08:30 UTC",
  //     description:
  //       "Pengajuan kenaikan pangkat ditolak karena salah satu dokumen pendukung (SKP 2023) belum lengkap. Mohon lengkapi berkas dan ajukan kembali.",
  //   },
  //   {
  //     id: "5",
  //     title: "Pengajuan Kenaikan Pangkat Dikirim",
  //     status: "terkirim",
  //     date: "Jan 17, 2025 - 07:55 UTC",
  //     description:
  //       "Pengajuan kenaikan pangkat Anda berhasil dikirim ke sistem BKD Provinsi Sulawesi Tenggara. Menunggu verifikasi tahap awal.",
  //   },
  // ];

  const currentStatus = incidentData.find(
    (item) =>
      `${item.title}`?.toLowerCase() ==
      `${berkas?.data[0]?.status}`?.toLowerCase()
  );

  const findStatus = incidentData?.slice(0, currentStatus?.id + 1);

  if (isLoadingBerkas) return <CekStatusSkeleton />;


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 animate-blink">
            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cek Status</h1>
            <p className="text-sm text-gray-500">
              Pembaruan status layanan secara real-time
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Status */}
        {berkas?.data[0]?.file_sk && (
          <section className="mb-12">
            <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold">Selesai!</h2>
              <p className="text-sm mt-2">SK anda telah keluar.</p>
              <a
                target="_blank"
                href={`${BASE_DOCUMENT}/berkas/${berkas?.data[0]?.file_sk}`}
              >
                <button className="hover:bg-green-400 hover:border-white  hover:text-white capitalize my-5 p-1.5 border-2 border-green-300 rounded-md">
                  unduh SK
                </button>
              </a>
            </div>
          </section>
        )}

        {/* Incident History */}
        <section>
          <h2 className="text-xl font-bold mb-6">Timeline Proses</h2>
          <div className="space-y-6">
            {findStatus?.map((incident) => (
              <div
                key={incident.id}
                className="bg-white border rounded-lg p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-semibold text-lg capitalize">
                    {incident.title}
                  </h3>
                  <span
                    className={`capitalize px-2 py-1 text-xs rounded-full ${colorindicatorStatus(
                      incident.status
                    )}`}
                  >
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{incident.date}</p>
                <p className="text-sm text-gray-700">{incident.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CekStatus;
