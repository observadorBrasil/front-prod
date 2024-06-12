import { Notification, Search } from "@prisma/client";

export interface NotificationInterface extends Notification {
  search: Search;
}
