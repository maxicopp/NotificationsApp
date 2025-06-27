import React, { useEffect, useRef, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface UndoToastProps {
  visible: boolean;
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number;
}

const { width } = Dimensions.get('window');

const componentStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#323232',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 1000,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    marginRight: 16,
  },
  undoButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  undoText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 1,
  },
});

export const UndoToast: React.FC<UndoToastProps> = ({
  visible,
  message,
  onUndo,
  onDismiss,
  duration = 4000,
}) => {
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
        componentStyles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Animated.View
        style={[
          componentStyles.progressBar,
          {
            width: progressWidth,
          },
        ]}
      />

      <Text style={componentStyles.message}>{message}</Text>

      <TouchableOpacity
        style={componentStyles.undoButton}
        onPress={handleUndo}
        activeOpacity={0.7}
      >
        <Text style={componentStyles.undoText}>Deshacer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
