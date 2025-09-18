import { Image, Platform, ScrollView, View } from "react-native";

import InputAuth from "@/src/components/form/InputAuth";
import { ButtonPadrao, ButtonUpload } from "@/src/components/form/Buttons";
import AlertNotioncation from "@/src/components/modal/AlertNotioncation";
import { KeyboardAvoidingView } from "react-native";

import useRegisterVehicle from "@/src/hooks/hookVehicle/useRegisterVehicle";
import ErrorNotification from "@/src/components/modal/ErrorNotioncation";

function RegisterVehicle() {
    const { control, rules, } = useRegisterVehicle();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <View className="w-full py-5 flex-col gap-2">
                    <View className="w-full ">
                        <Image source={require('../../assets/image/meu.avif')} className="w-full h-44 rounded-lg " />
                    </View>


                    <ErrorNotification
                        loadingText="Carregando imagem..."
                        successText="Imagem enviada com sucesso!"
                        errorText="Erro ao enviar imagem."
                    />
                    <ErrorNotification
                        loadingText="Atualizando..."
                        successText="Imagem atualizada com sucesso!"
                        errorText="Erro ao atualizar imagem."
                    />

                    <View className="flex-row justify-center gap-2">
                        <ButtonUpload onPress={() => { }} title="Alterar Foto" />
                        <ButtonUpload onPress={() => { }} title="Tirar Foto" />
                    </View>
                </View>

                <View className='w-full flex-col gap-1.5'>
                    <InputAuth
                        control={control}
                        rules={rules.marca}
                        name="marca"
                        id='marca'
                        placeholder='Marca do veículo'
                        label='Marca'
                        type="default"
                    />
                    <InputAuth
                        control={control}
                        rules={rules.modelo}
                        name="modelo"
                        id='modelo'
                        placeholder='Modelo do veículo'
                        label='Modelo'
                        type="default"
                    />
                    <InputAuth
                        control={control}
                        rules={rules.placa}
                        name="placa"
                        id='placa'
                        placeholder='Placa do veículo'
                        label='Placa'
                        type="default"
                    />

                    <View className="w-full flex-row justify-between ">
                        <InputAuth
                            control={control}
                            rules={rules.anoFabricacao}
                            name="anoFabricacao"
                            id='anoFabricacao'
                            placeholder='Ano de fabricação'
                            label='Ano de fabricação'
                            type="numeric"
                            Tamanho="pequeno"
                        />
                        <InputAuth
                            control={control}
                            rules={rules.quilometragem}
                            name="quilometragem"
                            id='quilometragem'
                            placeholder='Quilometragem'
                            label='Quilometragem'
                            type="numeric"
                            Tamanho="pequeno"
                        />
                    </View>

                    <View className="w-full flex-row justify-between ">
                        <InputAuth
                            control={control}
                            rules={rules.capacidade}
                            name="capacidade"
                            id='capacidade'
                            placeholder='Capacidade'
                            label='Capacidade (T)'
                            type="numeric"
                            Tamanho="pequeno"
                        />
                    </View>
                </View>

                <View className="w-full items-end pt-5 pr-2.5">
                    <ButtonPadrao
                        title='Cadastrar'
                        onPress={() => { }}
                        typeButton='normal'
                        classname=' px-5 '
                    />
                </View>

            </ScrollView>
            <AlertNotioncation
                visible={false}
                status={true}
                messagem={'fsdf'}
                onDismiss={() => { }}
            />
        </KeyboardAvoidingView>
    );
}
export default RegisterVehicle;