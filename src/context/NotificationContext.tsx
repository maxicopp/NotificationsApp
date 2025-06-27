import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
  startTransition,
} from 'react';
import { View, Text } from 'react-native';
import { Notification } from '../types';
import NotificationService from '../utils/notificationService';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  lastUpdate: number;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  refreshNotifications: () => Promise<void>;
  generateTestNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const NotificationContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const service = NotificationService.getInstance();
    service.configure();

    const handleNotificationsUpdate = (newNotifications: Notification[]) => {
      startTransition(() => {
        setNotifications(newNotifications);
        setUnreadCount(newNotifications.filter(n => !n.isRead).length);
        setLastUpdate(Date.now());
      });
    };

    service.addListener(handleNotificationsUpdate);

    return () => {
      service.removeListener(handleNotificationsUpdate);
    };
  }, []);

  const markAsRead = useCallback((id: string) => {
    const service = NotificationService.getInstance();
    service.markAsRead(id);
  }, []);

  const clearAllNotifications = useCallback(() => {
    const service = NotificationService.getInstance();
    service.clearAll();
  }, []);

  const refreshNotifications = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const service = NotificationService.getInstance();
    const currentNotifications = service.getNotifications();

    startTransition(() => {
      setNotifications(currentNotifications);
      setUnreadCount(currentNotifications.filter(n => !n.isRead).length);
      setLastUpdate(Date.now());
      setIsLoading(false);
    });
  }, []);

  const generateTestNotification = useCallback(() => {
    const service = NotificationService.getInstance();
    service.generateTestNotification();
  }, []);

  const contextValue = useMemo(
    () => ({
      notifications,
      unreadCount,
      isLoading,
      lastUpdate,
      markAsRead,
      clearAllNotifications,
      refreshNotifications,
      generateTestNotification,
    }),
    [
      notifications,
      unreadCount,
      isLoading,
      lastUpdate,
      markAsRead,
      clearAllNotifications,
      refreshNotifications,
      generateTestNotification,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

const loadingStyle = {
  flex: 1,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
};

const NotificationLoadingFallback: React.FC = () => (
  <View style={loadingStyle}>
    <Text>Cargando notificaciones...</Text>
  </View>
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Suspense fallback={<NotificationLoadingFallback />}>
      <NotificationContent>{children}</NotificationContent>
    </Suspense>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications debe ser usado dentro de un NotificationProvider',
    );
  }
  return context;
};

export const useNotificationRefresh = () => {
  const { refreshNotifications, isLoading, lastUpdate } = useNotifications();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing || isLoading) {
      return;
    }

    startTransition(() => {
      setIsRefreshing(true);
    });

    try {
      await refreshNotifications();
    } finally {
      startTransition(() => {
        setIsRefreshing(false);
      });
    }
  }, [refreshNotifications, isRefreshing, isLoading]);

  const canRefresh = !isRefreshing && !isLoading;
  const timeSinceLastUpdate = Date.now() - lastUpdate;
  const shouldAllowRefresh = timeSinceLastUpdate > 5000;

  return {
    handleRefresh,
    isRefreshing,
    canRefresh: canRefresh && shouldAllowRefresh,
    timeSinceLastUpdate,
  };
};
