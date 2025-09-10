import React, { memo, useEffect, useMemo, useRef, useCallback } from 'react';
import { Animated, Easing, Pressable, Text, View, AccessibilityInfo } from 'react-native';

type Props = {
  visible: boolean;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  size?: number;
  thickness?: number;
  spinnerColor?: string;
  backdropOpacity?: number;
  testID?: string;
  accessibilityLabel?: string;
};

const overlayClass = 'absolute inset-0 z-[9999] items-center justify-center px-6';
const cardClass = 'items-center justify-center rounded-2xl bg-black/55 px-5 py-4';
const messageClass = 'mt-3 text-white font-semibold text-center';

const AlertLoading = ({
  visible,
  message = '',
  dismissible = false,
  onDismiss,
  size = 56,
  thickness = 5,
  spinnerColor = '#FFFFFF',
  backdropOpacity = 0.35,
  testID,
  accessibilityLabel = 'Carregando'
}: Props) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const safeThickness = Math.min(thickness, size / 2);

  const rotateStyle = useMemo(() => {
    const spin = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return { transform: [{ rotate: spin }] };
  }, [rotate]);

  useEffect(() => {
    if (!visible) return;
    rotate.setValue(0);
    const loop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    loop.start();
    AccessibilityInfo.announceForAccessibility?.(accessibilityLabel);
    return () => loop.stop();
  }, [visible, rotate, accessibilityLabel]);

  const handlePress = useCallback(() => {
    if (dismissible) onDismiss?.();
  }, [dismissible, onDismiss]);

  if (!visible) return null;

  return (
    <Pressable
      onPress={handlePress}
      disabled={!dismissible}
      testID={testID}
      className={overlayClass}
      style={{ backgroundColor: `rgba(0,0,0,${backdropOpacity})` }}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={dismissible ? 'Toque para fechar' : undefined}
    >
      <View className={cardClass}>
        <Animated.View
          className="rounded-full border-white/25"
          style={{
            width: size,
            height: size,
            borderWidth: safeThickness,
            borderColor: 'rgba(255,255,255,0.25)',
            borderTopColor: spinnerColor,
            ...rotateStyle
          }}
        />
        {!!message && <Text className={messageClass}>{message}</Text>}
      </View>
    </Pressable>
  );
};

export default memo(AlertLoading);