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
import CadastroVeiculo from "../screens/private/CadastroVeiculo";
import DetalhesVeiculo from "../screens/private/DestalhesEnvio";
import DetalhesFrete from "../screens/private/DetalhesFrete";
import EditarPerfil from "../screens/private/EditarPerfil";
import EdtarVeiculo from "../screens/private/EdtarVeiculo";
import Fretes from "../screens/private/Fretes";
import MeuVeiculo from "../screens/private/MeuVeiculo";
import Perfil from "../screens/private/Perfil";


export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Cadastro: undefined;
  EsqueciSenha: undefined;
  
  Home: undefined;
  CadastroVeiculo: undefined;
  DetalhesVeiculo: undefined;
  DetalhesFrete: undefined;
  EditarPerfil: undefined;
  EdtarVeiculo: undefined;
  Fretes: undefined;
  MeuVeiculo: undefined;
  Perfil: undefined;
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

        <Stack.Screen name="CadastroVeiculo" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><CadastroVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="DetalhesVeiculo" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><DetalhesVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="DetalhesFrete" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><DetalhesFrete/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EditarPerfil" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><EditarPerfil/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="EdtarVeiculo" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><EdtarVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="Fretes" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><Fretes/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="MeuVeiculo" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><MeuVeiculo/></PrivateRoutes>)}
        </Stack.Screen>

        <Stack.Screen name="Perfil" options={{ title: "Cardápio Digital" }}>
          {() => (<PrivateRoutes><Perfil/></PrivateRoutes>)}
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