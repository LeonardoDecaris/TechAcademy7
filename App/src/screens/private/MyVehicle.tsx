import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, RefreshControl, View, Text, Alert } from 'react-native'

import TopoMyVehicle from '@/src/components/base/TopoMyVehicle';
import InformationBox from '@/src/components/form/InformarionBox';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import { BASE_URL } from '@env';

function MyVehicle() {
	const [refreshing, setRefreshing] = useState(false);
	const {getVehicleData, veiculo} = useGetVehicleData();
	const {userData,getUserData} = useGetUserData();

	const imagemUrl = veiculo?.veiculo?.imagemVeiculo?.imgUrl ? `${BASE_URL}${veiculo.veiculo.imagemVeiculo.imgUrl}` : '';
console.log('imagemUrl', imagemUrl);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await getVehicleData();
		await getUserData();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		getVehicleData();
		getUserData();
	}, [getVehicleData, getUserData]);

	return (
		<View style={{ flex: 1, paddingTop: 10 }}>
			<ScrollView contentContainerStyle={{flexGrow: 1 , paddingHorizontal: 10, paddingBottom: 20}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} >

				<TopoMyVehicle
					modelo={veiculo?.veiculo?.modelo || 'Não informado'}
					marca={veiculo?.veiculo?.marca || 'Não informado'}
					quilometragem={veiculo?.veiculo?.quilometragem || 'Não informado'}
					ano={veiculo?.veiculo?.ano || 'Não informado'}
					imagem={imagemUrl}
					placa={veiculo?.veiculo?.placa || 'Não informado'}
				/>

				<View className='pb-4'>
					<InformationBox
						title='Capacidade'
						descricao={veiculo?.veiculo?.capacidade + ' toneladas' || 'Não informado'}
					/>
				</View>

				<View className='w-full bg-white rounded-xl p-2.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
					<Text className='text-base font-bold'>Motorista</Text>
					<Text className='text-sm font-semibold text-black/60'>Motorista: {userData?.nome} </Text>
					<Text className='text-sm font-semibold text-black/60'>Email: {userData?.email}</Text>
					<Text className='text-sm font-semibold text-black/60'>Categoria: {userData?.cnh}</Text>
				</View>

				<View className=' flex-1 flex-row justify-between gap-4 items-end pt-5'>
					<ButtonPadrao
						title='Excluir'
						classname='w-[48%] '
						typeButton='logOutExcluir'
						onPress={() => { Alert.alert('Excluir veículo em desenvolvimento') }}
					/>
					<ButtonPadrao
						title='Editar'
						classname='w-[48%] '
						typeButton='normal'
						onPress={() => { Alert.alert('Editar veículo em desenvolvimento') }}
					/>

				</View>
			</ScrollView>
		</View>
	)
}
export default MyVehicle;