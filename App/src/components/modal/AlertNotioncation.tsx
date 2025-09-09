import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import animation from "@/src/utils/animation";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // 1. Importar o hook

type NotificacaoProps = {
	visible: boolean;
	messagem?: string;
	status?: boolean;
	duration?: number;
	topOffset?: number;
	onDismiss?: () => void;
};


const AlertNotioncation = ({
	visible,
	messagem,
	duration = 800,
	onDismiss,
	status = true,
	topOffset = 30,
}: NotificacaoProps) => {
	const insets = useSafeAreaInsets(); 
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const statusConfig = {
		success: {
			style: "bg-green-500",
			icon: "checkmark-circle-outline",
			title: "Tudo certo!",
		},
		error: {
			style: "bg-red-500",
			icon: "close-circle-outline",
			title: "Algo deu errado!",
		},
	};

	useEffect(() => {
		if (visible) {
			timerRef.current = setTimeout(() => {
				onDismiss?.();
			}, duration);
		}
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [visible, duration, onDismiss]);

	if (!visible) return null;

	const config = status ? statusConfig.success : statusConfig.error;

	return (
		<animation.FadeDown
			entering={animation.enter.fadeDown}
			exiting={animation.exit.fadeDown}
			style={{ top: insets.top + topOffset }}
			className={`absolute left-5 right-5 rounded-lg p-4 z-[9999] flex-row items-center shadow-lg ${config.style}`}
		>
			<Ionicons name={config.icon as any} size={40} color="white" />

			<View className="flex-1 ml-3">
				<Text className="text-white font-bold text-base">
					{config.title}
				</Text>
				{messagem && (
					<Text className="text-white text-sm mt-0.5">{messagem}</Text>
				)}
			</View>
		</animation.FadeDown>
	);
};

export default AlertNotioncation;