import React from "react";
import { useAppDispatch } from "@observatorio-brasil/atores/src/store/hooks";
import { NotificationActions } from "@observatorio-brasil/atores/src/store/slices/notification";
import { useEffect, useCallback } from "react";

const useGetNotifications = () => {
  const dispatch = useAppDispatch();

  const fetchNotifications = useCallback(async () => {
    dispatch(NotificationActions.requestNotifications());
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return;
};

export const NotificationsProvider = () => {
  useGetNotifications();
  return <></>;
};

export default useGetNotifications;
