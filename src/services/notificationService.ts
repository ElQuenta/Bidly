import { v4 as uuidv4 } from "uuid";

import jsonServerInstance from "../api/jsonServerInstance";
import type { Notification } from "../interfaces/notificationInterface";
import type { sendNotificationsRequest } from "./models/notificationModels"
import type { User } from "../interfaces/userInterface";

const NOTIFICATIONS_URL = "notification";

export const getNotificationsByUserID = async (userId: string): Promise<Notification[]> => {
  try {
    const notificationsResponse = await jsonServerInstance.get(NOTIFICATIONS_URL, { params: { userId: userId } })
    return notificationsResponse.data as Notification[]
  }
  catch (error) {
    console.error("Error Fetching notifications: ", error)
    throw error
  }
};

export const markAsRead = async (notificationId: string): Promise<Notification> => {
  try {
    const notificationsResponse = await jsonServerInstance.patch(`${NOTIFICATIONS_URL}/${notificationId}`, { readed: true })
    return notificationsResponse.data as Notification
  }
  catch (error) {
    console.error("Error Fetching notifications: ", error)
    throw error
  }
};

export const archiveNotification = async (notificationId: string): Promise<void> => {
  try {
    await jsonServerInstance.delete(`${NOTIFICATIONS_URL}/${notificationId}`)
  }
  catch (error) {
    console.error("Error Updating notifications: ", error)
    throw error
  }
};

export const sendNotifications = async ({ auction, message, type }: sendNotificationsRequest) => {
  try {
    const usersResponse = await jsonServerInstance.get('users', { params: { role: "user" } })
    const usersIds = usersResponse.data
    usersIds.forEach(async (user: User) => {
      const notification: Notification = {
        id: uuidv4(),
        userId: user.id,
        message: message,
        auction: auction,
        type: type,
        readed: false
      }
      await jsonServerInstance.post(NOTIFICATIONS_URL, notification)
    });
  } catch (error) {
    console.error("Error Creating notifications: ", error)
    throw error
  }
};
