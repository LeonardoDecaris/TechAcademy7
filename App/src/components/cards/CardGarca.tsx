import { Text, View } from "react-native";

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

const CardCarga = (props: CardCargaProps) => {
    return (
        <View className="w-full p-2.5 bg-white rounded-2xl " style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)" }}>
            <View>
                <Text>{props.nome}</Text>
            </View>
        </View>
    );
}

export default CardCarga;