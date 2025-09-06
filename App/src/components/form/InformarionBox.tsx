import { Text, View } from "react-native";

interface InformationBoxProps {
    title?: string;
    descricao?: string;
}

const InformationBox = (props: InformationBoxProps) => {
    const InformationStyle = "w-full flex-row items-center border border-black rounded-lg p-1.5"
    return(
        <View className={InformationStyle}>
            <Text className="font-semibold text-[14px]">{props.title}:</Text>
            <Text className="font-medium text-[14px]">{props.descricao}</Text>
        </View>
    );
}

export default InformationBox;