import React, { memo, useMemo } from "react";
import { View, Text, ActivityIndicator, ViewStyle } from "react-native";

interface ErrorNotificationProps {
  loading?: boolean;
  statusSuccess?: boolean | null;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  showWhenIdle?: boolean;
  containerStyle?: ViewStyle;
}

const wrapperClass = "items-center justify-center";
const loadingRowClass = "flex-row items-center";
const loadingTextClass = "ml-2 text-base";
const feedbackTextClass = "text-center px-2.5 py-2.5 rounded-md font-medium";

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  loading = false,
  statusSuccess = null,
  loadingText = "Carregando...",
  successText = "Sucesso!",
  errorText = "Erro ao processar.",
  showWhenIdle = false,
  containerStyle,
}) => {
  const { bgColor, textColor, message } = useMemo(() => {
    if (loading) {
      return {
        bgColor: "transparent",
        textColor: "#111827",
        message: loadingText,
      };
    }
    if (statusSuccess === true) {
      return {
        bgColor: "#DFFFD6",
        textColor: "#16a34a",
        message: successText,
      };
    }
    if (statusSuccess === false) {
      return {
        bgColor: "#FFD6D6",
        textColor: "#dc2626",
        message: errorText,
      };
    }
    return {
      bgColor: "transparent",
      textColor: "#111827",
      message: "",
    };
  }, [loading, statusSuccess, loadingText, successText, errorText]);

  if (!showWhenIdle && !loading && statusSuccess === null) return null;

  return (
    <View
      className={wrapperClass}
      style={containerStyle}
      accessibilityLabel={loading ? "Carregando" : "Mensagem de status"}
    >
      {loading ? (
        <View className={loadingRowClass}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text className={loadingTextClass}>{message}</Text>
        </View>
      ) : (
        statusSuccess !== null && (
          <Text
            className={feedbackTextClass}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {message}
          </Text>
        )
      )}
    </View>
  );
};

export default ErrorNotification;
