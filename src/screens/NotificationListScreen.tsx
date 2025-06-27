import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useNotifications,
  useNotificationRefresh,
} from '../context/NotificationContext';
import { useFabAnimation, useNotificationActions } from '../hooks';
import { NotificationItem } from '../components/NotificationItem';
import { Badge } from '../components/Badge';
import { Notification, RootStackParamList } from '../types';
import { Styles, useTheme } from '../theme';
import { notificationListStyles } from './NotificationListScreen.styles';

type NotificationListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotificationList'
>;

interface ListHeaderProps {
  colors: any;
  spacing: any;
  unreadCount: number;
  showClearButton: boolean;
  onClearAll: () => void;
}

const ListHeaderComponent: React.FC<ListHeaderProps> = ({
  colors,
  spacing,
  unreadCount,
  showClearButton,
  onClearAll,
}) => (
  <View style={Styles.notificationList.header}>
    <View style={notificationListStyles.titleContainer}>
      <Text
        style={[
          Styles.notificationList.headerTitle,
          { color: colors.textPrimary },
        ]}
      >
        Notificaciones
      </Text>
      {unreadCount > 0 && <Badge count={unreadCount} />}
    </View>

    {showClearButton && (
      <View style={notificationListStyles.headerActions}>
        <TouchableOpacity
          style={[
            notificationListStyles.clearButton,
            {
              paddingHorizontal: spacing.m,
              paddingVertical: spacing.s,
              borderColor: colors.border,
              backgroundColor: colors.surface1,
            },
          ]}
          onPress={onClearAll}
          activeOpacity={0.7}
        >
          <Text
            style={[
              notificationListStyles.clearButtonText,
              { color: colors.textSecondary },
            ]}
          >
            Limpiar todo
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export const NotificationListScreen: React.FC = () => {
  const navigation = useNavigation<NotificationListNavigationProp>();
  const { notifications, unreadCount } = useNotifications();
  const { handleRefresh, isRefreshing, canRefresh } = useNotificationRefresh();
  const { handleGenerateTest, handleClearAll } = useNotificationActions();
  const { fabScaleAnim, animateFabPress } = useFabAnimation();
  const { colors, isDark, spacing } = useTheme();

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => {
        navigation.navigate('NotificationDetail', { notification: item });
      }}
    />
  );

  const renderSeparator = () => (
    <View style={Styles.notificationList.separator} />
  );

  const renderEmptyState = () => (
    <View
      style={[
        notificationListStyles.emptyStateContainer,
        { paddingHorizontal: spacing.xl },
      ]}
    >
      <View
        style={[
          notificationListStyles.emptyIconContainer,
          {
            backgroundColor: colors.surface2,
            marginBottom: spacing.xl,
          },
        ]}
      >
        <Text style={notificationListStyles.emptyIcon}>📬</Text>
      </View>

      <Text
        style={[
          notificationListStyles.emptyTitle,
          {
            color: colors.textPrimary,
            marginBottom: spacing.m,
          },
        ]}
      >
        Sin notificaciones
      </Text>

      <Text
        style={[
          notificationListStyles.emptyDescription,
          {
            color: colors.textSecondary,
            marginBottom: spacing.xl,
          },
        ]}
      >
        Cuando recibas notificaciones{'\n'}aparecerán aquí
      </Text>

      <TouchableOpacity
        style={[
          notificationListStyles.emptyButton,
          {
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.m,
            backgroundColor: colors.primary,
          },
        ]}
        onPress={handleGenerateTest}
        activeOpacity={0.8}
      >
        <Text
          style={[
            notificationListStyles.emptyButtonText,
            { color: colors.textOnPrimary },
          ]}
        >
          Generar notificación de prueba
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleFabPress = () => {
    animateFabPress(() => {
      handleGenerateTest();
    });
  };

  const showClearButton = notifications.length > 0;

  return (
    <SafeAreaView
      style={[
        Styles.notificationList.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <FlatList
        style={notificationListStyles.listContainer}
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={
          <ListHeaderComponent
            colors={colors}
            spacing={spacing}
            unreadCount={unreadCount}
            showClearButton={showClearButton}
            onClearAll={handleClearAll}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            enabled={canRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.surface1}
          />
        }
        contentContainerStyle={
          notifications.length === 0
            ? notificationListStyles.flexOne
            : undefined
        }
      />

      <Animated.View
        style={{
          transform: [{ scale: fabScaleAnim }],
        }}
      >
        <TouchableOpacity
          style={[
            Styles.notificationList.fab,
            notificationListStyles.fabContainer,
            Platform.OS === 'ios'
              ? notificationListStyles.fabFixedIOS
              : notificationListStyles.fabFixed,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.shadowDefault,
              shadowOffset: { width: 0, height: 4 },
            },
          ]}
          onPress={handleFabPress}
          activeOpacity={0.8}
        >
          <Text
            style={[
              notificationListStyles.fabText,
              { color: colors.textOnPrimary },
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};
