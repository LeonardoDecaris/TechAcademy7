import { KeyboardTypeOptions, StyleProp, Text, TextInput, TextStyle, View } from "react-native";

interface InputProps {
    // propriedade da label 
    idLabel?: string;
    label?: string;
    styleLabel?: StyleProp<TextStyle>;

    // propriedade do input
    id?: string;
    type?: KeyboardTypeOptions;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    styleInput?: StyleProp<TextStyle>;
    secureTextEntry?: boolean;
    className?: string;
}

const inputPadrao = ({ label, placeholder, type, idLabel, id, onChangeText, styleLabel, styleInput, secureTextEntry, value, className }: InputProps) => {

    const classNameLabel = "font-semibold color-black/80 text-[14px] pl-2.5";
    const classNameInput = "w-full p-2 font-semibold color-black/80 border border-black/40 rounded-lg ";

    return (
        <View className={"w-full flex flex-col"}>

            {/* Label */}
            <Text
                id={idLabel}
                children={label}
                style={styleLabel}
                className={classNameLabel}
            />

            {/* Input */}
            <TextInput
                id={id}
                keyboardType={type}
                className={`${className} ${classNameInput}`}
                style={styleInput}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                value={value}
            />
            
        </View>
    );
};

export default inputPadrao;

// descrição do componente
// Componente de entrada padrão para formulários, com suporte a rótulos, placeholders e tipos de teclado.

// secureTextEntry?: boolean;
// é responsável por ocultar o texto digitado no campo de entrada, útil para senhas.