import { useState } from "react";

import { maskCpf } from "@/src/utils/funcoes";
import Entypo from "@expo/vector-icons/build/Entypo";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PropsLabel {
    label?: string;
    labelProps?: Partial<React.ComponentProps<typeof Text>>;
}

interface PropsInput {
    id?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
    inputProps?: Partial<React.ComponentProps<typeof TextInput>>;
    desabilitar?: boolean;
}

interface PropsController extends PropsLabel, PropsInput {
    name: string;
    span?: string;
    control: Control<any>;
    rules?: RegisterOptions;
    status?: 'normal' | 'error';
    config?: "padrao" | "password" | "cpf";
}


const InputAuth = ({ label, labelProps, name, control, rules, span, status, status: statusProp, id, type, placeholder, secureTextEntry, inputProps, config, desabilitar, ...rest }: PropsController) => {

    const spanStyle = "text-red-500 text-[10px] pl-2.5";
    const labelStyle = "font-semibold text-[14px] pl-2.5";
    const campoBloqueado = "font-semibold text-[14px] pl-2.5 text-red-500/80";
    const inputStyle = "w-full p-2.5 font-semibold border rounded-lg bg-white";

    const inputPasswordStyle = "w-[85%] p-2.5 font-semibold border rounded-lg bg-white";
    const mostrarPasswordStyle = "flex items-center justify-center py-2 px-2 border border-black/40 rounded-lg bg-white shadow-[0_2px_4px_rgba(0,0,0,0.25)]";

    const StatusInput = {
        normal: ' text-black/80 border-black/40 shadow-[0_2px_4px_rgba(0,0,0,0.25)] ',
        error: 'text-red-500 border-red-500/40 shadow-[0_2px_4px_rgba(255,0,0,0.25)] placeholder:text-red-500/80'
    };

    return (
        <Controller control={control} name={name} rules={rules} render={({ field: { onChange, value }, fieldState: { error } }) => {
             const status = error ? 'error' : (statusProp || 'normal');
             const trataOnChange = (text: string) => { if (config === "cpf") { const digits = text.replace(/\D/g, ""); onChange(digits); } else { onChange(text); } };

                return (
                    <View className="w-full flex flex-col">
                        <Text className={`${labelStyle} ${status === 'error' ? 'text-red-500/80' : 'text-black/80'}`}  {...labelProps} >
                            {label} {desabilitar && <Text className={`${campoBloqueado}`}> - Campo bloqueado</Text>}
                        </Text>
                        
                        {config === "password" ? (
                            <PasswordInput
                                id={id}
                                type={type}
                                placeholder={placeholder}
                                inputPasswordStyle={inputPasswordStyle}
                                statusInput={StatusInput[status]}
                                onChange={onChange}
                                value={value}
                                rest={rest}
                                inputProps={inputProps}
                                mostrarPasswordStyle={mostrarPasswordStyle}
                            />
                        ) : (
                            <TextInput
                                id={id}
                                keyboardType={type}
                                placeholder={placeholder}
                                className={`${inputStyle} ${StatusInput[status]}`}
                                onChangeText={trataOnChange}
                                secureTextEntry={secureTextEntry}
                                editable={!desabilitar}
                                value={config === "cpf" ? maskCpf(String(value ?? "")) : value}
                                {...rest}
                                {...inputProps}
                            />
                        )}

                        {error?.message || span ? (
                            <Text  className={spanStyle} children={error?.message || span} />
                        ) : null}

                    </View>
                );
            }}
        />
    );
};

const PasswordInput = ({ id, type,  placeholder, inputPasswordStyle, statusInput, onChange, value, rest, inputProps, mostrarPasswordStyle}: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full flex-row items-center gap-1.5 justify-between ">
            <TextInput
                id={id}
                keyboardType={type}
                placeholder={placeholder}
                className={`${inputPasswordStyle} ${statusInput}`}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                value={value}
                {...rest}
                {...inputProps}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} className={mostrarPasswordStyle}>
                {showPassword ? (
                    <Entypo name="eye-with-line" size={24} color="black" />
                ) : (
                    <Entypo name="eye" size={24} color="black" />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default InputAuth;