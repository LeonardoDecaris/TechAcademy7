import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrivateRoutes from "./PrivateRoutes";
import MainTabs from "./MainTabs";

//  IMPORTS DE COMPONENTS PUBLICOS
import EsqueciSenha from "../screens/public/EsqueciSenha";
import Cadastro from "../screens/public/Cadastro";
import Login from "../screens/public/Login";
import Start from "../screens/public/Start";

//  IMPORTS DE COMPONENTS PRIVADOS
import CadastroVeiculo from "../screens/private/CadastroVeiculo";
import DetalhesVeiculo from "../screens/private/DestalhesEnvio";
import DetalhesFrete from "../screens/private/DetalhesFrete";
import EditarPerfil from "../screens/private/EditarPerfil";
import EdtarVeiculo from "../screens/private/EditarVeiculo";
import MeuVeiculo from "../screens/private/MeuVeiculo";
import { StatusBar } from "react-native";


export type RootStackParamList = {
  EsqueciSenha: undefined;
  Cadastro: undefined;
  Start: undefined;
  Login: undefined;
  
  CadastroVeiculo: undefined;
  DetalhesVeiculo: undefined;
  DetalhesFrete: undefined;
  EditarPerfil: undefined;
  EdtarVeiculo: undefined;
  MeuVeiculo: undefined;
  Fretes: undefined;
  Perfil: undefined;
  Home: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerBackVisible: false }}>
        
        {/* Tabs principais: Home, Fretes, Perfil */}
        <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
          {() => (
            <PrivateRoutes>
              <MainTabs />
            </PrivateRoutes>
          )}
        </Stack.Screen>

        {/* ROTAS PRIVADAS | LIBERADAS APARTIR DO LOGIN DO USUARIO */}
        <Stack.Screen name="CadastroVeiculo">
          {() => (<PrivateRoutes><CadastroVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="DetalhesVeiculo">
          {() => (<PrivateRoutes><DetalhesVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="DetalhesFrete">
          {() => (<PrivateRoutes><DetalhesFrete/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EditarPerfil">
          {() => (<PrivateRoutes><EditarPerfil/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EdtarVeiculo">
          {() => (<PrivateRoutes><EdtarVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="MeuVeiculo">
          {() => (<PrivateRoutes><MeuVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        {/* ROTAS PÚBLICAS | DISPONÍVEIS SEM LOGIN */}
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ headerBackVisible: false, headerShown: false,  }} />
        <Stack.Screen name="Start" component={Start} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerBackVisible: false, headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;