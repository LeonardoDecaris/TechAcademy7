import { Image, Text, View } from "react-native";
import { ButtonPadrao } from "../form/Buttons";

interface Props {
	modelo?: string;
	marca?: string;
	ano?: string;
	placa?: string;
	chassis?: string;
	onPress?: () => void
}

const VehicleCard = (props: Props) => {
	return (
		<View className="w-full flex-row justify-between px-2.5 pb-3 pt-5 bg-white rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.35)]">

			{!props.modelo && !props.marca && !props.ano && !props.placa && !props.chassis ? (
				<View className="flex-1 items-center justify-center">
					<Text className="text-[16px] font-bold text-black/60 pb-2">Não tem Veiculo Cadastrado</Text>
					<ButtonPadrao
						title="Cadastrar Veículo"
						classname="px-2"
						onPress={props.onPress}
					/>
				</View>
			) : (
				<>
					<View>
						<Text className="text-[16px] font-bold">{props.modelo}</Text>
						<Text className="text-[12px] font-semibold text-black/60">{props.marca}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Ano: {props.ano}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Placa: {props.placa}</Text>
						<Text className="text-[12px] font-semibold text-black/60">Chassis: {props.chassis}</Text>
					</View>
					<View className="w-[40%]">
						<Image source={require('../../assets/image/Caminhão.png')} className="w-full h-36 " resizeMode="contain" />
					</View>
				</>
			)}

		</View>
	);
};


export default VehicleCard;
