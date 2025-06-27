export interface Notification {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  timestamp: number;
  isRead: boolean;
}

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>,
  ) => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

export type RootStackParamList = {
  NotificationList: undefined;
  NotificationDetail: {
    notification: Notification;
  };
};

export type ScreenNames = keyof RootStackParamList;
