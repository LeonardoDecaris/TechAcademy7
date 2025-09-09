import { Image, Text, View } from "react-native";

const CardDeliveryTime = () => {
    return (
        <View className="w-[48%] p-2.5 pt-5 bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            <Text className="text-lg font-semibold">Prazo de entrega</Text>

            <Text className="font-semibold text-sm opacity-60">Empresa:  <Text>Coamo</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Tipo: <Text>Cooperativa</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Avaliação: <Text>Muito Alta</Text></Text>
        </View>
    );
}

export default CardDeliveryTime