import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAPI } from "@/services/user/userAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserAPI,

    onSuccess: (updatedUser) => {
      toast.success("Data berhasil diperbarui");

      // Update cached user
      queryClient.setQueryData(["user"], updatedUser);

      // OR refetch user from backend
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate('/data-pegawai')
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Gagal mengedit data";
      toast.error(message);
      console.error(error);
    },
  });

  return { updateUser, isPending };
}

export default useUpdateUser;
