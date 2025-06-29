import type { Notification } from "../../interfaces/notificationInterface";

export interface notifierStoreInterface {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;

  fetchNotifications: (userId: string) => void;
  markNotificationAsReaded: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
}