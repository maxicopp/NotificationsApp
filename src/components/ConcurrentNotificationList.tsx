import React, {
  useDeferredValue,
  useMemo,
  startTransition,
  useLayoutEffect,
  useRef,
} from 'react';
import { FlatList, View } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../types';
import { useTheme } from '../theme';

interface ConcurrentNotificationListProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
  searchQuery?: string;
}

export const ConcurrentNotificationList: React.FC<
  ConcurrentNotificationListProps
> = ({ notifications, onNotificationPress, searchQuery = '' }) => {
  const { colors } = useTheme();
  const listRef = useRef<FlatList>(null);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredNotifications = useDeferredValue(notifications);

  const filteredNotifications = useMemo(() => {
    if (!deferredSearchQuery.trim()) {
      return deferredNotifications;
    }

    return deferredNotifications.filter(
      notification =>
        notification.title
          .toLowerCase()
          .includes(deferredSearchQuery.toLowerCase()) ||
        notification.description
          .toLowerCase()
          .includes(deferredSearchQuery.toLowerCase()),
    );
  }, [deferredNotifications, deferredSearchQuery]);

  useLayoutEffect(() => {
    if (filteredNotifications.length > 0 && listRef.current) {
      const hasNewNotifications =
        notifications.length > filteredNotifications.length;
      if (hasNewNotifications) {
        startTransition(() => {
          listRef.current?.scrollToIndex({
            index: 0,
            animated: true,
            viewPosition: 0,
          });
        });
      }
    }
  }, [filteredNotifications.length, notifications.length]);

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => onNotificationPress(item)}
    />
  );

  const separatorStyle = { height: 1, backgroundColor: colors.border };

  const renderSeparator = () => <View style={separatorStyle} />;

  const keyExtractor = (item: Notification) => item.id;

  const getItemLayout = (_: any, index: number) => ({
    length: 80,
    offset: 80 * index,
    index,
  });

  return (
    <FlatList
      ref={listRef}
      data={filteredNotifications}
      renderItem={renderNotificationItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
      scrollEventThrottle={16}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
};
