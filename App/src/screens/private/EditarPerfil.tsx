import React from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ButtonPadrao } from "@/src/components/form/Buttons";
import { SafeAreaView, Text, View } from "react-native";
import InputAuth from "@/src/components/form/InputAuth";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputAuthData from "@/src/components/form/InputAuthData";
import useHookRegister from "@/src/hooks/post/cadastroUsuario";
import { RootStackParamList } from "@/src/navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function EditarPerfil() {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, rules, handleCadastro } = useHookRegister();

  const styleTitle = "text-[20px] text-black text-center font-bold";

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        enableOnAndroid={true}
      >
        <Text className={styleTitle}>Meus Dados</Text>

        <View className="w-full flex-col gap-2.5">
          <InputAuth
            id="nome"
            name="nome"
            label="Nome"
            placeholder="Nome completo"
            control={control}
            rules={rules.nome}
          />

          <InputAuth
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            control={control}
            rules={rules.email}
          />
          <InputAuth
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="CPF"
            control={control}
            rules={rules.cpf}
          />
          <InputAuthData
            id="dataNascimento"
            name="dataNascimento"
            control={control}
            rules={rules.dataNascimento}
          />
        </View>

        <View className="w-full flex-row gap-4 my-[20px]">
          <ButtonPadrao
            title="Cancelar"
            typeButton="normal"
            classname="flex-1"
            onPress={() => navigation.goBack()}
          />
          <ButtonPadrao
            title="Salvar"
            typeButton="normal"
            classname="flex-1"
            onPress={handleSubmit(handleCadastro)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default EditarPerfil;
