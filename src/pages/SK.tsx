import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, PlusCircle, XCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 ">
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

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="capitalize text-3xl font-bold text-gray-900">
            data pegawai
          </h1>
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>

        <Separator className="mb-6" />

        

        {/* 🔹 Detail SK */}
        <section className="mt-10 space-y-4">
          <p className="capitalize">pangkat / golongan ruang / TMT</p>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {displayFields1.map((item, i) => (
              <div key={i}>
                <p
                  className={`text-gray-900 font-semibold text-sm sm:text-base`}
                >
                  {item.value || "-"}{" "}
                  {item.label.toLowerCase() === "tmt" ? "" : "/"}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-gray-700">
            {displayFields.map((item, i) => (
              <div key={i}>
                <p className="text-gray-600 font-medium capitalize">
                  {item.label}
                </p>
                <p className="text-gray-900 font-semibold ">
                  {item.value || "-"}
                </p>
              </div>
            ))}

            {/* Pangkat */}
            <div>
              <p className="text-gray-600 font-medium">Pangkat</p>
              <p className="text-gray-900 font-semibold capitalize">
                {namaPangkat || detailData.pangkat || "-"}
              </p>
            </div>

            {/* Gaji Pokok */}
            {detailData.gaji_pokok > 0 && (
              <div>
                <p className="text-gray-600 font-medium">Gaji Pokok</p>
                <p className="text-gray-900 font-semibold capitalize">
                  Rp. {detailData.gaji_pokok.toLocaleString("id-ID")}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* <Separator className="my-8" />
        <p className="text-sm text-gray-500 text-center">
          Data diambil dari sistem kepegawaian Provinsi Sulawesi Tenggara.
        </p> */}
      </div>
    </div>
  );
};

export default SK;
