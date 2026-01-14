import notificationAPI, {
  Notification,
} from "@/services/notifikasi/notificationAPI";
import { useQuery } from "@tanstack/react-query";

function useGetNotification() {
  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryFn: notificationAPI,
    queryKey: ["notification"],
  });

  return { notifications, isLoading };
}

export default useGetNotification;
