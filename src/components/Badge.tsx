import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Styles, useTheme } from '../theme';
import { badgeStyles } from './Badge.styles';

interface BadgeProps {
  count: number;
  maxCount?: number;
  color?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  color,
  textColor,
  size = 'medium',
}) => {
  const { colors } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (count > prevCountRef.current && count > 0) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevCountRef.current = count;
  }, [count, pulseAnim]);

  if (count <= 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const backgroundColor = color ?? colors.error;
  const finalTextColor = textColor ?? colors.textOnPrimary;

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
    <Animated.View
      style={{
        transform: [{ scale: pulseAnim }],
      }}
    >
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
    </Animated.View>
  );
};
