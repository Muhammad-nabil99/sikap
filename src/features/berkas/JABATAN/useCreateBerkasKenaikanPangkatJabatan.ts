import { CREATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBerkasKenaikanPangkatJabatan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onCreateBerkasKenaikanPangkatJabatan,
    isPending: isCreatingBerkasKenaikanPangkatJabatan,
  } = useMutation({
    mutationFn: CREATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      // navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["jabatan"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return {
    onCreateBerkasKenaikanPangkatJabatan,
    isCreatingBerkasKenaikanPangkatJabatan,
  };
}
export default useCreateBerkasKenaikanPangkatJabatan;
