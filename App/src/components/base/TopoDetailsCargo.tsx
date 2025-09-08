import { Image, Text, View } from "react-native";

interface TopoDetailsCargoProps {
	nome?: string;
	destino?: string;
	saida?: string;
	tipo?: string;
	peso?: string;
	valor?: string;
	valorFrete?: string;
	descricao?: string;
}

const TopoDetailsCargo = ({ nome, destino, saida, tipo, peso, valor, valorFrete, descricao }: TopoDetailsCargoProps) => {
	const modeloStyle = "text-2xl font-bold";
	const marcaStyle = "text-base font-semibold text-black/60";
	const quilometragemStyle = "text-base font-semibold text-black/60 bg-[#D0EBBC] p-2 rounded-lg";

	const anoPlacaStyle = "w-[48%] text-black/80 font-semibold text-lg text-center bg-[#98C2F4] py-2.5 rounded-lg";
	const anoPlacaInternoStyle = "text-black/60 text-base";

	return (
		<View className="pb-5">
			<View className="flex-row justify-between items-start">
				<View>
					<Text className={modeloStyle}>{nome || '-'}</Text>
					<Text className={marcaStyle}>Destino: {destino || '-'}</Text>
					{saida && <Text className="text-sm font-semibold text-black/50">Saída: {saida}</Text>}
				</View>
				<Text className={quilometragemStyle}>{tipo || '-'} <Text>{peso || ''}</Text></Text>
			</View>

			<View className="w-full py-5">
				<Image source={require('../../assets/image/carga.png')} style={{ resizeMode: 'contain' }} className="w-full h-44 rounded-lg" />
			</View>

			<View className="flex-row justify-between w-full">
				<Text className={anoPlacaStyle}>Frete: <Text className={anoPlacaInternoStyle}>{valorFrete || '-'}</Text></Text>
				<Text className={anoPlacaStyle}>Valor/C: R$ <Text className={anoPlacaInternoStyle}>{valor || '-'}</Text></Text>
			</View>
		</View>
	);
};

export default TopoDetailsCargo;