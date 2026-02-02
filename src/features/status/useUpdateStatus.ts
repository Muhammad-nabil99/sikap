import { UPDATE_STATUS_API } from "@/services/STATUS/UPDATE_STATUS_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: onUpdateStatusBerkas, isPending: isUpdatingStatusBerkas } =
    useMutation({
      mutationFn: UPDATE_STATUS_API,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["status"] });
      },
      onError: (error) => {
        console.log(error.message);
      },
    });

  return { onUpdateStatusBerkas, isUpdatingStatusBerkas };
}
export default useUpdateStatus;
