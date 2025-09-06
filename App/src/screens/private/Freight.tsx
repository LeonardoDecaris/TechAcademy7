import CardCargo from "@/src/components/cards/CardCargo";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCallback, useState } from "react";
import { TouchableOpacity, FlatList, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface CardCargaProps {
	nome?: string;
	tipo?: string;
	peso?: string;
	saida?: string;
	destino?: string;
	logoEmpresa?: string;
	imagemCarga?: string;
	valor?: string;
}

type FreightItem = CardCargaProps & {
	id: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

function Freight() {
	const [refreshing, setRefreshing] = useState(false);
	const [query, setQuery] = useState('');
	const [data, setData] = useState<FreightItem[]>(MOCK_DATA);
	const [filtered, setFiltered] = useState<FreightItem[]>(MOCK_DATA);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setRefreshing(false);
	}, []);

	const navigation = useNavigation<NavigationProp>();
	const insets = useSafeAreaInsets();

	const renderItem = ({ item }: { item: FreightItem }) => (
		<TouchableOpacity onPress={() => navigation.navigate('DetailsFreight', { freight: item })}>
			<CardCargo
				nome={item.nome}
				tipo={item.tipo}
				peso={item.peso}
				saida={item.saida}
				destino={item.destino}
				logoEmpresa={item.logoEmpresa}
				imagemCarga={item.imagemCarga}
				valor={item.valor}
			/>
		</TouchableOpacity>
	);

	return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top + 10 }}>
			<View className="pb-2.5">
				<Text className="text-2xl font-extrabold text-center">Fretes Disponiveis</Text>
			</View>

			<FlatList
				data={filtered}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View className="h-5" />}
				contentContainerStyle={{ paddingBottom: 30, paddingHorizontal:20 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={
					<View className="items-center mt-16">
						<Text className="text-neutral-500">Nenhum frete encontrado</Text>
					</View>
				}
			/>
		</View>
	)
}

export default Freight;



const MOCK_DATA: FreightItem[] = [
	{
		id: '1',
		nome: 'Carga de Soja',
		tipo: 'Grãos',
		peso: '32.000 kg',
		saida: 'Curitiba',
		destino: 'São Paulo',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'soja.png',
		valor: '3.200,00'
	},
	{
		id: '2',
		nome: 'Carga de Milho',
		tipo: 'Grãos',
		peso: '18.000 kg',
		saida: 'Londrina',
		destino: 'Maringá',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'milho.png',
		valor: '1.800,00'
	},
	{
		id: '3',
		nome: 'Farelo Proteico',
		tipo: 'Farelo',
		peso: '25.000 kg',
		saida: 'Cascavel',
		destino: 'Curitiba',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'farelo.png',
		valor: '2.500,00'
	},
	{
		id: '4',
		nome: 'Carga de Trigo',
		tipo: 'Grãos',
		peso: '29.000 kg',
		saida: 'Ponta Grossa',
		destino: 'Paranaguá',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'trigo.png',
		valor: '2.900,00'
	},
	{
		id: '5',
		nome: 'Carga de Arroz',
		tipo: 'Grãos',
		peso: '30.000 kg',
		saida: 'Maringá',
		destino: 'Curitiba',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'arroz.png',
		valor: '3.000,00'
	},
	{
		id: '6',
		nome: 'Carga de Milho',
		tipo: 'Grãos',
		peso: '18.000 kg',
		saida: 'Londrina',
		destino: 'Maringá',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'milho.png',
		valor: '1.800,00'
	},
	{
		id: '7',
		nome: 'Farelo Proteico',
		tipo: 'Farelo',
		peso: '25.000 kg',
		saida: 'Cascavel',
		destino: 'Curitiba',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'farelo.png',
		valor: '2.500,00'
	},
	{
		id: '8',
		nome: 'Carga de Trigo',
		tipo: 'Grãos',
		peso: '29.000 kg',
		saida: 'Ponta Grossa',
		destino: 'Paranaguá',
		logoEmpresa: 'coamo.png',
		imagemCarga: 'trigo.png',
		valor: '2.900,00'
	}
];
