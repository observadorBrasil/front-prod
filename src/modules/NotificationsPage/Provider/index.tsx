import React from "react";
import { useAppDispatch } from "../../../../src/store/hooks";
import { NotificationActions } from "../../../../src/store/slices/notification";
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
