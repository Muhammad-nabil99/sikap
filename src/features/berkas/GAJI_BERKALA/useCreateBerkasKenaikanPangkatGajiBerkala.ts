import { CREATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API } from "@/services/Berkas/GAJI_BERKALA/BERKAS_GAJI_BERKALA_API";
import { CREATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBerkasKenaikanPangkatGajiBerkala() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: onCreateBerkasKenaikanPangkatGajiBerkala,
    isPending: isCreatingBerkasKenaikanPangkatGajiBerkala,
  } = useMutation({
    mutationFn: CREATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      // navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["gaji-berkala"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return {
    onCreateBerkasKenaikanPangkatGajiBerkala,
    isCreatingBerkasKenaikanPangkatGajiBerkala,
  };
}
export default useCreateBerkasKenaikanPangkatGajiBerkala;
