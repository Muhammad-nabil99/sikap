import { deleteBerkas_API } from "@/services/Berkas/berkasAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBerkas() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onDeleteBerkas, isPending: isDeletingBerkas } = useMutation({
    mutationFn: deleteBerkas_API,
    onSuccess: () => {
      toast.success("Berhasil Hapus");
      navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error("Gagal Hapus");
      console.log(error.message);
    },
  });

  return { onDeleteBerkas, isDeletingBerkas };
}
export default useDeleteBerkas;
