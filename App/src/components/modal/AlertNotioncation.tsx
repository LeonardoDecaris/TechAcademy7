import React, { useEffect, useRef, useCallback } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import animation from "@/src/utils/animation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NotificacaoProps = {
	visible: boolean;
	messagem?: string;
	status?: boolean;
	duration?: number;
	topOffset?: number;
	onDismiss?: () => void;
	successTitle?: string;
	errorTitle?: string;
};

type StatusKey = "success" | "error";

const STATUS_CONFIG: Record<StatusKey, { style: string; icon: keyof typeof Ionicons.glyphMap; defaultTitle: string }> = {
	success: {
		style: "bg-green-500",
		icon: "checkmark-circle-outline",
		defaultTitle: "Tudo certo!",
	},
	error: {
		style: "bg-red-500",
		icon: "close-circle-outline",
		defaultTitle: "Algo deu errado!",
	},
};

const containerBaseClass = "absolute left-5 right-5 rounded-lg p-4 z-[9999] flex-row items-center shadow-lg";
const textTitleClass = "text-white font-bold text-base";
const textMessageClass = "text-white text-sm mt-0.5";
const contentWrapperClass = "flex-1 ml-3";

const AlertNotioncation = ({
	visible,
	messagem,
	duration = 800,
	onDismiss,
	status = true,
	topOffset = 30,
	successTitle,
	errorTitle,
}: NotificacaoProps) => {
	const insets = useSafeAreaInsets();
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const scheduleDismiss = useCallback(() => {
		clearTimer();
		timerRef.current = setTimeout(() => {
			onDismiss?.();
		}, duration);
	}, [clearTimer, duration, onDismiss]);

	useEffect(() => {
		if (visible) scheduleDismiss();
		return clearTimer;
	}, [visible, scheduleDismiss, clearTimer]);

	if (!visible) return null;

	const cfg = status ? STATUS_CONFIG.success : STATUS_CONFIG.error;
	const title = status ? successTitle || cfg.defaultTitle : errorTitle || cfg.defaultTitle;

	return (
		<animation.FadeDown
			entering={animation.enter.fadeDown}
			exiting={animation.exit.fadeDown}
			style={{ top: insets.top + topOffset }}
			className={`${containerBaseClass} ${cfg.style}`}
			accessibilityRole="alert"
			accessibilityLabel={title}
		>
			<Ionicons name={cfg.icon} size={40} color="white" />
			<View className={contentWrapperClass}>
				<Text className={textTitleClass}>{title}</Text>
				{!!messagem && <Text className={textMessageClass}>{messagem}</Text>}
			</View>
		</animation.FadeDown>
	);
};

export default AlertNotioncation;