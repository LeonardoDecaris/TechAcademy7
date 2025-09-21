import { BASE_URL } from "@env";
import { Image, Text, View } from "react-native";

interface TopoDetailsCargoProps {
	nome?: string;
	destino?: string;
	saida?: string;
	tipo?: string;
	peso?: string;
	valor?: string | number;
	valorFrete?: string | number;
	descricao?: string;
	imagem?: string;
}

const formatBRL = (raw: string | number | undefined, mostrarSimbolo: boolean = true) => {
	if (raw === undefined || raw === null || raw === '') return '0,00';
	const cleaned = String(raw)
		.replace(/[^0-9,.-]/g, '')
		.replace(/\.(?=[0-9]{3}(?:\.|,|$))/g, '')
		.replace(',', '.');
	const num = Number(cleaned);
	if (isNaN(num)) return '0,00';
	const valor = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	return mostrarSimbolo ? `R$ ${valor}` : valor;
};

const TopoDetailsCargo = ({ nome, destino, saida, tipo, peso, valor, valorFrete, imagem }: TopoDetailsCargoProps) => {
	const modeloStyle = "text-2xl font-bold";
	const marcaStyle = "text-base font-semibold text-black/60";
	const quilometragemStyle = "text-base font-semibold text-black/60 bg-[#D0EBBC] p-2 rounded-lg";

	const legendaValorStyle = "w-[48%] text-black/80 font-semibold text-base text-center bg-[#98C2F4] py-2.5 rounded-lg";
	const anoPlacaInternoStyle = "text-black/60 text-sm";

	const imagemCarga = `${BASE_URL}${imagem}`

	return (
		<View className="pb-5">
			<View className="flex-row justify-between items-start">
				<View>
					<Text className={modeloStyle}>{nome || '-'}</Text>
					<Text className={marcaStyle}>Destino: {destino || '-'}</Text>
					{saida && <Text className="text-sm font-semibold text-black/50">Saída: {saida}</Text>}
				</View>
				<Text className={quilometragemStyle}>{tipo || '-'} <Text>/ {peso || ''}t</Text></Text>
			</View>

			<View className="w-full py-5">
				<Image source={{ uri: imagemCarga }} style={{ resizeMode: 'contain' }} className="w-full h-44 rounded-lg" />
			</View>

			<View className="flex-row justify-between w-full">
				<Text className={legendaValorStyle}>Frete: <Text className={anoPlacaInternoStyle}>{formatBRL(valorFrete)}</Text></Text>
				<Text className={legendaValorStyle}>Valor: <Text className={anoPlacaInternoStyle}>{formatBRL(valor)}</Text></Text>
			</View>
		</View>
	);
};

export default TopoDetailsCargo;