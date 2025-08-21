import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Defina os tipos das rotas para o navigation
type RootStackParamList = {
  LoginScreen: undefined;
  [key: string]: undefined | object;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  if (!isAuthenticated) {
    // Redireciona para a tela de login se não estiver autenticado
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoutes;