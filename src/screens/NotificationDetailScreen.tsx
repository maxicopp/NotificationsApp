import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { Styles, useTheme, AlertEmojis, AlertColors } from '../theme';

type NotificationDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotificationDetail'
>;

type NotificationDetailRouteProp = RouteProp<
  RootStackParamList,
  'NotificationDetail'
>;

const componentStyles = StyleSheet.create({
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIcon: {
    fontSize: 32,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  notFoundButton: {
    borderRadius: 22,
  },
  notFoundButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  animatedContainer: {
    flex: 1,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  emojiContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 18,
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  metadataDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metadataText: {
    flex: 1,
  },
  spacer: {
    height: 32, // spacing.xxl
  },
  scrollContainer: {
    flex: 1,
  },
  animatedWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  flexContainer: {
    flex: 1,
  },
  headerDynamic: {
    height: 'auto',
  },
  headerFixed: {
    height: 88,
  },
});

export const NotificationDetailScreen: React.FC = () => {
  const navigation = useNavigation<NotificationDetailNavigationProp>();
  const route = useRoute<NotificationDetailRouteProp>();
  const { markAsRead } = useNotifications();
  const { colors, isDark, spacing } = useTheme();

  const notification = route.params?.notification;

  useEffect(() => {
    if (notification && !notification.isRead) {
      markAsRead(notification.id);
    }
  }, [notification, markAsRead]);

  if (!notification) {
    return (
      <SafeAreaView
        style={[
          Styles.notificationDetail.container,
          componentStyles.notFoundContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            componentStyles.notFoundIconContainer,
            {
              backgroundColor: colors.surface2,
              marginBottom: spacing.xl,
            },
          ]}
        >
          <Text style={componentStyles.notFoundIcon}>📭</Text>
        </View>

        <Text
          style={[
            componentStyles.notFoundTitle,
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
            componentStyles.notFoundButton,
            {
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.m,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={componentStyles.notFoundButtonText}>← Volver</Text>
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

  const formatFullDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('es-ES', options);
  };

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
            ? componentStyles.headerDynamic
            : componentStyles.headerFixed,
          {
            paddingTop: Platform.OS === 'ios' ? spacing.m : spacing.xl,
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
              { color: colors.primary },
            ]}
          >
            ←
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

      <ScrollView
        style={Styles.notificationDetail.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View
          style={[
            Styles.notificationDetail.detailCard,
            { backgroundColor: colors.surface1 },
          ]}
        >
          <View
            style={[
              componentStyles.bannerContainer,
              {
                backgroundColor: alertColor,
              },
            ]}
          >
            <View style={componentStyles.bannerOverlay} />

            <View style={componentStyles.emojiContainer}>
              <Text style={componentStyles.emojiText}>{emoji}</Text>
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
                componentStyles.metadataContainer,
                {
                  borderTopColor: colors.border,
                  paddingTop: spacing.l,
                  marginTop: spacing.l,
                },
              ]}
            >
              <Text
                style={[
                  componentStyles.metadataText,
                  {
                    color: colors.textTertiary,
                  },
                ]}
              >
                {formatFullDate(notification.timestamp)}
              </Text>

              <View style={componentStyles.spacer} />

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
