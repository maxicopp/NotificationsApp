import React, { useEffect, useRef, useCallback } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { undoToastStyles, width } from './UndoToast.styles';
import { useTheme } from '../theme';

interface UndoToastProps {
  visible: boolean;
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  visible,
  message,
  onUndo,
  onDismiss,
  duration = 4000,
}) => {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(width - 32)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [translateY, opacity, onDismiss]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      progressWidth.setValue(width - 32);
      Animated.timing(progressWidth, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start();

      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    } else {
      handleDismiss();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, duration, handleDismiss, translateY, opacity, progressWidth]);

  const handleUndo = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onUndo();
    handleDismiss();
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        undoToastStyles.container,
        {
          backgroundColor: colors.toastBackground,
          shadowColor: colors.shadowDefault,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Animated.View
        style={[
          undoToastStyles.progressBar,
          {
            backgroundColor: colors.toastAction,
            width: progressWidth,
          },
        ]}
      />

      <Text style={[undoToastStyles.message, { color: colors.toastText }]}>
        {message}
      </Text>

      <TouchableOpacity
        style={undoToastStyles.undoButton}
        onPress={handleUndo}
        activeOpacity={0.7}
      >
        <Text style={[undoToastStyles.undoText, { color: colors.toastAction }]}>
          Deshacer
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
