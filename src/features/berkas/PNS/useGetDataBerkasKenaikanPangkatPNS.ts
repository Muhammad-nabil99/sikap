import { GET_BERKAS_KENAIKAN_PANGKAT_PNS_API } from "@/services/Berkas/PNS/BERKAS_PNS_API";
import { useQuery } from "@tanstack/react-query";

function useGetBerkasKenaikanPangkatPNS() {
  const {
    data: getBerkasKenaikanPangkatPNS,
    isLoading: isLoadingGetBerkasKenaikanPangkatPNS,
  } = useQuery({
    queryFn: GET_BERKAS_KENAIKAN_PANGKAT_PNS_API,
    queryKey: ["berkas"],
  });
  return { getBerkasKenaikanPangkatPNS, isLoadingGetBerkasKenaikanPangkatPNS };
}
export default useGetBerkasKenaikanPangkatPNS;
