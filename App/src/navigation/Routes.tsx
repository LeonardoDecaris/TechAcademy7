import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrivateRoutes from "./PrivateRoutes";

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
import EdtarVeiculo from "../screens/private/EdtarVeiculo";
import MeuVeiculo from "../screens/private/MeuVeiculo";
import Fretes from "../screens/private/Fretes";
import Perfil from "../screens/private/Perfil";
import Home from "../screens/private/Home";


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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>

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
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{title: "area de esqueci senha"}} /> 
        <Stack.Screen name="Start" component={Start} options={{title: "tela de inicio para todos"}} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{title: "area de cadastro"}}/> 
        <Stack.Screen name="Login" component={Login} options={{title: "area de login"}}/> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;