import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Styles, useTheme } from '../theme';

interface BadgeProps {
  count: number;
  maxCount?: number;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const badgeStyles = StyleSheet.create({
  shadowStyle: {
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  color,
  textColor,
  size = 'medium',
}) => {
  const { colors } = useTheme();

  if (count <= 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const backgroundColor = color ?? colors.error;
  const finalTextColor = textColor ?? '#FFFFFF';

  const sizeStyles = {
    small: {
      minWidth: 18,
      height: 14,
      borderRadius: 14,
      paddingHorizontal: 4,
    },
    medium: {
      minWidth: 24,
      height: 18,
      borderRadius: 18,
      paddingHorizontal: 6,
    },
    large: {
      minWidth: 28,
      height: 22,
      borderRadius: 22,
      paddingHorizontal: 8,
    },
  };

  const textSizeStyles = {
    small: { fontSize: 10, fontWeight: '700' as const },
    medium: { fontSize: 12, fontWeight: '600' as const },
    large: { fontSize: 14, fontWeight: '600' as const },
  };

  return (
    <View
      style={[
        Styles.badge.container,
        sizeStyles[size],
        {
          backgroundColor,
          shadowColor: backgroundColor,
          shadowOffset: { width: 0, height: 2 },
        },
        badgeStyles.shadowStyle,
      ]}
    >
      <Text
        style={[
          Styles.badge.text,
          textSizeStyles[size],
          { color: finalTextColor },
        ]}
      >
        {displayCount}
      </Text>
    </View>
  );
};
