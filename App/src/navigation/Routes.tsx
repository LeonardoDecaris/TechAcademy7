import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrivateRoutes from "./PrivateRoutes";
import MainTabs from "./MainTabs";

//  IMPORTS DE COMPONENTS PUBLICOS
import SolicitarNovaSenha from "../screens/public/SolicitarNovaSenha";
import EsqueciSenha from "../screens/public/EsqueciSenha";
import NovaSenha from "../screens/public/NovaSenha";
import Cadastro from "../screens/public/Cadastro";
import Login from "../screens/public/Login";
import Start from "../screens/public/Start";

//  IMPORTS DE COMPONENTS PRIVADOS
import CadastroVeiculo from "../screens/private/CadastroVeiculo";
import EditarVeiculo from "../screens/private/EditarVeiculo";
import EditarPerfil from "../screens/private/EditarPerfil";

import DetalhesVeiculo from "../screens/private/DestalhesEnvio";
import DetalhesEnvio from "../screens/private/DestalhesEnvio";
import DetalhesFrete from "../screens/private/DetalhesFrete";
import DetalhesMeuVeiculo from "../screens/private/MeuVeiculo";

//  IMPORTS DA NAVEGAÇÃO POR TABS
import { StatusBar } from "react-native";


export type RootStackParamList = {
  EsqueciSenha: { email: string; cpf: string; token?: string };
  SolicitarNovaSenha: undefined;
  NovaSenha: undefined;
  Cadastro: undefined;
  Start: undefined;
  Login: undefined;
  
  CadastroVeiculo: undefined;
  DetalhesVeiculo: undefined;
  EditarVeiculo: undefined;
  DetalhesEnvio: undefined;
  DetalhesFrete: undefined;
  EditarPerfil: undefined;
  DetalhesMeuVeiculo: undefined;
  Fretes: undefined;
  Perfil: undefined;
  Home: undefined;
  MainTabs: { screen?: string } | undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerBackVisible: false }}>
        
        {/* Tabs principais: Home, Fretes, Perfil */}
        <Stack.Screen name="MainTabs" options={{ headerShown: false, }}>
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

        <Stack.Screen
          name="DetalhesFrete"
          options={{ headerTitle: "Detalhes do Frete", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><DetalhesFrete/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen
          name="DetalhesEnvio"
          options={{ headerTitle: "Detalhes do Envio", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><DetalhesEnvio/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EditarPerfil"
          options={{ headerTitle: "Editar Perfil", headerTitleAlign: "center", headerBackVisible: true }}>
          {() => (<PrivateRoutes><EditarPerfil/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EditarVeiculo">
          {() => (<PrivateRoutes><EditarVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="DetalhesMeuVeiculo">
          {() => (<PrivateRoutes><DetalhesMeuVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        {/* ROTAS PÚBLICAS | DISPONÍVEIS SEM LOGIN */}
        <Stack.Screen name="SolicitarNovaSenha" component={SolicitarNovaSenha} options={{ headerBackVisible: false, headerShown: false,  }} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ headerBackVisible: false, headerShown: false,  }} />
        <Stack.Screen name="NovaSenha" component={NovaSenha} options={{ headerTitle: "Nova Senha", headerTitleAlign: "center", headerBackVisible: true }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerBackVisible: false, headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;