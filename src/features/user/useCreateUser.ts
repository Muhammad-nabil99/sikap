import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAPI } from "@/services/user/userAPI";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserAPI,

    onSuccess: (updatedUser) => {
      toast.success("Data berhasil diperbarui");

      // Update cached user
      queryClient.setQueryData(["user"], updatedUser);

      // OR refetch user from backend
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
