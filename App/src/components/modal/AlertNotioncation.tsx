import React, { useEffect, useRef } from "react";
import { Text } from "react-native";
import animation from "@/src/utils/animation";

type NotificacaoProps = {
	visible: boolean;
	messagem?: string;
	status?: boolean;
	duration?: number;
	onDismiss?: () => void;
};


const AlertNotioncation = ({
	visible,
	messagem,
	duration = 800,
	onDismiss,
	status = true,
}: NotificacaoProps) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const statusNotificacao = {
		success: {
			style:
				"absolute top-12 left-5 right-5 bg-green-500 rounded-lg py-4 px-5 z-[9999] items-center",
			title: "Tudo certo!!",
		},
		error: {
			style:
				"absolute top-12 left-5 right-5 bg-red-500 rounded-lg py-4 px-5 z-[9999] items-center",
			title: "Algo deu errado!!",
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

	const statusKey = status ? "success" : "error";

	return (
		<animation.FadeDown
			entering={animation.enter.fadeDown}
			exiting={animation.exit.fadeDown}
			className={statusNotificacao[statusKey].style}
		>
			<Text className="text-white font-bold text-lg pb-1">
				{statusNotificacao[statusKey].title}
			</Text>
			<Text className="text-white text-sm text-center">{messagem}</Text>
		</animation.FadeDown>
	);
};

export default AlertNotioncation;