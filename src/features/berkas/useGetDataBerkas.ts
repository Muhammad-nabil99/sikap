import {  BERKAS_TYPE, getBerkas_API } from "@/services/Berkas/berkasAPI";
import { useQuery } from "@tanstack/react-query";

function useGetBerkas() {
  const { data: berkas, isLoading: isLoadingBerkas } = useQuery<BERKAS_TYPE>({
    queryFn: getBerkas_API,
    queryKey: ["berkas"],
  });
  return { isLoadingBerkas, berkas };
}
export default useGetBerkas;
