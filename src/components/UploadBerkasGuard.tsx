import GetAllBerkas from "@/features/berkas/GET_ALL_BERKAS/GetAllBerkas";
import { useNavigate } from "react-router-dom";

function UploadBerkasGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const documentConfigs = GetAllBerkas();
  const isAllUploaded = !documentConfigs?.every((item) => item?.getData?.data);

  if (!isAllUploaded ) {
    navigate("/");
  }

  return children;
}
export default UploadBerkasGuard;
