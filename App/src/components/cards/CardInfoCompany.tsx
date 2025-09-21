import { BASE_URL } from "@env";
import { Text, View, Image } from "react-native";

interface CardInfoCompanyProps {
    nomeEmpresa?: string;
    tipo?: string;
    avaliacao?: number;
    imagem?: string;
}

const CardInfoCompany = (props: CardInfoCompanyProps) => {

    const imagemUrl =`${BASE_URL}${props.imagem}`;

    return (
        <View className="w-[48%] p-2.5 pt-5 bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            <View className="w-1/2 pb-2">
                {imagemUrl ? (
                    <Image source={{ uri: imagemUrl }} className="w-full h-7 " style={{ resizeMode: 'contain' }} />
                ) : (
                    <Text className="font-semibold text-lg">Nome</Text>
                )}
            </View>

            <Text className="font-semibold text-sm opacity-60">Empresa:  <Text>{props.nomeEmpresa}</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Tipo: <Text>{props.tipo}</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Avaliação: <Text>{props.avaliacao} / 5</Text></Text>
        </View>
    );
}

export default CardInfoCompany;
