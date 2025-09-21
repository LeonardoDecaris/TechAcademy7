import { BASE_URL } from "@env";
import { Image, Text, View } from "react-native";

interface CardCargaProps {
    nome?: string;
    tipo?: string;
    peso?: string;
    saida?: string;
    destino?: string;
    logoEmpresa?: string;
    imagemCarga?: string;
    valorFrete?: string | number;
    descricao?: string;
}

const formatBRL = (raw: string | number | undefined) => {
    if (raw === undefined || raw === null || raw === '') return 'R$ 0,00';
    const cleaned = String(raw)
        .replace(/[^0-9,.-]/g, '')
        .replace(/\.(?=[0-9]{3}(?:\.|,|$))/g, '')
        .replace(',', '.');
    const num = Number(cleaned);
    if (isNaN(num)) return 'R$ 0,00';
    const valor = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `R$ ${valor}`;
};

const CardCargo = (props: CardCargaProps) => {
    
    const imagemUrl = `${BASE_URL}${props.logoEmpresa}`;
    const imagemCargaUrl = `${BASE_URL}${props.imagemCarga}`;

    return (
        <View className="w-full p-2.5 pt-5 bg-white rounded-2xl " style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)" }}>
            <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold ">{props.nome}</Text>
                <View className="flex-row">
                    <Text className="text-[14px] font-semibold text-black">
                        {props.tipo} <Text className="text-[14px] font-semibold text-black/60">/ {props.peso}t</Text>
                    </Text>
                </View>
            </View>
            <View className="flex-row justify-between items-end gap-2">
                <View>
                    <Text className="text-[12px] font-semibold text-black/60">Saída: {props.saida}</Text>
                    <Text className="text-[12px] font-semibold text-black/60">Destino: {props.destino}</Text>
                    {props.logoEmpresa ? (
                        <Image source={{ uri: imagemUrl }} className="w-20 h-7 " style={{ resizeMode: 'contain' }} />
                    ) : (
                        <Text className="font-semibold text-sm opacity-60">Empresa</Text>
                    )}
                    <Text className="text-[14px] font-semibold text-black">Valor: {formatBRL(props.valorFrete)}</Text>
                </View>
                {props.imagemCarga ? (
                    <Image source={{ uri: imagemCargaUrl }} className="w-[50%] h-20 rounded-lg" style={{ resizeMode: 'cover' }} />
                ) : (
                    <Image source={require('../../assets/image/carga.png')} className="w-[50%] h-20 rounded-lg" style={{ resizeMode: 'cover' }} />
                )}
            </View>
        </View>
    );
}
export default CardCargo;