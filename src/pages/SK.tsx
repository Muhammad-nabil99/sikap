import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  PlusCircle, XCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import useGetSK from "@/features/SK/useGetSK";
import SKSkeleton from "@/components/SKSkeleton";
import {
  golonganRuang,
} from "@/utils/helper";

export interface SKData {
  id: number;
  tmt_golongan: string;
  masa_gk_bulanan: string;
  golongan_ruang: string;
  masa_gk_tahunan: number;
  nomor_sk: string;
  tanggal_sk: string;
  nomor_pertek_bkn: string;
  tanggal_pertek_bkn: string;
  jenis_kp: string;
  pangkat: string;
  gaji_pokok: number;
  pegawai: {
    id: number;
    nama: string;
    email: string;
    nip: string;
    agama: string;
    jabatan: string;
  };
}

const SK = () => {
  const { SK, isLoadingSK } = useGetSK();

  if (isLoadingSK) return <SKSkeleton />;

  const detailData: SKData | undefined = SK?.data?.[0];
  const { pangkat: namaPangkat } = golonganRuang(detailData?.golongan_ruang);


  if (!detailData) {
    return (
      <>
        <div className="w-full flex justify-end">
          <NavLink to={"/sk/tambah"}>
            <Button
              className={cn(
                "bg-blue-600 m-auto capitalize w-fit my-2 gap-2 shadow-md hover:shadow-lg transition-all font-semibold"
              )}
            >
              {SK?.data?.length ? "Edit" : "Tambahkan"}
              <PlusCircle />
            </Button>
          </NavLink>
        </div>

        <div className="flex items-center justify-center p-6">
          <Card className="p-8 w-full max-w-xl text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h1 className="capitalize text-2xl font-bold text-gray-900 mb-2">
              Data Belum Diisi
            </h1>
            <p className="text-gray-600">
              Tidak ada data SK Kenaikan Pangkat yang ditemukan.
            </p>
          </Card>
        </div>
      </>
    );
  }
  const displayFields1 = [
    {
      label: "Pangkat",
      value: namaPangkat || detailData.pangkat || "-",
    },
    {
      label: "Golongan Ruang",
      value: `${detailData.golongan_ruang}`
        .split("/")
        .map((item, index) =>
          index == item?.length - 1 ? item : `${item}`.toLowerCase()
        )
        .join("/"),
    },
    { label: "TMT", value: detailData.tmt_golongan },
  ];
  const displayFields = [
    { label: "Jenis KP", value: detailData.jenis_kp },
    {
      label: "Masa Kerja Golongan",
      value: `${detailData.masa_gk_tahunan} tahun ${
        new Date(detailData.masa_gk_bulanan).getMonth() + 1
      } bulan`,
    },

    { label: "Nomor SK", value: detailData.nomor_sk },
    { label: "Tanggal SK", value: detailData.tanggal_sk },
    { label: "Nomor Pertek BKN", value: detailData.nomor_pertek_bkn },
    { label: "Tanggal Pertek BKN", value: detailData.tanggal_pertek_bkn },
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  
  <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-200 rounded-2xl p-8 md:p-10">
    
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b-2 border-gray-200 mb-6">
      <div>
        <h1 className="font-bold text-3xl text-gray-800 mb-1 capitalize">
          Data SK
        </h1>
        <p className="text-gray-500 text-sm">
          Informasi Surat Keputusan Pegawai
        </p>
      </div>

      <NavLink to={"/sk/tambah"}>
        <Button
          className={cn(
            "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
            "text-white px-6 py-2.5 rounded-lg",
            "shadow-md hover:shadow-xl transition-all duration-300",
            "font-semibold flex items-center gap-2",
            "transform hover:-translate-y-0.5 active:translate-y-0 capitalize"
          )}
        >
          <PlusCircle className="w-5 h-5" />
          <span>{SK?.data?.length ? "Edit" : "Tambahkan"}</span>
        </Button>
      </NavLink>
    </div>

    {/* Pangkat/Golongan/TMT Section */}
    <section className="space-y-4 mb-8">
      <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
        Pangkat / Golongan Ruang / TMT
      </p>
      <div className="flex flex-wrap gap-x-2 gap-y-1 bg-white rounded-xl p-4 border border-gray-200">
        {displayFields1.map((item, i) => (
          <div key={i}>
            <p className="text-gray-900 font-semibold text-base sm:text-lg">
              {item.value || "-"}{" "}
              {item.label.toLowerCase() === "tmt" ? "" : "/"}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Detail SK Grid */}
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
        {displayFields.map((item, i) => (
          <div 
            key={i}
            className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2 ">
              {item.label}
            </p>
            <p className="text-gray-900 font-semibold text-base break-words">
              {item.value || (
                <span className="text-gray-400 italic">Tidak ada data</span>
              )}
            </p>
          </div>
        ))}

        {/* Pangkat */}
        {/* <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">
            Pangkat
          </p>
          <p className="text-gray-900 font-semibold text-base capitalize break-words">
            {namaPangkat || detailData.pangkat || (
              <span className="text-gray-400 italic">Tidak ada data</span>
            )}
          </p>
        </div> */}

        {/* Gaji Pokok */}
        {detailData.gaji_pokok > 0 && (
          <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">
              Gaji Pokok
            </p>
            <p className="text-gray-900 font-semibold text-base break-words">
              Rp. {detailData.gaji_pokok.toLocaleString("id-ID")}
            </p>
          </div>
        )}
      </div>
    </section>

  </div>
</div>
  );
};

export default SK;
