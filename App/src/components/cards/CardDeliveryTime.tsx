import { Text, View } from "react-native";

interface CardDeliveryTimeProps {
    destino?: string;
    distancia?: number;
    prazo?: number;
}
const CardDeliveryTime = (props: CardDeliveryTimeProps) => {
    return (
        <View className="w-[48%] p-2.5 pt-5 bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            <Text className="text-lg font-semibold">Dados do envio</Text>

            <Text className="font-semibold text-sm opacity-60">Destino  <Text>{props.destino}</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Distancia <Text>{props.distancia} km</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Prazo <Text>{props.prazo} dias uteis</Text></Text>
        </View>
    );
}

export default CardDeliveryTime