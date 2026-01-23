import { UPDATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { UPDATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API } from "@/services/Berkas/PANGKAT_TERAKHIR/BERKAS_PANGKAT_TERAKHIR_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkasKenaikanPangkatJabatan() {
  //    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onUpdateBerkasKenaikanPangkatJabatan,
    isPending: isUpdatingBerkasKenaikanPangkatJabatan,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      UPDATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API(id, formData),
    onSuccess: () => {
      toast.success("Berhasil Edit");
      //  navigate('/berkas')
      queryClient.invalidateQueries({ queryKey: ["jabatan"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });

  return {
    onUpdateBerkasKenaikanPangkatJabatan,
    isUpdatingBerkasKenaikanPangkatJabatan,
  };
}
export default useUpdateBerkasKenaikanPangkatJabatan;
