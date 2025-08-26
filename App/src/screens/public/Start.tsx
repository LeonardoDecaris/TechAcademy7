import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { RootStackParamList } from '@/src/navigation/Routes'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function Start() {
  const navigation = useNavigation<NavigationProp>()

  const handleNavigation = {
    toLogin: () => navigation.navigate('Login'),
    toCadastro: () => navigation.navigate('Cadastro'),
  }

  return (

      <SafeAreaView className='flex-1 justify-center items-center px-5 bg-white'>

        <View className='mb-10'>
          <Text className='font-bold text-center text-5xl'>Bem Vindo</Text>
          <Text className='text-center text-sm font-medium'>Vamos começar</Text>
        </View>

        <View className='w-full flex-col gap-4'>
          <ButtonPadrao 
            title="Login" 
            typeButton="normal" 
            classname="w-full" 
            onPress={handleNavigation.toLogin}
          />
          <ButtonPadrao 
            title="Cadastrar" 
            typeButton="normal" 
            classname="w-full" 
            onPress={handleNavigation.toCadastro}
          />
        </View>
      </SafeAreaView>

  )
}