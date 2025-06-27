import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Notification } from '../types';
import { Styles, useTheme, AlertEmojis, AlertColors } from '../theme';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const componentStyles = StyleSheet.create({
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  unreadBorder: {
    borderWidth: 0.5,
  },
  newItemBorder: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readOpacity: {
    opacity: 0.7,
  },
  unreadOpacity: {
    opacity: 1.0,
  },
  readDescriptionOpacity: {
    opacity: 0.6,
  },
  unreadDescriptionOpacity: {
    opacity: 0.85,
  },
  readTimestampOpacity: {
    opacity: 0.5,
  },
  unreadTimestampOpacity: {
    opacity: 0.7,
  },
});

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInHours * 60);
    return diffInMinutes <= 0 ? 'ahora' : `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'ayer';
    }
    if (diffInDays < 7) {
      return `${diffInDays}d`;
    }
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useTheme();
  const itemRef = useRef<View>(null);
  const [itemHeight, setItemHeight] = useState<number>(0);
  const [isNewItem, setIsNewItem] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const now = Date.now();
    const notificationAge = now - notification.timestamp;
    const isNew = notificationAge < 2000;

    setIsNewItem(isNew);

    if (isNew) {
      fadeAnim.setValue(0);
      slideAnim.setValue(-50);
      scaleAnim.setValue(0.9);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      scaleAnim.setValue(1);
    }
  }, [notification.timestamp, fadeAnim, slideAnim, scaleAnim]);

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
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        ref={itemRef}
        style={[
          Styles.notificationItem.card,
          cardStyle,
          dynamicCardStyle,
          notification.isRead ? {} : componentStyles.unreadBorder,
          isNewItem ? componentStyles.newItemBorder : {},
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
                ? componentStyles.readOpacity
                : componentStyles.unreadOpacity,
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
                ? componentStyles.readDescriptionOpacity
                : componentStyles.unreadDescriptionOpacity,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {notification.description}
          </Text>

          <View style={componentStyles.timestampContainer}>
            <Text
              style={[
                Styles.notificationItem.timestamp,
                {
                  color: colors.textTertiary,
                },
                notification.isRead
                  ? componentStyles.readTimestampOpacity
                  : componentStyles.unreadTimestampOpacity,
              ]}
            >
              {formatTime(notification.timestamp)}
            </Text>

            {!notification.isRead && (
              <View
                style={[
                  componentStyles.unreadDot,
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
