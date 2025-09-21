import React, { useEffect, useRef, useCallback } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import animation from "@/src/utils/animation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AlertStatus = "success" | "error" | "loading" | "alert";

type NotificacaoProps = {
    visible: boolean;
    status: AlertStatus;
    messagem?: string;
    title?: string;
    topOffset?: number;
    onDismiss?: () => void;
};

const STATUS_CONFIG = {
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
    loading: {
        style: "bg-gray-800",
        icon: null,
        defaultTitle: "Carregando...",
    },
    alert: {
        style: "bg-yellow-500",
        icon: "alert-circle-outline",
        defaultTitle: "Notificação",
    }
};

const containerBaseClass = "absolute left-5 right-5 rounded-lg p-4 z-[9999] flex-row items-center shadow-lg";
const textTitleClass = "text-white font-bold text-base";
const textMessageClass = "text-white text-sm mt-0.5";
const contentWrapperClass = "flex-1 ml-3";
const DISMISS_DELAY = 700;

const AlertNotification = ({
    visible,
    messagem,
    status,
    topOffset = 30,
    title,
    onDismiss,
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
        if (status !== 'loading') {
            timerRef.current = setTimeout(() => {
                onDismiss?.();
            }, DISMISS_DELAY);
        }
    }, [clearTimer, onDismiss, status]);

    useEffect(() => {
        if (visible) {
            scheduleDismiss();
        }
        return clearTimer;
    }, [visible, scheduleDismiss, clearTimer]);

    if (!visible) return null;

    const cfg = STATUS_CONFIG[status];
    const displayTitle = title || cfg.defaultTitle;

    return (
        <animation.FadeDown
            entering={animation.enter.fadeDown}
            exiting={animation.exit.fadeDown}
            style={{ top: insets.top + topOffset }}
            className={`${containerBaseClass} ${cfg.style}`}
            accessibilityRole="alert"
            accessibilityLabel={displayTitle}
        >
            {status === 'loading' ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <Ionicons name={cfg.icon as any} size={40} color="white" />
            )}
            <View className={contentWrapperClass}>
                <Text className={textTitleClass}>{displayTitle}</Text>
                {!!messagem && <Text className={textMessageClass}>{messagem}</Text>}
            </View>
        </animation.FadeDown>
    );
};

export default AlertNotification;