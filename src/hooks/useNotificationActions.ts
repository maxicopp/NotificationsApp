import { useCallback } from 'react';
import { useNotifications } from '../context/NotificationContext';

export const useNotificationActions = () => {
  const {
    markAsRead,
    clearAllNotifications,
    generateTestNotification,
    notifications,
  } = useNotifications();

  const handleMarkAsRead = useCallback(
    (id: string) => {
      markAsRead(id);
    },
    [markAsRead],
  );

  const handleClearAll = useCallback(() => {
    clearAllNotifications();
  }, [clearAllNotifications]);

  const handleGenerateTest = useCallback(() => {
    generateTestNotification();
  }, [generateTestNotification]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(notification => !notification.isRead);
  }, [notifications]);

  const getReadNotifications = useCallback(() => {
    return notifications.filter(notification => notification.isRead);
  }, [notifications]);

  const hasNotifications = notifications.length > 0;
  const hasUnreadNotifications = getUnreadNotifications().length > 0;

  return {
    handleMarkAsRead,
    handleClearAll,
    handleGenerateTest,
    getUnreadNotifications,
    getReadNotifications,
    hasNotifications,
    hasUnreadNotifications,
  };
};
