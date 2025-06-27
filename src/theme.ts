import {StyleSheet, Appearance} from 'react-native';

// =====================================================
//          PALETAS DE COLORES
// =====================================================

export const lightTheme = {
  // Principales
  primary: '#3478F6',
  background: '#F2F2F7',
  surface1: '#FFFFFF',
  surface2: '#F7F7FA',

  // Textos
  textPrimary: '#000000',
  textSecondary: '#6D6D80',
  textTertiary: '#8E8E93',

  // Bordes y separadores
  border: '#E5E5EA',
  separator: '#C6C6C8',

  // Sombras
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowStrong: 'rgba(0, 0, 0, 0.15)',

  // Colores de alerta
  info: '#3478F6', // Azul 500
  success: '#34C759', // Verde 500
  warning: '#FF9F0A', // Naranja 500
  error: '#FF3B30', // Rojo 500

  // Variantes de alerta más suaves
  infoBg: '#EBF4FF',
  successBg: '#EBF9F0',
  warningBg: '#FFF4E6',
  errorBg: '#FFEBEA',
};

export const darkTheme = {
  // Principales
  primary: '#4D8DFF',
  background: '#000000',
  surface1: '#1C1C1E',
  surface2: '#2C2C2E',

  // Textos
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#8E8E93',

  // Bordes y separadores
  border: '#3A3A3C',
  separator: '#38383A',

  // Sombras
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowStrong: 'rgba(0, 0, 0, 0.5)',

  // Colores de alerta
  info: '#4D8DFF', // Azul 500 dark
  success: '#30D158', // Verde 500 dark
  warning: '#FFA82C', // Naranja 500 dark
  error: '#FF453A', // Rojo 500 dark

  // Variantes de alerta más suaves
  infoBg: '#1A2B47',
  successBg: '#1A2F24',
  warningBg: '#2B2418',
  errorBg: '#2B1A1A',
};

export const ThemedColors = () =>
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

// =====================================================
//            TOKENS DE DISEÑO
// =====================================================

const Spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

const Typography = {
  fontFamily: 'System',
  lineHeight: 1.3,
};

const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  round: 50,
};

// =====================================================
//                    SOMBRAS
// =====================================================

export const Shadow = {
  // Nivel 1: Cards normales
  level1: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  // Nivel 2: FAB y elementos flotantes
  level2: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

// =====================================================
//          NOTIFICATION LIST SCREEN STYLES
// =====================================================

export const notificationListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header con badge contador
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl + 16, // Separación adicional del status bar
    paddingBottom: Spacing.l,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(28 * Typography.lineHeight),
  },

  // Lista principal
  listContainer: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: Spacing.l,
    paddingBottom: 100, // Espacio para FAB
  },

  // Separador entre elementos
  separator: {
    height: Spacing.s,
  },

  // FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    right: Spacing.xl,
    bottom: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.level2,
  },

  fabIcon: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
  },

  // Pull to refresh
  refreshControl: {
    tintColor: '#8E8E93',
  },
});

// =====================================================
//           NOTIFICATION ITEM STYLES
// =====================================================

export const notificationItemStyles = StyleSheet.create({
  // Card principal
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.l,
    borderRadius: BorderRadius.medium,
    position: 'relative',
    ...Shadow.level1,
  },

  // Estados de la card
  cardUnread: {
    // Se aplicará background elevated y opacidad 1.0
  },

  cardRead: {
    opacity: 0.7,
    // Se aplicará background plano
  },

  // Indicador lateral de color según tipo de alerta
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: BorderRadius.medium,
    borderBottomLeftRadius: BorderRadius.medium,
  },

  // Emoji/Icono
  emojiContainer: {
    marginRight: Spacing.m,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 20,
  },

  // Contenido de texto
  textContainer: {
    flex: 1,
    marginRight: Spacing.s,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(16 * Typography.lineHeight),
    marginBottom: Spacing.xs,
  },

  description: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(14 * Typography.lineHeight),
    marginBottom: Spacing.xs,
  },

  timestamp: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(12 * Typography.lineHeight),
  },
});

// =====================================================
//        NOTIFICATION DETAIL SCREEN STYLES
// =====================================================

export const notificationDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header con botón back
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.m,
    height: 88,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.m,
  },

  backIcon: {
    fontSize: 18,
    fontWeight: '600',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Typography.fontFamily,
  },

  // Contenido scrolleable
  scrollView: {
    flex: 1,
    padding: Spacing.xl,
  },

  // Card principal con banner
  detailCard: {
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
    ...Shadow.level1,
  },

  // Banner superior colorizado
  banner: {
    height: 48,
    width: '100%',
  },

  // Contenido de la card
  cardContent: {
    padding: Spacing.xl,
  },

  // Títulos y textos
  detailTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(20 * Typography.lineHeight),
    marginBottom: Spacing.m,
  },

  detailDescription: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(16 * Typography.lineHeight),
    marginBottom: Spacing.l,
  },

  detailDate: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Typography.fontFamily,
    lineHeight: Math.round(14 * Typography.lineHeight),
  },

  // Estado de leído (representación visual)
  readIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.l,
    paddingTop: Spacing.l,
  },

  readBadge: {
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    opacity: 0.6,
  },

  readText: {
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'line-through',
  },
});

// =====================================================
//             COMPONENTES REUTILIZABLES
// =====================================================

// Badge redondeado
export const badgeStyles = StyleSheet.create({
  container: {
    minWidth: 24,
    height: 18,
    borderRadius: 18,
    paddingHorizontal: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Typography.fontFamily,
    textAlign: 'center',
  },
});

// =====================================================
//                ANIMACIONES BÁSICAS
// =====================================================

export const AnimationConfig = {
  // Duración estándar
  duration: 300,

  // Easing
  easing: {
    ease: 'ease-out',
  },

  // Valores para animaciones de entrada
  entrance: {
    translateY: {from: 10, to: 0},
    opacity: {from: 0, to: 1},
    scale: {from: 0.9, to: 1.0},
  },

  // Valores para animaciones de FAB
  fab: {
    scale: {from: 0, to: 1},
    opacity: {from: 0, to: 1},
  },

  // Valores para animaciones de press
  press: {
    scale: {from: 1.0, to: 0.96},
  },
};

// =====================================================
//              MAPEO DE EMOJIS POR TIPO
// =====================================================

export const AlertEmojis = {
  info: '📍',
  success: '✅',
  warning: '⚠️',
  error: '🚨',
};

export const AlertColors = {
  info: (theme: typeof lightTheme) => theme.info,
  success: (theme: typeof lightTheme) => theme.success,
  warning: (theme: typeof lightTheme) => theme.warning,
  error: (theme: typeof lightTheme) => theme.error,
};

// =====================================================
//               HOOK DE TEMA HELPER
// =====================================================

export const useTheme = () => {
  const colorScheme = Appearance.getColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  return {
    colors,
    isDark: colorScheme === 'dark',
    spacing: Spacing,
    borderRadius: BorderRadius,
    typography: Typography,
  };
};

// =====================================================
//            ESTILOS COMBINADOS EXPORTS
// =====================================================

export const Styles = {
  notificationList: notificationListStyles,
  notificationItem: notificationItemStyles,
  notificationDetail: notificationDetailStyles,
  badge: badgeStyles,
  shadow: Shadow,
  spacing: Spacing,
  borderRadius: BorderRadius,
  typography: Typography,
  animation: AnimationConfig,
  alertEmojis: AlertEmojis,
  alertColors: AlertColors,
};

export default Styles;
