import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, RefreshControl, View, Text } from 'react-native'

import TopoMyVehicle from '@/src/components/base/TopoMyVehicle';
import InformationBox from '@/src/components/form/InformarionBox';

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

				<View className='w-full bg-white rounded-xl p-2.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
					<Text className='text-base font-bold'>Motorista</Text>
					<Text className='text-sm font-semibold text-black/60'>Motorista: Lucas Carvalho Pedrozo</Text>
					<Text className='text-sm font-semibold text-black/60'>Email: lucaspedroozo@hotmail.com</Text>
					<Text className='text-sm font-semibold text-black/60'>Categoria: B</Text>
				</View>

				<View className='w-full flex-col gap-2.5 pt-5'>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					<InformationBox
						title='Teste'
						descricao='Teste'
					/>
					
				</View>
			</ScrollView>
		</View>
	)
}
export default MyVehicle;