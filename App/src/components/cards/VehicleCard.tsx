import { Image, Text, TouchableOpacity, View } from "react-native";
import { ButtonPadrao } from "../form/Buttons";

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
	codigo?: number;
	modelo?: string;
	marca?: string;
	ano?: string;
	imagem?: string;
	placa?: string;
	chassis?: string;
	onPress?: () => void
	TypeButton?: boolean;
}

const VehicleCard = (props: Props) => {

	const navigation = useNavigation<NavigationProp>();
	const handleNavigation = {
        RegisterVehicle: () => navigation.navigate('RegisterVehicle'),
    };

	
	return (
		<TouchableOpacity {...(props.TypeButton ? { onPress: props.onPress } : {activeOpacity: 1})} className="w-full flex-row justify-between px-2.5 pb-3 pt-5 bg-white rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.35)]">

			{!props.codigo ? (
				<View className="flex-1 items-center justify-center">
					<Text className="text-[16px] font-bold text-black/60 pb-2">Não tem Veiculo Cadastrado</Text>
					<ButtonPadrao
						title="Cadastrar Veículo"
						classname="px-2"
						onPress={handleNavigation.RegisterVehicle}
					/>
				</View>
			) : (
				<>
					<View className="w-[50%]">
						<Text className="text-[16px] font-bold">{props.modelo}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Marca: {props.marca}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Ano: {props.ano}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Placa: {props.placa}</Text>
					</View>
					<View className="w-[50%]">
						<Image source={{ uri: props.imagem }} className="w-full h-36 rounded-md" style={{ resizeMode: 'contain' }} />
					</View>
				</>
			)}

		</TouchableOpacity>
	);
};


export default VehicleCard;
