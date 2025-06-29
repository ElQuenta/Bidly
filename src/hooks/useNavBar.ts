import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../store/authStore"
import { useNotifierStore } from "../store/notificationsStore";
import type { Notification } from "../interfaces/notificationInterface";

export const useNavBar = () => {
  const { notifications, isLoading, error, archiveNotification, markNotificationAsReaded, fetchNotifications } = useNotifierStore((state) => state)
  const { user, signOut } = useAuthStore((state) => state)
  const [notReaded, setNotReaded] = useState<Notification[]>([])

  const [anchorNotif, setAnchorNotif] = useState<HTMLButtonElement | null>(null);
  const [anchorUser, setAnchorUser] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetchNotifications(user.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMemo(() => {
    setNotReaded(notifications.filter((notification: Notification) => !notification.readed))
  }, [notifications])

  const handleNotifClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNotif(event.currentTarget as HTMLButtonElement | null);
  };
  const handleUserClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorUser(event.currentTarget as unknown as HTMLButtonElement | null);
  };
  const handleNotifClose = () => {
    notReaded.forEach((notification) => {
      markNotificationAsReaded(notification.id)
    });
    setAnchorNotif(null);
  }

  const handleUserClose = () => {
    setAnchorUser(null);
  };

  const handleRefresh = () => {
    notReaded.forEach((notification) => {
      markNotificationAsReaded(notification.id)
    });
    fetchNotifications(user.id)
  }

  return { anchorNotif, anchorUser, user, notifications, notReaded, isLoading, error, archiveNotification, handleRefresh, markNotificationAsReaded, signOut, handleUserClick, handleUserClose, handleNotifClick, handleNotifClose }
}