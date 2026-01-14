import { createBerkas_API } from "@/services/Berkas/berkasAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateBerkas() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onCreateBerkas, isPending: isCreatingBerkas } = useMutation({
    mutationFn: createBerkas_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      navigate("/berkas");
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return { onCreateBerkas, isCreatingBerkas };
}
export default useCreateBerkas;
