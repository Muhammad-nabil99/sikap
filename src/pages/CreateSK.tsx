import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  XCircle,
  ArrowLeft,
  Save,
  RotateCcw,
  FileText,
  ShieldCheck,
  Banknote,
  Info,
  AlertCircle,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { CAN_I_UPLOAD } from "@/utils/helper";
import useUpdateStatus from "@/features/status/useUpdateStatus";
import useGetStatus from "@/features/status/useGetStatus";

// Fixed TypeScript interfaces
interface FormData {
  golongan_ruang: string;
  pangkat: string;
  gaji_pokok: number;
  nomor_sk: string;
  tanggal_sk: string;
  tmt_golongan: string;
  jenis_kp?: string;
  nomor_pertek_bkn?: string;
  tanggal_pertek_bkn?: string;
  kgb_terakhir?: string;
  masa_gk_bulanan: string;
  masa_gk_tahunan: number;
}

interface FormSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

interface ErrorMessageProps {
  message?: string;
}

const CreateSK: React.FC = () => {
  const { CAN_UPLOAD } = CAN_I_UPLOAD();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onDeleteSK, isDeletingSK } = useDeleteSK();
  const { SK, isLoadingSK } = useGetSK();
  const { onCreateSK, isCreatingSK } = useCreateSK();
  const { onUpdateSK, isUpdatingSK } = useUpdateSK();

  const isLoading = isLoadingSK || isUpdatingSK || isCreatingSK || isDeletingSK;
  const isDataAvailable = Boolean(SK?.data?.[0]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      golongan_ruang: "",
      pangkat: "",
      gaji_pokok: 0,
      nomor_sk: "",
      tanggal_sk: "",
      tmt_golongan: "",
      jenis_kp: "",
      nomor_pertek_bkn: "",
      tanggal_pertek_bkn: "",
      kgb_terakhir: "",
      masa_gk_bulanan: "0",
      masa_gk_tahunan: 0,
    },
  });

  useEffect(() => {
    if (SK?.data?.[0]) {
      const data = SK.data[0];

      // Gunakan reset untuk mengisi form saat data tersedia
      reset({
        golongan_ruang: data.golongan_ruang || "",
        pangkat: data.pangkat || "",
        gaji_pokok: Number(data.gaji_pokok) || 0,
        nomor_sk: data.nomor_sk || "",
        tanggal_sk: data.tanggal_sk || "",
        tmt_golongan: data.tmt_golongan || "",
        jenis_kp: data.jenis_kp || "",
        nomor_pertek_bkn: data.nomor_pertek_bkn || "",
        tanggal_pertek_bkn: data.tanggal_pertek_bkn || "",
        kgb_terakhir: data.kgb_terakhir || "",
        masa_gk_bulanan: String(data.masa_gk_bulanan ?? "0"),
        masa_gk_tahunan: Number(data.masa_gk_tahunan) || 0,
      });
    }
  }, [SK, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      masa_gk_bulanan: String(data.masa_gk_bulanan),
    };

    isDataAvailable
      ? onUpdateSK({ id: SK.data[0].id, ...payload })
      : onCreateSK(payload);

  };

  if (isLoadingSK) return <SKSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32 md:pb-8">
      <div className="max-w-5xl mx-auto py-6 px-4 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <DeleteCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            onDeleteSK(SK.data[0].id);
            setIsModalOpen(false);
          }}
          cardName="Data SK"
        />

        {/* TOP NAVIGATION & STATUS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Button
            variant="default"
            onClick={() => window.history.back()}
            className="w-fit -ml-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit text-[11px] font-bold uppercase tracking-wider",
              isDataAvailable
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200",
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isDataAvailable ? "bg-amber-500" : "bg-emerald-500",
              )}
            />
            {isDataAvailable ? "edit" : "Data Baru"}
          </div>
        </div>

        {/* HEADER SECTION */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Formulir SK Pegawai
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Pastikan data yang dimasukkan sesuai dengan dokumen fisik SK Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUMN 1: PANGKAT */}
            <div className="lg:col-span-1">
              <FormSection title="Golongan & Gaji" icon={Banknote}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Golongan/Ruang
                    </Label>
                    <Controller
                      control={control}
                      name="golongan_ruang"
                      rules={{ required: "Wajib dipilih" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-11 bg-slate-50/50">
                            <SelectValue placeholder="Pilih Golongan" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Ia",
                              "Ib",
                              "Ic",
                              "Id",
                              "IIa",
                              "IIb",
                              "IIc",
                              "IId",
                              "IIIa",
                              "IIIb",
                              "IIIc",
                              "IIId",
                              "IVa",
                              "IVb",
                              "IVc",
                              "IVd",
                              "IVe",
                            ].map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage message={errors.golongan_ruang?.message} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Pangkat
                    </Label>
                    <Input
                      className="h-11 bg-slate-50/50"
                      placeholder="Contoh: Penata Muda"
                      {...register("pangkat", { required: "Wajib diisi" })}
                    />
                    <ErrorMessage message={errors.pangkat?.message} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Gaji Pokok (SK terakhir)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                        Rp
                      </span>
                      <Input
                        type="number"
                        className="h-11 pl-10 bg-slate-50/50"
                        {...register("gaji_pokok", {
                          required: "Wajib diisi",
                          valueAsNumber: true,
                          min: {
                            value: 1,
                            message: "gaji pokok tidak boleh 0",
                          },
                        })}
                      />
                    </div>
                    <ErrorMessage message={errors.gaji_pokok?.message} />
                  </div>
                </div>
              </FormSection>
            </div>

            {/* COLUMN 2 & 3: DETAILS */}
            <div className="lg:col-span-2 space-y-6">
              <FormSection title="Informasi Surat Keputusan" icon={FileText}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Nomor SK
                    </Label>
                    <Input
                      className="h-11 bg-slate-50/50"
                      {...register("nomor_sk", {
                        required: "Nomor SK wajib diisi",
                      })}
                    />
                    <ErrorMessage message={errors.nomor_sk?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Tanggal SK
                    </Label>
                    <Input
                      type="date"
                      className="h-11 bg-slate-50/50"
                      {...register("tanggal_sk", { required: "Wajib diisi" })}
                    />
                    <ErrorMessage message={errors.tanggal_sk?.message} />
                  </div>
                  {/* testing */}
                  <div
                    className={cn(
                      "space-y-2 relative rounded-xl transition-all duration-300",
                      !CAN_UPLOAD &&
                        "p-4 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-2 border-red-300 shadow-lg shadow-red-100",
                    )}
                  >
                    {/* Animated corner badge */}
                    {!CAN_UPLOAD && (
                      <div className="absolute -top-3 -right-3 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
                          <div className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white text-[9px] font-extrabold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 animate-bounce">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>
                            <AlertCircle className="w-3 h-3 relative" />
                            WAJIB UPDATE
                          </div>
                        </div>
                      </div>
                    )}

                    <Label
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-wide flex items-center gap-2",
                        !CAN_UPLOAD ? "text-red-700" : "text-slate-400",
                      )}
                    >
                      TMT Golongan
                      {!CAN_UPLOAD && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[9px]">
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
                          Required
                        </span>
                      )}
                    </Label>

                    <div className="relative group">
                      {/* ✅ FIXED: Glowing border effect moved BEHIND with pointer-events-none */}
                      {!CAN_UPLOAD && (
                        <>
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 blur-lg opacity-30 animate-pulse rounded-lg pointer-events-none"></div>
                          <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity pointer-events-none"></div>
                        </>
                      )}

                      {/* ✅ Input is now on top and clickable */}
                      <Input
                        type="date"
                        className={cn(
                          "h-11 transition-all duration-300 relative z-10",
                          !CAN_UPLOAD
                            ? "bg-white border-2 border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100 shadow-md"
                            : "bg-slate-50/50 border-slate-200",
                        )}
                        {...register("tmt_golongan", {
                          required: "Wajib diisi",
                        })}
                      />
                    </div>

                    {!CAN_UPLOAD && (
                      <div className="flex items-start gap-2.5 p-3 bg-white/80 backdrop-blur-sm border border-red-200 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-xs font-bold text-red-900">
                            ⚠️ Perlu Diperbarui
                          </p>
                          <p className="text-[11px] text-red-700 leading-relaxed">
                            TMT Golongan harus diisi terlebih dahulu sebelum
                            dapat mengunggah dokumen.
                          </p>
                        </div>
                      </div>
                    )}

                    <ErrorMessage message={errors.tmt_golongan?.message} />
                  </div>
                  {/* end testing */}
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Jenis Kenaikan Pangkat
                    </Label>
                    <Input
                      className="h-11 bg-slate-50/50"
                      {...register("jenis_kp", { required: "Wajib diisi" })}
                    />
                    <ErrorMessage message={errors.jenis_kp?.message} />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Data Verifikasi BKN" icon={ShieldCheck}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Nomor Pertek BKN
                    </Label>
                    <Input
                      className="h-11 bg-slate-50/50 font-mono text-sm"
                      {...register("nomor_pertek_bkn", {
                        required: "Wajib diisi",
                      })}
                    />
                    <ErrorMessage message={errors.nomor_pertek_bkn?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      Tanggal Pertek
                    </Label>
                    <Input
                      type="date"
                      className="h-11 bg-slate-50/50"
                      {...register("tanggal_pertek_bkn", {
                        required: "Wajib diisi",
                      })}
                    />
                    <ErrorMessage
                      message={errors.tanggal_pertek_bkn?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-slate-400">
                      KGB Terakhir
                    </Label>
                    <Input
                      type="date"
                      className="h-11 bg-slate-50/50"
                      {...register("kgb_terakhir", { required: "Wajib diisi" })}
                    />
                    <ErrorMessage message={errors.kgb_terakhir?.message} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                    <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                      {/* Field: Masa Kerja (Tahun) */}
                      <div className="space-y-2">
                        <Label className="text-[11px] font-bold uppercase text-slate-400 text-nowrap">
                          Masa Kerja (Thn)
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          className="h-11 bg-slate-50/50"
                          {...register("masa_gk_tahunan", {
                            required: "Wajib diisi", // Adds the "not empty" check
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message:
                                "Masa kerja tidak boleh kurang dari 0 tahun",
                            },
                          })}
                        />
                        {/* Corrected to match the name "masa_gk_tahunan" */}
                        <ErrorMessage
                          message={errors.masa_gk_tahunan?.message}
                        />
                      </div>

                      {/* Field: Masa Kerja (Bulan) */}
                      <div className="space-y-2">
                        <Label className="text-[11px] font-bold uppercase text-slate-400 text-nowrap">
                          Masa Kerja (Bln)
                        </Label>
                        <Controller
                          control={control}
                          name="masa_gk_bulanan"
                          rules={{ required: "Wajib diisi" }}
                          render={({ field }) => (
                            <Select
                              value={field.value?.toString() ?? "0"}
                              onValueChange={(value) => {
                                console.log("value", value); // Changed from Number(value)
                                field.onChange(value); // Store as string, not Number
                              }}
                              onOpenChange={(open) => {
                                if (open) {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            >
                              <SelectTrigger className="h-11 bg-slate-50/50">
                                <SelectValue placeholder="Pilih bulan" />
                              </SelectTrigger>
                              <SelectContent
                                position="popper"
                                className="max-h-60 overflow-y-auto z-50"
                              >
                                {[...Array(13)].map((_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {" "}
                                    {/* Changed from i.toFixed() */}
                                    {i} bulan {/* Better display */}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {/* Added the ErrorMessage which was missing for this field in your snippet */}
                        <ErrorMessage
                          message={errors.masa_gk_bulanan?.message}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          </div>

          {/* ACTION BAR: Responsive Layout */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-4 md:relative md:bg-transparent md:border-0 md:p-0 md:flex md:justify-end z-50">
            <div className="flex flex-col-reverse sm:flex-row gap-3 max-w-5xl mx-auto w-full md:w-fit md:mx-0">
              {isDataAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                  className="h-12 md:h-11 rounded-xl text-red-600 border-red-100 hover:bg-red-600 flex-1 sm:flex-none"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Hapus & Reset
                </Button>
              )}

              <Button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="h-12 md:h-11 bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-xl shadow-xl shadow-blue-100 flex-1 sm:flex-none transition-all active:scale-95"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-bold tracking-wide">
                    <Save className="w-4 h-4" />
                    {isDataAvailable ? "PERBARUI DATA" : "SIMPAN DATA"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Clean UI Components ---
const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  children,
}) => (
  <Card className="p-5 md:p-6 border-slate-200/60 shadow-sm bg-white ring-1 ring-slate-100/50">
    <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
      <div className="p-2.5 bg-blue-50/80 rounded-xl text-blue-600">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-slate-800 text-sm md:text-base tracking-tight">
        {title}
      </h3>
    </div>
    {children}
  </Card>
);

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-600 animate-in fade-in slide-in-from-top-1">
      <Info className="w-3 h-3" />
      <span className="text-[10px] font-bold uppercase">{message}</span>
    </div>
  );
};

export default CreateSK;
