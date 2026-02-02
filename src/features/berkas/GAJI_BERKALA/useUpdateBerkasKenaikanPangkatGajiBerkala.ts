import { UPDATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API } from "@/services/Berkas/GAJI_BERKALA/BERKAS_GAJI_BERKALA_API";
import { UPDATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { UPDATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API } from "@/services/Berkas/PANGKAT_TERAKHIR/BERKAS_PANGKAT_TERAKHIR_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkasKenaikanPangkatGajiBerkala() {
  //    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onUpdateBerkasKenaikanPangkatGajiBerkala,
    isPending: isUpdatingBerkasKenaikanPangkatGajiBerkala,
  } = useMutation({
    mutationFn: UPDATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API,
    onSuccess: () => {
      toast.success("Berhasil Edit");
      //  navigate('/berkas')
      queryClient.invalidateQueries({ queryKey: ["gaji-berkala"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });

  return {
    onUpdateBerkasKenaikanPangkatGajiBerkala,
    isUpdatingBerkasKenaikanPangkatGajiBerkala,
  };
}
export default useUpdateBerkasKenaikanPangkatGajiBerkala;
