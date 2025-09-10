import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';
import { Image, ScrollView, RefreshControl, TouchableOpacity, View, Text } from 'react-native';

import { BASE_URL } from '@env';

import { useAuth } from '@/src/context/AuthContext';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import AlertLogout from '@/src/components/modal/AlertLogout';
import CardFreight from '@/src/components/cards/CardFreight';
import VehicleCard from '@/src/components/cards/VehicleCard';
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardMyContract from '@/src/components/cards/CardMyContract';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import AlertNotNullVehiculo from '@/src/components/modal/AlertNotNullVehiculo';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const greetingTextStyle = 'text-2xl font-bold';
const avatarTextStyle = 'text-[20px] font-bold text-white';
const headerLeftRowStyle = 'flex-row items-center gap-2.5';
const headerRowStyle = 'flex-row items-center justify-between pb-10';
const avatarWrapperStyle = 'h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center';

const Home = () => {
    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>();
    const { getVehicleData, veiculo: data } = useGetVehicleData();
    const { userData, getUserData, iniciasNomeUsuario, nomeAbreviado, closeSuccessNotification, mensage, success, successVisible } = useGetUserData();

    const [button, setButton] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showNoVehicle, setShowNoVehicle] = useState(false);

    const imagemUrl = useMemo(
        () => (userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''),
        [userData?.imagemUsuario?.imgUrl]
    );

    const imagemVeiculo = useMemo(
        () => (data?.veiculo?.imagemVeiculo?.imgUrl ? `${BASE_URL}${data.veiculo.imagemVeiculo.imgUrl}` : ''),
        [data?.veiculo?.imagemVeiculo?.imgUrl]
    );

    const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);
    const goDetailsEnvio = useCallback(() => navigation.navigate('DetailsEnvio'), [navigation]);

    const goMyVehicle = useCallback(() => {
        if (data?.veiculo) {
            navigation.navigate('MyVehicle');
            setButton(true);
        } else {
            setShowNoVehicle(true);
            setButton(false);
        }
    }, [data?.veiculo, navigation]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await Promise.all([getUserData(), getVehicleData()]);
        } finally {
            setRefreshing(false);
        }
    }, [getUserData, getVehicleData]);

    const handleLogout = useCallback(async () => { await logout(); navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] }); }, [logout, navigation]);

    const handleDevPress = useCallback(() => {
        alert('Esta em Desenvolvimento');
    }, []);

    const handleConfirmCreateVehicle = useCallback(() => {
        setShowNoVehicle(false);
        navigation.navigate('RegisterVehicle');
    }, [navigation]);

    const handleCancelCreateVehicle = useCallback(() => {
        setShowNoVehicle(false);
    }, []);

    useEffect(() => {
        (async () => {
            await Promise.all([getUserData(), getVehicleData()]);
        })();
    }, [getUserData, getVehicleData]);

    const insets = useSafeAreaInsets();

    const containerStyle = useMemo(() => ({ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top + 10 }), [insets.top]);

    return (
        <View style={containerStyle}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                <View className={headerRowStyle}>
                    <View className={headerLeftRowStyle}>
                        <TouchableOpacity onPress={goProfile} className={avatarWrapperStyle} accessibilityLabel="Ir para perfil">
                            {imagemUrl ? (
                                <Image source={{ uri: imagemUrl }} className='w-[50px] h-[50px] rounded-full bg-gray-200' />
                            ) : (
                                <Text className={avatarTextStyle}>{iniciasNomeUsuario}</Text>
                            )}
                        </TouchableOpacity>
                        <Text className={greetingTextStyle}>Olá, {nomeAbreviado ?? 'Usuário'}!</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowLogout(true)}
                        accessibilityLabel="Abrir modal de logout"
                    >
                        <Ionicons name="log-out-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <CardMyContract
                    motorista={userData?.nome}
                    nome="Sem carga"
                    tipo="Nenhum"
                    peso="0"
                    saida="Nenhum"
                    destino="Nenhum"
                    logoEmpresa=""
                    imagemCarga=""
                    valor="Sem valor"
                    onPress={handleDevPress}
                />

                <AcessoRapido onPress={goDetailsEnvio} title='Detalhes do envio' />

                <CardFreight
                    tipo="Nenhum"
                    peso="0"
                    destino="Nenhum"
                    progresso={0}
                    TypeButton={true}
                    onPress={goDetailsEnvio}
                />

                <AcessoRapido onPress={goMyVehicle} title='Meu Veículo' />

                <VehicleCard
                    onPress={goMyVehicle}
                    TypeButton={button}
                    modelo={data?.veiculo?.modelo}
                    marca={data?.veiculo?.marca}
                    ano={data?.veiculo?.ano}
                    placa={data?.veiculo?.placa}
                    imagem={imagemVeiculo}
                />
            </ScrollView>

            <AlertLogout
                visible={showLogout}
                onCancel={() => setShowLogout(false)}
                onConfirm={async () => {
                    setShowLogout(false);
                    await handleLogout();
                }}
            />

         	<AlertNotioncation
                    visible={successVisible}
                    status={success}
                    messagem={mensage}
                    onDismiss={closeSuccessNotification}
                />

            <AlertNotNullVehiculo
                visible={showNoVehicle}
                onCancel={handleCancelCreateVehicle}
                onConfirm={handleConfirmCreateVehicle}
                confirmText="Cadastrar"
                cancelText="Fechar"
                title="Nenhum veículo cadastrado"
                message="Você ainda não possui veículo cadastrado. Deseja cadastrar agora?"
            />
        </View>
    );
};

export default memo(Home);