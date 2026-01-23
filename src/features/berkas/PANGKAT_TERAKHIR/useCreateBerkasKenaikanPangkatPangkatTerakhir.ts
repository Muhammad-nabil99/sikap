import { CREATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API } from "@/services/Berkas/PANGKAT_TERAKHIR/BERKAS_PANGKAT_TERAKHIR_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBerkasKenaikanPangkatPangkatTerakhir() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onCreateBerkasKenaikanPangkatPangkatTerakhir,
    isPending: isCreatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useMutation({
    mutationFn: CREATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      // navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["pangkat-terakhir"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return {
    onCreateBerkasKenaikanPangkatPangkatTerakhir,
    isCreatingBerkasKenaikanPangkatPangkatTerakhir,
  };
}
export default useCreateBerkasKenaikanPangkatPangkatTerakhir;
