import { ApiRepository } from "../..";
import { NotificationInterface } from "./interfaces/notification.interface";

export async function getActiveNotifications(skip = 0, take = 10) {
  const api = new ApiRepository("/notification");
  const res = await api.apiRequestWrapper<NotificationInterface[]>({
    method: "get",
    url: `/unread?skip=${skip}&take=${take}`,
  });

  return res;
}

export async function markNotificationAsRead(notificationId: number) {
  const api = new ApiRepository("/notification");
  const res = await api.apiRequestWrapper<NotificationInterface>({
    method: "patch",
    url: `/${notificationId}`,
  });

  return res;
}
