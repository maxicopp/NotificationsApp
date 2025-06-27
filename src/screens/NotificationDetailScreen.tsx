import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { Styles, useTheme, AlertEmojis, AlertColors } from '../theme';
import { useDateFormatter } from '../hooks';
import { notificationDetailStyles } from './NotificationDetailScreen.styles';

type NotificationDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotificationDetail'
>;

type NotificationDetailRouteProp = RouteProp<
  RootStackParamList,
  'NotificationDetail'
>;

export const NotificationDetailScreen: React.FC = () => {
  const navigation = useNavigation<NotificationDetailNavigationProp>();
  const route = useRoute<NotificationDetailRouteProp>();
  const { markAsRead } = useNotifications();
  const { colors, isDark, spacing } = useTheme();
  const { formatFullDate } = useDateFormatter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  const headerHeight =
    Platform.OS === 'android'
      ? statusBarHeight + spacing.m + 44 + spacing.m
      : undefined;

  const notification = route.params?.notification;

  useEffect(() => {
    if (notification && !notification.isRead) {
      markAsRead(notification.id);
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [notification, markAsRead, fadeAnim, slideAnim, scaleAnim]);

  if (!notification) {
    return (
      <SafeAreaView
        style={[
          Styles.notificationDetail.container,
          notificationDetailStyles.notFoundContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            notificationDetailStyles.notFoundIconContainer,
            {
              backgroundColor: colors.surface2,
              marginBottom: spacing.xl,
            },
          ]}
        >
          <Text style={notificationDetailStyles.notFoundIcon}>📭</Text>
        </View>

        <Text
          style={[
            notificationDetailStyles.notFoundTitle,
            {
              color: colors.textPrimary,
              marginBottom: spacing.m,
            },
          ]}
        >
          Notificación no encontrada
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            notificationDetailStyles.notFoundButton,
            {
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.m,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={notificationDetailStyles.notFoundButtonText}>
            ← Volver
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const alertColor =
    AlertColors[notification.type as keyof typeof AlertColors]?.(colors) ||
    colors.info;
  const emoji =
    AlertEmojis[notification.type as keyof typeof AlertEmojis] ||
    AlertEmojis.info;

  return (
    <SafeAreaView
      style={[
        Styles.notificationDetail.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent={Platform.OS === 'android'}
      />

      <View
        style={[
          Styles.notificationDetail.header,
          Platform.OS === 'ios'
            ? notificationDetailStyles.headerDynamic
            : notificationDetailStyles.headerFixed,
          {
            paddingTop:
              Platform.OS === 'ios' ? spacing.m : statusBarHeight + spacing.m,
            height: headerHeight,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            Styles.notificationDetail.backButton,
            { backgroundColor: colors.surface2 },
          ]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text
            style={[
              Styles.notificationDetail.backIcon,
              notificationDetailStyles.backIconText,
              {
                color: colors.primary,
                ...(Platform.OS === 'android' && { lineHeight: 20 }),
              },
            ]}
          >
            ❮
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            Styles.notificationDetail.headerTitle,
            { color: colors.textPrimary },
          ]}
        >
          Detalle
        </Text>
      </View>

      <Animated.ScrollView
        style={[
          Styles.notificationDetail.scrollView,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Animated.View
          style={[
            Styles.notificationDetail.detailCard,
            { backgroundColor: colors.surface1 },
          ]}
        >
          <View
            style={[
              notificationDetailStyles.bannerContainer,
              {
                backgroundColor: alertColor,
              },
            ]}
          >
            <View style={notificationDetailStyles.bannerOverlay} />

            <View style={notificationDetailStyles.emojiContainer}>
              <Text style={notificationDetailStyles.emojiText}>{emoji}</Text>
            </View>
          </View>

          <View style={Styles.notificationDetail.cardContent}>
            <Text
              style={[
                Styles.notificationDetail.detailTitle,
                { color: colors.textPrimary },
              ]}
            >
              {notification.title}
            </Text>

            <Text
              style={[
                Styles.notificationDetail.detailDescription,
                { color: colors.textSecondary },
              ]}
            >
              {notification.description}
            </Text>

            <View
              style={[
                notificationDetailStyles.metadataContainer,
                {
                  borderTopColor: colors.border,
                  paddingTop: spacing.l,
                  marginTop: spacing.l,
                },
              ]}
            >
              <Text
                style={[
                  notificationDetailStyles.metadataText,
                  {
                    color: colors.textTertiary,
                  },
                ]}
              >
                {formatFullDate(notification.timestamp)}
              </Text>

              <View style={notificationDetailStyles.spacer} />

              {notification.isRead && (
                <View
                  style={[
                    Styles.notificationDetail.readBadge,
                    { backgroundColor: colors.surface2 },
                  ]}
                >
                  <Text
                    style={[
                      Styles.notificationDetail.readText,
                      { color: colors.textTertiary },
                    ]}
                  >
                    ✓ Marcado como leído
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
