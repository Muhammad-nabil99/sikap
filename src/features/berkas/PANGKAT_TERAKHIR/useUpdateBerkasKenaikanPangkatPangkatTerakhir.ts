import { UPDATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API } from "@/services/Berkas/PANGKAT_TERAKHIR/BERKAS_PANGKAT_TERAKHIR_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkasKenaikanPangkatPangkatTerakhir() {
  //    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onUpdateBerkasKenaikanPangkatPangkatTerakhir,
    isPending: isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useMutation({
    mutationFn: UPDATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API,
    onSuccess: () => {
      toast.success("Berhasil Edit");
      //  navigate('/berkas')
      queryClient.invalidateQueries({ queryKey: ["pangkat-terakhir"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });

  return {
    onUpdateBerkasKenaikanPangkatPangkatTerakhir,
    isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
  };
}
export default useUpdateBerkasKenaikanPangkatPangkatTerakhir;
