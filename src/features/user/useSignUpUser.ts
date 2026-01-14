import { registerUserAPI } from "@/services/user/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignUpUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: registerUserAPI,
    onSuccess: (response) => {
      toast.success("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (error as Error).message ||
        "Gagal mendaftar.";
      toast.error(message);
      console.error(error);
    },
  });

  return { signUp, isPending };
}
export default useSignUpUser;
