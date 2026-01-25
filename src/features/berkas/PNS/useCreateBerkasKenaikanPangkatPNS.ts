import { CREATE_BERKAS_KENAIKAN_PANGKAT_PNS_API } from "@/services/Berkas/PNS/BERKAS_PNS_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBerkasKenaikanPangkatPNS() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onCreateBerkasKenaikanPangkatPNS,
    isPending: isCreatingBerkasKenaikanPangkatPNS,
  } = useMutation({
    mutationFn: CREATE_BERKAS_KENAIKAN_PANGKAT_PNS_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      // navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return {
    onCreateBerkasKenaikanPangkatPNS,
    isCreatingBerkasKenaikanPangkatPNS,
  };
}
export default useCreateBerkasKenaikanPangkatPNS;
