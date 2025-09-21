import React, { memo, useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import useEditVehicle from '@/src/hooks/hookVehicle/useEditVehicle';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import AlertNotification from '@/src/components/modal/AlertNotification';

type FieldName = 'marca' | 'modelo' | 'placa' | 'anoFabricacao' | 'quilometragem' | 'capacidade';

const formWrapperStyle = 'w-full flex-col gap-1.5';
const actionsWrapperStyle = 'w-full items-end pt-5 pr-2.5';

const EditVehicle = () => {
    const { getVehicleData, veiculo } = useGetVehicleData();
    const { control, closeNotification, handleEditar, handleSubmit, loading, message, status, notificationVisible, rules, setValue } = useEditVehicle(veiculo?.veiculo_id || 0, veiculo?.veiculo?.imagemVeiculo?.id_imagemVeiculo || 0);

    useEffect(() => {
        getVehicleData();
    }, [getVehicleData]);

    useEffect(() => {
        if (!veiculo) return;
        const fields: Record<string, string> = {
            marca: veiculo.veiculo.marca || '',
            modelo: veiculo.veiculo.modelo || '',
            placa: veiculo.veiculo.placa || '',
            ano: veiculo.veiculo.ano || '',
            quilometragem: veiculo.veiculo.quilometragem || '',
            capacidade: veiculo.veiculo.capacidade || '',
        };

        Object.entries(fields).forEach(([field, value]) => {
            const stringValue = value !== undefined && value !== null ? String(value) : '';
            setValue(field as any, stringValue, { shouldDirty: false });
        });
    }, [veiculo, setValue]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40, paddingTop: 20, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className={formWrapperStyle}>
                    <InputAuth
                        control={control}
                        rules={rules.marca}
                        name={'marca'}
                        id="marca"
                        placeholder="Marca do veículo"
                        label="Marca"
                    />

                    <InputAuth
                        control={control}
                        rules={rules.modelo}
                        name={'modelo'}
                        id="modelo"
                        placeholder="Modelo do veículo"
                        label="Modelo"
                    />

                    <InputAuth
                        control={control}
                        rules={rules.placa}
                        name={'placa'}
                        id="placa"
                        placeholder="ABC1234"
                        label="Placa"
                        quantity={7}
                    />

                    <View className="w-full flex-row justify-between">
                        <InputAuth
                            control={control}
                            rules={rules.ano}
                            name={'ano'}
                            id="ano"
                            placeholder="Ano de fabricação"
                            label="Ano de fabricação"
                            type="numeric"
                            quantity={4}
                            Tamanho="pequeno"
                        />

                        <InputAuth
                            id="quilometragem"
                            name={'quilometragem'}
                            placeholder="Quilometragem"
                            label="Quilometragem"
                            type="numeric"
                            Tamanho="pequeno"
                            control={control}
                            rules={rules.quilometragem}
                        />
                    </View>
                    <InputAuth
                        control={control}
                        rules={rules.capacidade}
                        name={'capacidade'}
                        id="capacidade"
                        placeholder="Capacidade"
                        label="Capacidade (T)"
                        type="numeric"
                        quantity={8}
                        Tamanho="pequeno"
                    />
                </View>

                <View className={actionsWrapperStyle}>
                    <ButtonPadrao
                        title={loading ? 'Salvando' : 'Salvar'}
                        onPress={handleSubmit(handleEditar)}
                        disabled={loading}
                        typeButton="normal"
                        classname="px-5"
                    />
                </View>
            </ScrollView>

            <AlertNotification
                visible={notificationVisible}
                status={status as 'success' | 'error' | 'loading'}
                messagem={message}
                onDismiss={closeNotification}
                topOffset={30}
            />
        </KeyboardAvoidingView>
    );
};

export default memo(EditVehicle);