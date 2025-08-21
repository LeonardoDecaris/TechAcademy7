import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrivateRoutes from "./PrivateRoutes";

//  IMPORTS DE COMPONENTS PUBLICOS
import Start from "../screens/public/Start";
import Login from "../screens/public/Login";
import Cadastro from "../screens/public/Cadastro";
import EsqueciSenha from "../screens/public/EsqueciSenha";

//  IMPORTS DE COMPONENTS PRIVADOS
import Home from "../screens/private/Home";


export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  Start: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

		{/* ROTAS PRIVADAS | LIBERADAS APARTIR DO LOGIN DO USUARIO */}
        <Stack.Screen name="Home" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><Home/></PrivateRoutes>)}
        </Stack.Screen>

		{/* ROTAS PÚBLICAS | DISPONÍVEIS SEM LOGIN */}
        <Stack.Screen name="Start" component={Start} options={{ title: "tela de inicio para todos" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "area de login" }}/> 
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: "area de cadastro" }}/> 
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ title: "area de esqueci senha" }} /> 


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;