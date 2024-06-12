import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationInterface } from "@observatorio-brasil/atores/src/api/services/notifications/interfaces/notification.interface";
import { RootState } from "../..";

export type NotificationState = {
  loading: boolean;
  hasNotifications: boolean;
  notifications: NotificationInterface[];
};

export const initialState: NotificationState = {
  loading: false,
  hasNotifications: false,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    requestNotifications: (state) => {
      state.loading = true;
    },
    setNotifications: (
      state,
      action: PayloadAction<NotificationInterface[]>
    ) => {
      const notifications = action.payload;
      state.notifications = notifications;
      state.hasNotifications =
        notifications?.some((n) => n.read === false) || false;
    },
    setReadById: (state, action: PayloadAction<number>) => {
      state.loading = true;
      const id = action.payload;
      const readNotification = state.notifications.findIndex(
        (n) => n.id === id
      );
      state.notifications[readNotification].read = true;
    },
    successfulSetRead: (state) => {
      state.loading = false;
      state.hasNotifications =
        state.notifications?.some((n) => n.read === false) || false;
    },
    failedSetRead: (state) => {
      state.loading = false;
    },
  },
});

export const NotificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
export const selectNotification = (state: RootState) => state.notification;
