import useCreateBerkas from "@/features/berkas/useCreateBerkas";
import useCreateKP from "@/features/berkas/useCreateBerkas";
import useGetBerkas from "@/features/berkas/useGetDataBerkas";
import useGetDataKP from "@/features/berkas/useGetDataBerkas";
import useUpdateBerkas from "@/features/berkas/useUpdateBerkas";
import useUpdateKP from "@/features/berkas/useUpdateBerkas";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export type FormInputs = {
  sk_cpns: FileList | string;
  sk_pns: FileList | string;
  sk_gaji_berkala: FileList | string;
  sk_pangkat_terakhir: FileList | string;
  sk_jabatan: FileList | string;
};

function CreateBerkas({ berkas, isOpen, setOpen }) {
  const modalRef = useRef<HTMLFormElement | null>(null);
  const isUpdating = Boolean(berkas);
  const { onCreateBerkas, isCreatingBerkas } = useCreateBerkas();
  const { onUpdateBerkas, isUpdatingBerkas } = useUpdateBerkas();
  const { berkas: getBerkas, isLoadingBerkas } = useGetBerkas();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  function handleSubmitDataKP(data: FormInputs) {
    if (isUpdating) {
      const formData = new FormData();
      if (data.sk_cpns instanceof FileList && data.sk_cpns.length > 0)
        formData.append("sk_cpns", data.sk_cpns[0]);
      if (data.sk_pns instanceof FileList && data.sk_pns.length > 0)
        formData.append("sk_pns", data.sk_pns[0]);
      if (
        data.sk_gaji_berkala instanceof FileList &&
        data.sk_gaji_berkala.length > 0
      )
        formData.append("sk_gaji_berkala", data.sk_gaji_berkala[0]);
      if (
        data.sk_pangkat_terakhir instanceof FileList &&
        data.sk_pangkat_terakhir.length > 0
      )
        formData.append("sk_pangkat_terakhir", data.sk_pangkat_terakhir[0]);
      if (data.sk_jabatan instanceof FileList && data.sk_jabatan.length > 0)
        formData.append("sk_jabatan", data.sk_jabatan[0]);
      onUpdateBerkas({ id: berkas?.data[0].id, formData });
      return;
    }

    const formData = new FormData();
    formData.append("sk_cpns", data.sk_cpns[0]);
    formData.append("sk_pns", data.sk_pns[0]);
    formData.append("sk_gaji_berkala", data.sk_gaji_berkala[0]);
    formData.append("sk_pangkat_terakhir", data.sk_pangkat_terakhir[0]);
    formData.append("sk_jabatan", data.sk_jabatan[0]);
    onCreateBerkas(formData);
  }

  const isLoading = isCreatingBerkas || isLoadingBerkas || isUpdatingBerkas;

  return (
    <div
      className={`min-h-screen p-2 sm:p-2 bg-gray-50 flex items-start justify-center`}
    >
      <form
        ref={modalRef}
        onSubmit={handleSubmit(handleSubmitDataKP)}
        className="w-full max-w-3xl bg-white p-2 sm:p-2 rounded-2xl shadow-sm border border-gray-100/80"
      >
        <header className="mb-10 text-center">
          {!isOpen && (
            <div className="flex items-center justify-between">
              <Link
                to="/berkas"
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
              </Link>
            </div>
          )}

          {!isOpen ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                Data Kenaikan Pangkat
              </h2>
              <p className="text-gray-500 mt-2">
                Mohon unggah dokumen yang dibutuhkan untuk proses pengajuan.
              </p>
            </>
          ) : (
            <h2 className="capitalize text-3xl sm:text-4xl font-extrabold text-gray-800">
              Edit Berkas
            </h2>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group border-2 border-dashed border-gray-300 rounded-xl p-4 transition duration-300 hover:border-blue-500 hover:bg-blue-50/50">
            <label
              htmlFor="sk-pangkat-terakhir"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-700"
            >
              SK Pangkat Terakhir
            </label>
            <input
              type="file"
              {...register("sk_pangkat_terakhir", {
                required:
                  !isUpdating && "SK pangkat terakhir tidak boleh kosong",
              })}
              id="sk-pangkat-terakhir"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition duration-300"
            />
            {errors.sk_pangkat_terakhir && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.sk_pangkat_terakhir.message)}
              </p>
            )}
          </div>

          {/* SK CPNS */}
          <div className="group border-2 border-dashed border-gray-300 rounded-xl p-4 transition duration-300 hover:border-blue-500 hover:bg-blue-50/50">
            <label
              htmlFor="sk-cpns"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-700"
            >
              SK CPNS
            </label>
            <input
              type="file"
              {...register("sk_cpns", {
                required: !isUpdating && "SK CPNS tidak boleh kosong",
              })}
              id="sk-cpns"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition duration-300"
            />
            {errors.sk_cpns && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.sk_cpns.message)}
              </p>
            )}
          </div>

          {/* SK PNS */}
          <div className="group border-2 border-dashed border-gray-300 rounded-xl p-4 transition duration-300 hover:border-blue-500 hover:bg-blue-50/50">
            <label
              htmlFor="sk-pns"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-700"
            >
              SK PNS
            </label>
            <input
              type="file"
              {...register("sk_pns", {
                required: !isUpdating && "SK PNS tidak boleh kosong",
              })}
              id="sk-pns"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition duration-300"
            />
            {errors.sk_pns && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.sk_pns.message)}
              </p>
            )}
          </div>

          {/* SK Gaji Berkala */}
          <div className="group border-2 border-dashed border-gray-300 rounded-xl p-4 transition duration-300 hover:border-blue-500 hover:bg-blue-50/50">
            <label
              htmlFor="sk-gaji-berkala"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-700"
            >
              SK Gaji Berkala
            </label>
            <input
              type="file"
              {...register("sk_gaji_berkala", {
                required: !isUpdating && "SK gaji berkala tidak boleh kosong",
              })}
              id="sk-gaji-berkala"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition duration-300"
            />
            {errors.sk_gaji_berkala && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.sk_gaji_berkala.message)}
              </p>
            )}
          </div>

          {/* SK Jabatan */}
          <div className="md:col-span-2 group border-2 border-dashed border-gray-300 rounded-xl p-4 transition duration-300 hover:border-blue-500 hover:bg-blue-50/50">
            <label
              htmlFor="sk-jabatan"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-700"
            >
              SK Jabatan (Struktural / Non-Struktural)
            </label>
            <input
              type="file"
              {...register("sk_jabatan", {
                required: !isUpdating && "SK jabatan tidak boleh kosong",
              })}
              id="sk-jabatan"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition duration-300"
            />
            {errors.sk_jabatan && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.sk_jabatan.message)}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="capitalize w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg 
                     bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 
                     hover:from-blue-700 hover:via-blue-600 hover:to-blue-500
                     focus:outline-none focus:ring-4 focus:ring-blue-300 
                     transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          {isLoading ? "mengirim..." : isUpdating ? "edit" : "buat"}
        </button>
      </form>
    </div>
  );
}

export default CreateBerkas;
