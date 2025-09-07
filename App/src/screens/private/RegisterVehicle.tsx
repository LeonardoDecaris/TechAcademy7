import { Platform, ScrollView, View } from "react-native";

import InputAuth from "@/src/components/form/InputAuth";
import { ButtonPadrao } from "@/src/components/form/Buttons";
import AlertNotioncation from "@/src/components/modal/AlertNotioncation";
import { KeyboardAvoidingView } from "react-native";

import useRegisterVehicle from "@/src/hooks/post/useRegisterVehicle";

function RegisterVehicle() {
    const { control, handleSubmit, rules, errors, watch } = useRegisterVehicle();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 10, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
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

                    <View>
                        <InputAuth
                            control={control}
                            rules={rules.anoFabricacao}
                            name="anoFabricacao"
                            id='anoFabricacao'
                            placeholder='Ano de fabricação do veículo'
                            label='Ano de fabricação'
                            type="numeric"
                        />
                        <InputAuth
                            control={control}
                            rules={rules.quilometragem}
                            name="quilometragem"
                            id='quilometragem'
                            placeholder='Quilometragem do veículo'
                            label='Quilometragem'
                            type="numeric"
                        />
                    </View>
                </View>

                <ButtonPadrao
                    title='Entrar'
                    onPress={() => { }}
                    typeButton='normal'
                    classname='w-full my-[20px]'
                />

                <AlertNotioncation
                    visible={false}
                    status={true}
                    messagem={'fsdf'}
                    onDismiss={() => { }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default RegisterVehicle;