import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, RefreshControl, View, Text, Alert } from 'react-native'

import TopoMyVehicle from '@/src/components/base/TopoMyVehicle';
import InformationBox from '@/src/components/form/InformarionBox';
import { ButtonPadrao } from '@/src/components/form/Buttons';

function MyVehicle() {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setRefreshing(false);
	}, []);

	const InformartionStyle = "w-full flex-row items-center border border-black rounded-lg p-1.5"

	return (
		<View style={{ flex: 1, paddingTop: 10 }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} >

				<TopoMyVehicle
					modelo="FH16 540"
					marca="Volvo"
					quilometragem={12.499}
					ano={2000}
					placa="ABC-1234"
				/>

				<View className='pb-4'>
					<InformationBox
						title='Capacidade'
						descricao='20 Toneladas'
					/>
				</View>

				<View className='w-full bg-white rounded-xl p-2.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
					<Text className='text-base font-bold'>Motorista</Text>
					<Text className='text-sm font-semibold text-black/60'>Motorista: Lucas Carvalho Pedrozo</Text>
					<Text className='text-sm font-semibold text-black/60'>Email: lucaspedroozo@hotmail.com</Text>
					<Text className='text-sm font-semibold text-black/60'>Categoria: B</Text>
				</View>

				<View className='flex-row justify-between gap-4 items-center pt-5'>
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