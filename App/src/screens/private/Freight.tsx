import CardCargo from "@/src/components/cards/CardCargo";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Constants from "expo-constants";
import { useCallback, useMemo, useState } from "react";
import { TouchableOpacity, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight;
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

function Freight() {
	const [refreshing, setRefreshing] = useState(false);
	const [query, setQuery] = useState('');
	const [data, setData] = useState<FreightItem[]>(MOCK_DATA);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		// TODO: chamada real à API
		await new Promise(r => setTimeout(r, 500));
		setRefreshing(false);
	}, []);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data;
		return data.filter(f =>
			f.saida?.toLowerCase().includes(q) ||
			f.destino?.toLowerCase().includes(q) ||
			f.nome?.toLowerCase().includes(q)
		);
	}, [data, query]);

	const navigation = useNavigation<NavigationProp>();

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
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 6, marginTop: statusBarHeight + 12}}>
			<View className="pb-2.5">
				<Text className="text-2xl font-extrabold text-center">Fretes Disponiveis</Text>
			</View>

				<View className="flex-row items-center bg-neutral-100 rounded-xl px-3 mb-4">
					<TextInput
						placeholder="Buscar (origem, destino, produto)"
						className="flex-1 py-2 text-sm"
						value={query}
						onChangeText={setQuery}
						returnKeyType="search"
					/>
					{query.length > 0 && (
						<Text
							onPress={() => setQuery('')}
							className="text-xs text-neutral-500"
						>
							Limpar
						</Text>
					)}
				</View>

				<FlatList
					data={filtered}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					ItemSeparatorComponent={() => <View className="h-5" />}
					contentContainerStyle={{ paddingBottom: 130 }}
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
		</SafeAreaView>
	)
}

export default Freight;