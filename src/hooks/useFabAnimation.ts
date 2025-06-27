import { useRef } from 'react';
import { Animated } from 'react-native';

export const useFabAnimation = () => {
  const fabScaleAnim = useRef(new Animated.Value(1)).current;

  const animateFabPress = (onComplete?: () => void) => {
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
    ]).start(onComplete);
  };

  return {
    fabScaleAnim,
    animateFabPress,
  };
};
