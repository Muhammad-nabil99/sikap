import { GET_STATUS_BERKAS_API } from "@/services/STATUS/GET_STATUS_API";
import { useQuery } from "@tanstack/react-query";

function useGetStatus() {
  const { data, isLoading: isLoadingStatus } = useQuery({
    queryFn: GET_STATUS_BERKAS_API,
    queryKey: ["status"],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const status = data?.data?.status;
  

  return { isLoadingStatus, status };
}
export default useGetStatus;
