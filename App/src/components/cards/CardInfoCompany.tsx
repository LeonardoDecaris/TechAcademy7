import { Text, View, Image } from "react-native";

const CardInfoCompany = () => {
    const imagem = require('../../assets/image/coamo.png');


    return (
        <View className="w-[48%] p-2.5 pt-5 bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            <View className="w-1/2 pb-2">
                {imagem ? (
                    <Image source={imagem} style={{ resizeMode: 'contain' }} />
                ) : (
                    <Text className="font-semibold text-lg">Nome</Text>
                )}
            </View>

            <Text className="font-semibold text-sm opacity-60">Empresa:  <Text>Coamo</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Tipo: <Text>Cooperativa</Text></Text>
            <Text className="font-semibold text-sm opacity-60">Avaliação: <Text>Muito Alta</Text></Text>
        </View>
    );
}

export default CardInfoCompany;
