import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrivateRoutes from "./PrivateRoutes";
import MainTabs from "./RoutesTab";

//  IMPORTS DE COMPONENTS PUBLICOS
import RequestNewpassword from "../screens/public/RequestNewpassword";
import ForgotPassword from "../screens/public/ForgotPassword";
import NewPassword from "../screens/public/NewPassword";
import SignUp from "../screens/public/SignUp";
import Login from "../screens/public/Login";
import Start from "../screens/public/Start";

//  IMPORTS DE COMPONENTS PRIVADOS
import DetailsFreight from "../screens/private/DetailsFreight";
import DetailsEnvio from "../screens/private/DetailsEnvio";
import EditProfile from "../screens/private/EditProfile";
import MyVehicle from "../screens/private/MyVehicle";


//  IMPORTS DA NAVEGAÇÃO POR TABS
import { StatusBar } from "react-native";


export type RootStackParamList = {
  ForgotPassword: { email: string; cpf: string; token?: string };
  RequestNewpassword: undefined;
  NewPassword: undefined;
  SignUp: undefined;
  Start: undefined;
  Login: undefined;

  Freight: undefined;
  DetailsFreight: {
    freight: {
      id: string;
      nome?: string;
      tipo?: string;
      peso?: string;
      saida?: string;
      destino?: string;
      logoEmpresa?: string;
      imagemCarga?: string;
      valor?: string;
      valorFrete?: string;
      descricao?: string;
    };
  };

  DetailsVehicle: undefined;
  DetailsEnvio: undefined;
  EditProfile: undefined;
  MyVehicle: undefined;
  Profile: undefined;
  
  MainTabs: { screen?: string } | undefined;
   
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerBackVisible: false }}>
        
        {/* ROTAS PRINCIPAIS */}
        <Stack.Screen name="MainTabs" options={{ headerShown: false, }}>
          {() => (
           <PrivateRoutes>
              <MainTabs />
             </PrivateRoutes> 
          )}
        </Stack.Screen>

          {/* ROTAS DE FRETES */}
        <Stack.Screen
          name="DetailsEnvio"
          options={{ headerTitle: "Detalhes do Envio", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><DetailsEnvio/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen
          name="DetailsFreight"
          options={{ headerTitle: "Detalhes do Frete", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><DetailsFreight/></PrivateRoutes>)}
        </Stack.Screen>

        {/* ROTAS DE EDIÇÃO DE CADASTRO */}
        <Stack.Screen name="EditProfile"
          options={{ headerTitle: "Editar Perfil", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><EditProfile/></PrivateRoutes>)}
        </Stack.Screen>

        {/* ROTAS DE MEUS VEÍCULOS */}
        <Stack.Screen name="MyVehicle"
          options={{ headerTitle: "Meu Veículo", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><MyVehicle/></PrivateRoutes>)}
        </Stack.Screen>

        {/* ROTAS PÚBLICAS | DISPONÍVEIS SEM LOGIN */}
        <Stack.Screen name="RequestNewpassword" component={RequestNewpassword} options={{ headerBackVisible: false, headerShown: false,  }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerBackVisible: false, headerShown: false,  }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerTitle: "Nova Senha", headerTitleAlign: "center", headerBackVisible: true }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerBackVisible: false, headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;