import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

type notificacaoProps = {
	visible: boolean;
	messagem?: string;
	status?: boolean;
	duration?: number;
	onDismiss?: () => void;
};


const CONFIGURACAO_NOTIFICACAO = {
	show: {
		duration: 400,
		friction: 7,
		tension: 40,
	},
	hide: {
		duration: 400,
		friction: 7,
		tension: 40,
	},
	initialY: -100,
	finalY: 0,
	initialOpacity: 0,
	finalOpacity: 1,
};

const AlertNotificacao = ({ visible, messagem, duration, onDismiss, status = true }: notificacaoProps) => {

	const translateY = useRef(new Animated.Value(CONFIGURACAO_NOTIFICACAO.initialY)).current;
	const opacity = useRef(new Animated.Value(CONFIGURACAO_NOTIFICACAO.initialOpacity)).current;
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const statusNotificacao = {
		success: {
			style: "absolute top-20 left-5 right-5 bg-green-500 rounded-lg py-4 px-5 z-[9999] items-center ",
			title: "Tudo certo!!"
		},
		error: {
			style: "absolute top-20 left-5 right-5 bg-red-500 rounded-lg py-4 px-5 z-[9999] items-center ",
			title: "Algo deu errado!!"
		}
	};

	useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.spring(translateY, {
					toValue: CONFIGURACAO_NOTIFICACAO.finalY,
					...CONFIGURACAO_NOTIFICACAO.show,
					useNativeDriver: true,
				}),
				Animated.spring(opacity, {
					toValue: CONFIGURACAO_NOTIFICACAO.finalOpacity,
					...CONFIGURACAO_NOTIFICACAO.show,
					useNativeDriver: true,
				}),
			]).start();

			timerRef.current = setTimeout(() => {
				Animated.parallel([
					Animated.spring(translateY, {
						toValue: CONFIGURACAO_NOTIFICACAO.initialY,
						...CONFIGURACAO_NOTIFICACAO.hide,
						useNativeDriver: true,
					}),
					Animated.spring(opacity, {
						toValue: CONFIGURACAO_NOTIFICACAO.initialOpacity,
						...CONFIGURACAO_NOTIFICACAO.hide,
						useNativeDriver: true,
					}),
				]).start(({ finished }) => {
					if (finished) onDismiss?.();
				});
			}, duration);
		}


		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [visible, duration, onDismiss, translateY, opacity]);

	if (!visible) return null;

	const statusKey = status ? "success" : "error";

	return (
		<Animated.View style={[{ transform: [{ translateY }], opacity }]} className={statusNotificacao[statusKey].style}>

			<Text className="text-white font-bold text-lg pb-1">{statusNotificacao[statusKey].title}</Text>

			<Text className="text-white text-sm text-center">{messagem}</Text>

		</Animated.View>
	);
}

export default AlertNotificacao;