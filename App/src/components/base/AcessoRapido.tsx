import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
interface Props {
    title: string;
    onPress: () => void;
}

const AcessoRapido = ({ title, onPress }: Props) => {

    const containerStyle = 'flex-row justify-between items-center';
    const textStyle = ' font-bold text-[#322F2F]';
    const buttonStyle = 'bg-[#322F2F] p-3 rounded-[8px]';

    return (
        <View className={containerStyle} style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 24 }}>
            <Text className={textStyle}>
                {title}
            </Text>
            <TouchableOpacity onPress={onPress} className={buttonStyle}>
                <AntDesign name="arrowright" size={16} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default AcessoRapido;    