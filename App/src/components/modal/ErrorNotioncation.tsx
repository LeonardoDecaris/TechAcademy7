import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface ErrorNotificationProps {
  loading?: boolean;
  statusSuccess?: boolean | null;
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  loading = false,
  statusSuccess = null,
  loadingText = "Carregando...",
  successText = "Sucesso!",
  errorText = "Erro ao processar.",
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      
      {loading && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10 }}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={{ marginLeft: 8 }}>{loadingText}</Text>
        </View>
      )}

      {!loading && statusSuccess !== null && (
        <Text className={`text-center ${statusSuccess ? "text-green-500" : "text-red-500"} px-2.5 py-2.5 rounded-md `}
          style={{
            backgroundColor: statusSuccess ? '#DFFFD6' : '#FFD6D6',
          }}
        >
          {statusSuccess ? successText : errorText}
        </Text>
      )}

    </View>
  );
};

export default ErrorNotification;
