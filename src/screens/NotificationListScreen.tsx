import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useNotifications,
  useNotificationRefresh,
} from '../context/NotificationContext';
import { NotificationItem } from '../components/NotificationItem';
import { Badge } from '../components/Badge';
import { Notification, RootStackParamList } from '../types';
import { Styles, useTheme } from '../theme';

type NotificationListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotificationList'
>;

const componentStyles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyButton: {
    borderRadius: 22,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 15,
    marginTop: 2,
    fontWeight: '400',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // spacing.m
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // spacing.m
  },
  clearButton: {
    borderRadius: 16,
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  fabContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
  },
  flexOne: {
    flex: 1,
  },
  fabFixed: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabFixedIOS: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

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
    <View style={componentStyles.titleContainer}>
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
      <View style={componentStyles.headerActions}>
        <TouchableOpacity
          style={[
            componentStyles.clearButton,
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
              componentStyles.clearButtonText,
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
  const {
    notifications,
    unreadCount,
    generateTestNotification,
    clearAllNotifications,
  } = useNotifications();
  const { handleRefresh, isRefreshing, canRefresh } = useNotificationRefresh();
  const { colors, isDark, spacing } = useTheme();

  // Animaciones para FAB
  const fabScaleAnim = useRef(new Animated.Value(1)).current;

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
        componentStyles.emptyStateContainer,
        { paddingHorizontal: spacing.xl },
      ]}
    >
      <View
        style={[
          componentStyles.emptyIconContainer,
          {
            backgroundColor: colors.surface2,
            marginBottom: spacing.xl,
          },
        ]}
      >
        <Text style={componentStyles.emptyIcon}>📬</Text>
      </View>

      <Text
        style={[
          componentStyles.emptyTitle,
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
          componentStyles.emptyDescription,
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
          componentStyles.emptyButton,
          {
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.m,
            backgroundColor: colors.primary,
          },
        ]}
        onPress={generateTestNotification}
        activeOpacity={0.8}
      >
        <Text style={componentStyles.emptyButtonText}>
          Generar notificación de prueba
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleFabPress = () => {
    Animated.sequence([
      Animated.timing(fabScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fabScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    generateTestNotification();
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
        style={componentStyles.listContainer}
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
            onClearAll={clearAllNotifications}
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
          notifications.length === 0 ? componentStyles.flexOne : undefined
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
            componentStyles.fabContainer,
            Platform.OS === 'ios'
              ? componentStyles.fabFixedIOS
              : componentStyles.fabFixed,
            {
              backgroundColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
            },
          ]}
          onPress={handleFabPress}
          activeOpacity={0.8}
        >
          <Text style={componentStyles.fabText}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};
