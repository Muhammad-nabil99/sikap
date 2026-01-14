import { deleteSK_API } from "@/services/SK/SK_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteSK() {
  const queryClient = useQueryClient();
  const { mutate: onDeleteSK, isPending: isDeletingSK } = useMutation({
    mutationFn: deleteSK_API,
    onSuccess: async () => {
      toast.success("Berhasil Hapus");
      queryClient.setQueryData(["sk"], null);
      queryClient.invalidateQueries({ queryKey: ["sk"] });
    },
    onError: (error) => {
      toast.error("Gagal Hapus");
      console.log(error.message);
    },
  });

  return { onDeleteSK, isDeletingSK };
}
export default useDeleteSK;
