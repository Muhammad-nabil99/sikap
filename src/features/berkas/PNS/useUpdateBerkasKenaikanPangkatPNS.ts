import { UPDATE_BERKAS_KENAIKAN_PANGKAT_PNS_API } from "@/services/Berkas/PNS/BERKAS_PNS_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkasKenaikanPangkatPNS() {
  //    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onUpdateBerkasKenaikanPangkatPNS,
    isPending: isUpdatingBerkasKenaikanPangkatPNS,
  } = useMutation({
    mutationFn: UPDATE_BERKAS_KENAIKAN_PANGKAT_PNS_API,
    onSuccess: () => {
      toast.success("Berhasil Edit");
      //  navigate('/berkas')
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });

  return {
    onUpdateBerkasKenaikanPangkatPNS,
    isUpdatingBerkasKenaikanPangkatPNS,
  };
}
export default useUpdateBerkasKenaikanPangkatPNS;
