import { Image, Text, View } from "react-native";

const CardDeliveryTime = () => {
    return(
        <View className="w-full p-2.5 pt-5 bg-white rounded-2xl " style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)" }}>
            <View className="mb-5">
                <Text className="text-xl font-extrabold">Prazo de entrega</Text>
            </View>


            <Text className="font-bold text-base opacity-50 mb-2">Empresa:  <Text>Coamo</Text></Text>
            <Text className="font-bold text-base opacity-50 mb-2">Tipo: <Text>Cooperativa</Text></Text>
            <Text className="font-bold text-base opacity-50">Avaliação: <Text>Muito Alta</Text></Text>
        </View>
    );
}

export default CardDeliveryTime