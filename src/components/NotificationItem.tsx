import React, { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Notification } from '../types';
import { Styles, useTheme, AlertEmojis, AlertColors } from '../theme';
import { useNotificationItemAnimation, useDateFormatter } from '../hooks';
import { notificationItemStyles } from './NotificationItem.styles';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useTheme();
  const itemRef = useRef<View>(null);
  const [itemHeight, setItemHeight] = useState<number>(0);
  const { formatTime } = useDateFormatter();
  const { isNewItem, animatedStyle } = useNotificationItemAnimation(
    notification.timestamp,
  );

  useLayoutEffect(() => {
    if (itemRef.current) {
      const measureLayout = () => {
        itemRef.current?.measure((x, y, width, height) => {
          setItemHeight(height);
        });
      };

      measureLayout();
    }
  }, [notification.id]);

  const alertColor =
    AlertColors[notification.type as keyof typeof AlertColors]?.(colors) ||
    colors.info;
  const emoji =
    AlertEmojis[notification.type as keyof typeof AlertEmojis] ||
    AlertEmojis.info;

  const cardStyle = notification.isRead
    ? Styles.notificationItem.cardRead
    : Styles.notificationItem.cardUnread;

  const backgroundColor = notification.isRead
    ? colors.surface1
    : colors.surface2;

  const dynamicCardStyle = useMemo(
    () => ({
      backgroundColor,
      borderColor: colors.border,
      minHeight: itemHeight > 0 ? itemHeight : 80,
    }),
    [backgroundColor, colors.border, itemHeight],
  );

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        ref={itemRef}
        style={[
          Styles.notificationItem.card,
          cardStyle,
          dynamicCardStyle,
          notification.isRead ? {} : notificationItemStyles.unreadBorder,
          isNewItem ? notificationItemStyles.newItemBorder : {},
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {!notification.isRead && (
          <View
            style={[
              Styles.notificationItem.indicator,
              { backgroundColor: alertColor },
            ]}
          />
        )}

        <View
          style={[
            Styles.notificationItem.emojiContainer,
            {
              backgroundColor: notification.isRead
                ? colors.background
                : `${alertColor}15`,
            },
          ]}
        >
          <Text style={Styles.notificationItem.emoji}>{emoji}</Text>
        </View>

        <View style={Styles.notificationItem.textContainer}>
          <Text
            style={[
              Styles.notificationItem.title,
              {
                color: colors.textPrimary,
              },
              notification.isRead
                ? notificationItemStyles.readOpacity
                : notificationItemStyles.unreadOpacity,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {notification.title}
          </Text>

          <Text
            style={[
              Styles.notificationItem.description,
              {
                color: colors.textSecondary,
              },
              notification.isRead
                ? notificationItemStyles.readDescriptionOpacity
                : notificationItemStyles.unreadDescriptionOpacity,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {notification.description}
          </Text>

          <View style={notificationItemStyles.timestampContainer}>
            <Text
              style={[
                Styles.notificationItem.timestamp,
                {
                  color: colors.textTertiary,
                },
                notification.isRead
                  ? notificationItemStyles.readTimestampOpacity
                  : notificationItemStyles.unreadTimestampOpacity,
              ]}
            >
              {formatTime(notification.timestamp)}
            </Text>

            {!notification.isRead && (
              <View
                style={[
                  notificationItemStyles.unreadDot,
                  { backgroundColor: alertColor },
                ]}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
