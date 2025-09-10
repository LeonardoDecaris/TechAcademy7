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
    quantity?: number;
    placeholder?: string;
    desabilitar?: boolean;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
    Tamanho?: 'normal' | 'pequeno';
    inputProps?: Partial<React.ComponentProps<typeof TextInput>>;
}

interface PropsController extends PropsLabel, PropsInput {
    name: string;
    span?: string;
    control: Control<any>;
    rules?: RegisterOptions;
    statusInput?: 'normal' | 'error';
    config?: 'padrao' | 'password' | 'cpf';
}

const spanStyle = 'text-red-500 text-sm pl-2.5';
const labelStyle = 'font-semibold text-base pl-2.5 pb-0.5';
const campoBloqueado = 'font-semibold text-base pl-2.5 text-red-500/80';
const inputStyle = 'w-full py-2.5 px-2 font-semibold text-base border rounded-lg bg-white';
const inputPasswordStyle = 'w-[85%] py-2.5 px-2 text-base font-semibold border rounded-lg bg-white';
const mostrarPasswordStyle = 'flex items-center justify-center py-1.5 px-1.5 border border-black/40 rounded-lg bg-white shadow-[0_2px_4px_rgba(0,0,0,0.25)]';

const STATUS_INPUT: Record<'normal' | 'error', string> = {
    normal: ' text-black/80 border-black/40 shadow-[0_2px_4px_rgba(0,0,0,0.25)] ',
    error: 'text-red-500 border-red-500/40 shadow-[0_2px_4px_rgba(255,0,0,0.25)] placeholder:text-red-500/80'
};

const InputAuth = ({ label, labelProps, name, control, rules, span, statusInput, id, type, placeholder, secureTextEntry, inputProps, config, Tamanho = 'normal', quantity, desabilitar, ...rest }: PropsController) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const status = error ? 'error' : (statusInput || 'normal');

                const handleChange = (text: string) => {
                    if (config === 'cpf') {
                        const digits = text.replace(/\D/g, '');
                        onChange(digits);
                    } else {
                        onChange(text);
                    }
                };

                return (
                    <View className={`flex-col ${Tamanho === 'normal' ? 'w-full' : 'w-[48%]'} `}>
                        <Text className={`${labelStyle} ${status === 'error' ? 'text-red-500/80' : 'text-black/80'}`} {...labelProps}>
                            {label} {desabilitar && <Text className={campoBloqueado}> - Campo bloqueado</Text>}
                        </Text>

                        {config === 'password' ? (
                            <PasswordInput
                                id={id}
                                type={type}
                                placeholder={placeholder}
                                inputPasswordStyle={inputPasswordStyle}
                                statusInput={STATUS_INPUT[status]}
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
                                className={`${inputStyle} ${STATUS_INPUT[status]}`}
                                onChangeText={handleChange}
                                secureTextEntry={secureTextEntry}
                                maxLength={quantity || undefined}
                                editable={!desabilitar}
                                value={config === 'cpf' ? maskCpf(String(value ?? '')) : value}
                                {...rest}
                                {...inputProps}
                            />
                        )}

                        {(error?.message || span) && (
                            <Text className={spanStyle} children={error?.message || span} />
                        )}
                    </View>
                );
            }}
        />
    );
};

interface PropsPasswordInput {
    rest: any;
    id?: string;
    value: string;
    statusInput: string;
    placeholder?: string;
    inputPasswordStyle: string;
    type?: KeyboardTypeOptions;
    mostrarPasswordStyle: string;
    onChange: (text: string) => void;
    inputProps?: Partial<React.ComponentProps<typeof TextInput>>;
}

const PasswordInput = ({ id, type, placeholder, inputPasswordStyle, statusInput, rest, onChange, value, inputProps, mostrarPasswordStyle }: PropsPasswordInput) => {
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