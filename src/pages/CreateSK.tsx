import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { DeleteCardModal } from "@/components/DeletingModalCard";
import useDeleteSK from "@/features/SK/useDeleteSK";
import useGetSK from "@/features/SK/useGetSK";
import useCreateSK from "@/features/SK/useCreateSK";
import useUpdateSK from "@/features/SK/useUpdateSK";
import SKSkeleton from "@/components/SKSkeleton";
import { useDataContext } from "@/context/useDataContext";
import { golonganRuang } from "@/utils/helper";

export interface SKInputs {
  tmt_golongan: string;
  masa_gk_bulanan: string;
  golongan_ruang: string;
  masa_gk_tahunan: string;
  nomor_sk: string;
  tanggal_sk: string;
  nomor_pertek_bkn: string;
  tanggal_pertek_bkn: string;
  jenis_kp: string;
  pangkat: string;
  gaji_pokok: number;
}

const CreateSK = () => {
  const { isSubmissionOpen } = useDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onDeleteSK, isDeletingSK } = useDeleteSK();
  const { SK, isLoadingSK } = useGetSK();
  const { onCreateSK, isCreatingSK } = useCreateSK();
  const { onUpdateSK, isUpdatingSK } = useUpdateSK();
  const isLoading = isLoadingSK || isUpdatingSK || isCreatingSK || isDeletingSK;
  const bulanan = SK?.data?.[0]?.masa_gk_bulanan.split("-")[1];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SKInputs>({
    mode: "onChange",
    defaultValues: {
      id: SK?.data?.[0]?.id || "",
      tmt_golongan: SK?.data?.[0]?.tmt_golongan || "",
      masa_gk_bulanan: SK?.data?.[0]?.masa_gk_bulanan || "",
      golongan_ruang: SK?.data?.[0]?.golongan_ruang || "",
      masa_gk_tahunan: SK?.data?.[0]?.masa_gk_tahunan || "",
      nomor_sk: SK?.data?.[0]?.nomor_sk || "",
      tanggal_sk: SK?.data?.[0]?.tanggal_sk || "",
      nomor_pertek_bkn: SK?.data?.[0]?.nomor_pertek_bkn || "",
      tanggal_pertek_bkn: SK?.data?.[0]?.tanggal_pertek_bkn || "",
      jenis_kp: SK?.data?.[0]?.jenis_kp || "",
      gaji_pokok: SK?.data?.[0]?.gaji_pokok || "",
    },
  });

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const onSubmit = async (data: SKInputs) => {
    if (isDataAvailable) {
      const { id } = SK.data[0];
      const newData = { id, ...data };
      onUpdateSK(newData);
    } else {
      const { pangkat } = golonganRuang(data?.golongan_ruang);
      const newData = {
        pangkat,
        ...data,
      };
      onCreateSK(newData);
    }
  };

  const handleReset = () => {
    const { id } = SK.data[0];
    reset();
    onDeleteSK(id);
    setSubmissionStatus(null);
    setIsDataAvailable(false);
  };

  useEffect(() => {
    const available = Boolean(SK?.data[0]);
    setIsDataAvailable(available);
  }, [SK?.data]);

  useEffect(() => {
    const data = SK?.data?.[0] || {};
    reset({
      id: data.id || "",
      tmt_golongan: data.tmt_golongan || "",
      masa_gk_bulanan: data.masa_gk_bulanan || "",
      golongan_ruang: data.golongan_ruang || "",
      masa_gk_tahunan: data.masa_gk_tahunan || "",
      nomor_sk: data.nomor_sk || "",
      tanggal_sk: data.tanggal_sk || "",
      nomor_pertek_bkn: data.nomor_pertek_bkn || "",
      tanggal_pertek_bkn: data.tanggal_pertek_bkn || "",
      jenis_kp: data.jenis_kp || "",
      gaji_pokok: data.gaji_pokok || "",
    });
  }, [SK, reset]);

  if (isLoadingSK) return <SKSkeleton />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <DeleteCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReset}
        cardName={"data diri"}
        cardId={SK?.data[0]?.id}
      />

      <Card className="relative w-full max-w-5xl bg-white/95 backdrop-blur-sm shadow-sm border-0 animate-scale-in">
        <div className="p-8">
          <button
            onClick={() => window.history.back()}
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Formulir SK Pegawai
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Silahkan isi SK Anda dengan lengkap dan benar.
          </p>

          {/* Status Message */}
          {submissionStatus === "success" && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center shadow-md">
              <CheckCircle className="h-6 w-6 mr-3" />
              <p className="font-semibold">Data Berhasil Disimpan!</p>
              <button
                onClick={() => setSubmissionStatus(null)}
                className="ml-auto text-green-700 hover:text-green-900"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* gaji pokok */}
            <div className="space-y-2">
              <Label htmlFor="gaji_pokok">Gaji pokok</Label>
              <Input
                id="gaji_pokok"
                type="number"
                placeholder="1.000.000"
                min={0}
                {...register("gaji_pokok", {
                  required: "Gaji pokok wajib diisi",
                  min: {
                    value: 1,
                    message: "Gaji pokok harus lebih dari 0",
                  },
                })}
              />
              {errors.gaji_pokok && (
                <p className="text-xs text-red-500">
                  {errors.gaji_pokok.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tmt_golongan">TMT Golongan</Label>
              <Input
                id="tmt_golongan"
                type="date"
                {...register("tmt_golongan", {
                  required: "TMT Golongan wajib diisi",
                })}
              />
              {errors.tmt_golongan && (
                <p className="text-xs text-red-500">
                  {errors.tmt_golongan.message}
                </p>
              )}
            </div>

            {/* jenis_kp */}
            <div className="space-y-2">
              <Label htmlFor="jenis_kp" className="capitalize">
                jenis kenaikan pangkat
              </Label>
              <Input
                id="jenis_kp"
                // type="month"
                {...register("jenis_kp", {
                  required: "jenis kenaikan pangkat wajib diisi",
                })}
              />
              {errors.jenis_kp && (
                <p className="text-xs text-red-500">
                  {errors.jenis_kp.message}
                </p>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="masa_gk_bulanan">
                Masa Kerja Golongan (Bulan)
              </Label>
              <Input
                id="masa_gk_bulanan"
                type="month"
                {...register("masa_gk_bulanan", {
                  required: "Masa kerja golongan (bulan) wajib diisi",
                })}
              />
              {errors.masa_gk_bulanan && (
                <p className="text-xs text-red-500">
                  {errors.masa_gk_bulanan.message}
                </p>
              )}
            </div> */}

            {/* bulanan testing  */}
           <div className="space-y-2">
  <Label htmlFor="masa_gk_bulanan">Masa Kerja Golongan (Bulan)</Label>
  <Controller
    control={control}
    name="masa_gk_bulanan"
    rules={{ required: "Masa kerja golongan (bulan) wajib diisi" }}
    render={({ field }) => (
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger id="masa_gk_bulanan">
          <SelectValue placeholder="Pilih bulan" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(13)].map((_, i) => (
            <SelectItem key={i} value={(i).toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  />
  {errors.masa_gk_bulanan && (
    <p className="text-xs text-red-500">
      {errors.masa_gk_bulanan.message}
    </p>
  )}
</div>

            {/* golongan ruang */}
            <div className="space-y-2">
              <Label htmlFor="golongan_ruang">Golongan/Ruang</Label>
              <Controller
                control={control}
                name="golongan_ruang"
                rules={{ required: "Golongan/Ruang wajib diisi" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="golongan_ruang">
                      <SelectValue placeholder="Pilih golongan" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "I/A",
                        "I/B",
                        "I/C",
                        "I/D",
                        "II/A",
                        "II/B",
                        "II/C",
                        "II/D",
                        "III/A",
                        "III/B",
                        "III/C",
                        "III/D",
                        "IV/A",
                        "IV/B",
                        "IV/C",
                        "IV/D",
                        "IV/E",
                      ].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.golongan_ruang && (
                <p className="text-xs text-red-500">
                  {errors.golongan_ruang.message}
                </p>
              )}
            </div>

            {/* Masa Kerja Golongan (Tahun) */}
            <div className="space-y-2">
              <Label htmlFor="masa_gk_tahunan">
                Masa Kerja Golongan (Tahun)
              </Label>
              <Input
                id="masa_gk_tahunan"
                type="number"
                {...register("masa_gk_tahunan", {
                  required: "Masa kerja golongan (tahun) wajib diisi",
                  min: { value: 0, message: "Harus angka positif" },
                })}
              />
              {errors.masa_gk_tahunan && (
                <p className="text-xs text-red-500">
                  {errors.masa_gk_tahunan.message}
                </p>
              )}
            </div>

            {/* Nomor SK */}
            <div className="space-y-2">
              <Label htmlFor="nomor_sk">Nomor SK</Label>
              <Input
                id="nomor_sk"
                placeholder="Nomor Surat Keputusan"
                {...register("nomor_sk", { required: "Nomor SK wajib diisi" })}
              />
              {errors.nomor_sk && (
                <p className="text-xs text-red-500">
                  {errors.nomor_sk.message}
                </p>
              )}
            </div>

            {/* Tanggal SK */}
            <div className="space-y-2">
              <Label htmlFor="tanggal_sk">Tanggal SK</Label>
              <Input
                id="tanggal_sk"
                type="date"
                {...register("tanggal_sk", {
                  required: "Tanggal SK wajib diisi",
                })}
              />
              {errors.tanggal_sk && (
                <p className="text-xs text-red-500">
                  {errors.tanggal_sk.message}
                </p>
              )}
            </div>

            {/* Nomor Pertek BKN */}
            <div className="space-y-2">
              <Label htmlFor="nomor_pertek_bkn">Nomor Pertek BKN</Label>
              <Input
                id="nomor_pertek_bkn"
                placeholder="Nomor Pertek BKN"
                {...register("nomor_pertek_bkn", {
                  required: "Nomor Pertek BKN wajib diisi",
                })}
              />
              {errors.nomor_pertek_bkn && (
                <p className="text-xs text-red-500">
                  {errors.nomor_pertek_bkn.message}
                </p>
              )}
            </div>

            {/* Tanggal Pertek BKN */}
            <div className="space-y-2">
              <Label htmlFor="tanggal_pertek_bkn">Tanggal Pertek BKN</Label>
              <Input
                id="tanggal_pertek_bkn"
                type="date"
                {...register("tanggal_pertek_bkn", {
                  required: "Tanggal Pertek BKN wajib diisi",
                })}
              />
              {errors.tanggal_pertek_bkn && (
                <p className="text-xs text-red-500">
                  {errors.tanggal_pertek_bkn.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            {/* {isSubmissionOpen() && ( */}
            <div className="flex gap-4 mt-8 md:col-span-2 lg:col-span-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-48"
              >
                {isSubmitting
                  ? "Memproses..."
                  : isDataAvailable
                  ? "Update Data"
                  : "Simpan Data"}
              </Button>

              {SK?.data?.length ? (
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="destructive"
                  disabled={isLoading}
                  className="w-full sm:w-48"
                >
                  Reset
                </Button>
              ) : null}
            </div>
            {/* )} */}
          </form>

          {/* Display Submitted Data */}
          {isLoading && submissionStatus === "success" && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Data Tersimpan:
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words text-sm">
                  {JSON.stringify(isLoading, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateSK;
