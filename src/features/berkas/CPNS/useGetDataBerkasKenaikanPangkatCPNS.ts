import {
  BERKAS_CPNS_RESPONSE,
  GET_BERKAS_KENAIKAN_PANGKAT_CPNS_API,
} from "@/services/Berkas/CPNS/BERKAS_CPNS_API";
import { useQuery } from "@tanstack/react-query";

function useGetBerkasKenaikanPangkatCPNS() {
  const {
    data: getBerkasKenaikanPangkatCPNS,
    isLoading: isLoadingGetBerkasKenaikanPangkatCPNS,
  } = useQuery<BERKAS_CPNS_RESPONSE>({
    queryFn: GET_BERKAS_KENAIKAN_PANGKAT_CPNS_API,
    queryKey: ["berkas-cpns"],
  });
  
  return { 
    getBerkasKenaikanPangkatCPNS, 
    isLoadingGetBerkasKenaikanPangkatCPNS 
  };
}

export default useGetBerkasKenaikanPangkatCPNS;