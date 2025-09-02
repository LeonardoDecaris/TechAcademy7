import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  size?: number; 
  thickness?: number;     
  spinnerColor?: string;   
  backdropOpacity?: number; 
};

const AlertLoading = ({
  visible,
  message,
  dismissible = false,
  onDismiss,
  size = 56,
  thickness = 5,
  spinnerColor = "#FFFFFF",
  backdropOpacity = 0.35,
}: Props) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateStyle = useMemo(() => {
    const spin = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return { transform: [{ rotate: spin }] };
  }, [rotate]);

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;

    if (visible) {
      rotate.setValue(0);
      loop = Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loop.start();
    }

    return () => {
      if (loop) loop.stop();
    };
  }, [visible, rotate]);

  if (!visible) return null;

  return (
    <Pressable
      onPress={dismissible ? onDismiss : undefined}
      className="absolute inset-0 z-[9999] items-center justify-center px-6"
      style={{ backgroundColor: `rgba(0,0,0,${backdropOpacity})` }}
    >
      <View className="items-center justify-center rounded-2xl bg-black/55 px-5 py-4">
        <Animated.View
          className="rounded-full border-white/25"
          style={{
            width: size,
            height: size,
            borderWidth: thickness,
            borderTopColor: spinnerColor, // parte “ativa”
            ...rotateStyle,
          }}
        />
        {message ? (
          <Text className="mt-3 text-white font-semibold text-center">{message}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

export default AlertLoading;