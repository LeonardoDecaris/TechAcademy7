// import React from "react";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ButtonPadrao } from "@/src/components/form/Buttons";
// import { SafeAreaView, Text, View } from "react-native";
// import InputAuth from "@/src/components/form/InputAuth";

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import InputAuthData from "@/src/components/form/InputAuthData";
// import useHookRegister from "@/src/hooks/post/cadastroUsuario";
// import { RootStackParamList } from "@/src/navigation/Routes";
// import { useNavigation } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native";

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// function EditarVeiculo() {
//   const navigation = useNavigation<NavigationProp>();
//   const { control, handleSubmit, rules, handleSalvarVeiculo } =useHookRegister();

//   return (
//     <SafeAreaView className="flex-1 bg-white px-5">
//       <KeyboardAwareScrollView
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         enableOnAndroid={true}
//       >
//         <View className="w-full flex-col gap-2.5">
//           <InputAuth
//             id="marca"
//             name="marca"
//             label="Marca"
//             placeholder="Marca do veículo"
//             control={control}
//             rules={rules.marca}
//           />

//           <InputAuth
//             id="modelo"
//             name="modelo"
//             label="Modelo"
//             placeholder="Modelo do veículo"
//             control={control}
//             rules={rules.modelo}
//           />
//           <InputAuth
//             id="placa"
//             name="placa"
//             label="Placa"
//             placeholder="Placa do veículo"
//             control={control}
//             rules={rules.placa}
//           />
//           <View className="w-full flex-row gap-4 my-[20px]">
//             <InputAuthData
//               id="anoFabricacao"
//               name="anoFabricacao"
//               label="Ano de fabricação"
//               placeholder="Ano de fabricação do veículo"
//               control={control}
//               rules={rules.ano}
//             />
//             <InputAuth
//               id="quilometragem"
//               name="quilometragem"
//               label="Quilometragem"
//               placeholder="Quilometragem do veículo"
//               control={control}
//               rules={rules.quilometragem}
//             />
//           </View>
//           <View className="w-full flex-row gap-4 my-[20px]">
//             <InputAuth
//               id="capacidade"
//               name="capacidade"
//               label="Capacidade"
//               placeholder="Capacidade do veículo"
//               control={control}
//               rules={rules.capacidade}
//             />
//           </View>
//         </View>

//         <View className="w-full flex-row gap-4 my-[20px]">
//           <ButtonPadrao
//             title="Cancelar"
//             typeButton="normal"
//             classname="flex-1"
//             onPress={() => navigation.goBack()}
//           />
//           <ButtonPadrao
//             title="Salvar"
//             typeButton="normal"
//             classname="flex-1"
//             onPress={handleSubmit(handleSalvarVeiculo)}
//           />
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// }

// export default EditarVeiculo;
