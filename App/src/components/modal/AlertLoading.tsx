import React, { useEffect, useRef, useCallback } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import animation from "@/src/utils/animation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AlertLoadingProps = {
	visible: boolean;
	topOffset?: number;
	message?: string;
};

const containerBaseClass = "absolute left-5 right-5 rounded-lg p-4 z-[9999] flex-row items-center shadow-lg bg-gray-800";
const textMessageClass = "text-white text-base ml-4";

const AlertLoading = ({
	visible,
	topOffset = 30,
	message = "Carregando...",
}: AlertLoadingProps) => {
	const insets = useSafeAreaInsets();

	if (!visible) return null;

	return (
		<animation.FadeDown
			entering={animation.enter.fadeDown}
			exiting={animation.exit.fadeDown}
			style={{ top: insets.top + topOffset }}
			className={containerBaseClass}
			accessibilityRole="alert"
			accessibilityLiveRegion="assertive"
		>
			<ActivityIndicator size="large" color="white" />
			<Text className={textMessageClass}>{message}</Text>
		</animation.FadeDown>
	);
};

export default AlertLoading;