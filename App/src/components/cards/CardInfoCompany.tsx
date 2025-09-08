import { Text, View, Image } from "react-native";

const CardInfoCompany = () => {
    return (
        <View className="w-full p-2.5 pt-5 bg-white rounded-2xl " style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)" }}>
            <View className="w-1/2 mb-3">
                <Image source={require('../../assets/image/coamo.png')} style={{ resizeMode: 'contain' }}/>
            </View>

            <Text className="font-bold text-base opacity-50 mb-2">Empresa:  <Text>Coamo</Text></Text>
            <Text className="font-bold text-base opacity-50 mb-2">Tipo: <Text>Cooperativa</Text></Text>
            <Text className="font-bold text-base opacity-50">Avaliação: <Text>Muito Alta</Text></Text>
        </View>
    );
}

export default CardInfoCompany;
