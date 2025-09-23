import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface AcessoRapidoPerfilProps {
    titulo: string;
    tipo?: string;
    onPress: () => void;
    loginOut?: boolean;
}

const AcessoRapidoPerfil = ({ titulo, tipo, onPress, loginOut }: AcessoRapidoPerfilProps) => {
	return (
	    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center" >
    
            <View className='flex-row items-center gap-2'>
                <FontAwesome5 name={tipo} size={26} color={loginOut ? "red" : "#575757"} />
                <Text className={loginOut ? 'text-red-600 font-semibold text-base' : 'text-black font-semibold text-base'}>{titulo}</Text>
            </View>

            <AntDesign name="arrowright" size={26} color={loginOut ? "red" : "black"} />
        </TouchableOpacity>
	)
}

export default AcessoRapidoPerfil;
