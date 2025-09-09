import { Image, Text, View } from "react-native";

interface Props {
	modelo?: string;
	marca?: string;
	quilometragem?: number;
	ano?: number;
	placa?: string;
}

const TopoMyVehicle = (props: Props) => {
	const modeloStyle = "text-2xl font-bold";
	const marcaStyle = "text-base font-semibold text-black/60";
	const quilometragemStyle = "text-base font-semibold text-black/60 bg-[#D0EBBC] p-2 rounded-lg";

	const anoPlacaStyle = "w-[48%] text-black/80 font-semibold text-lg text-center bg-[#98C2F4] py-2.5 rounded-lg";
	const anoPlacaInternoStyle = "text-black/60 text-base";

	return (
		<View className="pb-5">


			<View className="flex-row justify-between  items-start">
				<View>
					<Text className={modeloStyle}>{props.modelo}</Text>
					<Text className={marcaStyle}>{props.marca}</Text>
				</View>
				<Text className={quilometragemStyle}>{props.quilometragem} km</Text>
			</View>

			<View className="w-full py-5">
				<Image source={require('../../assets/image/meu.avif')} className="w-full h-48 rounded-lg  " />
			</View>

			<View className="flex-row justify-between w-full">
				<Text className={`${anoPlacaStyle}`}>Placa: <Text className={anoPlacaInternoStyle}>{props.placa}</Text></Text>
				<Text className={`${anoPlacaStyle}`}>Ano: <Text className={anoPlacaInternoStyle}>{props.ano}</Text></Text>
			</View>

		</View>
	);
};

export default TopoMyVehicle;