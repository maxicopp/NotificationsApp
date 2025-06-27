import { useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';

export const useNotificationItemAnimation = (timestamp: number) => {
  const [isNewItem, setIsNewItem] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const now = Date.now();
    const notificationAge = now - timestamp;
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
  }, [timestamp, fadeAnim, slideAnim, scaleAnim]);

  return {
    isNewItem,
    animatedStyle: {
      ...(Platform.OS === 'android' ? {} : { opacity: fadeAnim }),
      transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
    },
  };
};
