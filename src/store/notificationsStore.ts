import { create } from "zustand";

import type { notifierStoreInterface } from "./interfaces/notificationsStoreInterface";
import type { Notification } from "../interfaces/notificationInterface";
import { archiveNotification, getNotificationsByUserID, markAsRead } from "../services/notificationService";

export const useNotifierStore = create<notifierStoreInterface>()(
  (set) => ({
    notifications: [],
    isLoading: false,
    error: null,

    fetchNotifications: async (userId: string) => {
      try {
        set({ isLoading: true });
        const response = await getNotificationsByUserID(userId);
        if (!response) {
          throw new Error("Error buscando notificaciones");
        }
        set({ notifications: response.reverse() })

      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          set({ error: error.message });
        }
      } finally {
        set({ isLoading: false });
      }
    },
    markNotificationAsReaded: async (notificationId: string) => {
      try {
        const response = await markAsRead(notificationId);
        if (!response) {
          throw new Error("Error marcando como leido");
        }
        set((state) => ({
          notifications: state.notifications.map((notification: Notification) =>
            notification.id === response.id ? response : notification)
        }))
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          set({ error: error.message });
        }
      }
    },
    archiveNotification: async (notificationId: string) => {
      try {
        await archiveNotification(notificationId);
        set((state) => ({
          notifications: state.notifications.filter((notification: Notification) =>
            notification.id !== notificationId)
        }))
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          set({ error: error.message });
        }
      }
    }
  })
);