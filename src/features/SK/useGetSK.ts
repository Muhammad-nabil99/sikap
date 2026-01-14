import { getSK_API, SK } from "@/services/SK/SK_API";
import { useQuery } from "@tanstack/react-query";

function useGetSK() {
  const { data: SK, isLoading: isLoadingSK } = useQuery<SK>({
    queryFn: getSK_API,
    queryKey: ["sk"],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  return { isLoadingSK, SK };
}
export default useGetSK;
