import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	title: string;
	onPress?: () => void;
	typeButton?: 'normal' | 'logOutExcluir' | 'aceite';
	classname?: string;
	disabled?: boolean;
	accessibilityLabel?: string;
}

const ButtonPadrao = ({ title, onPress, typeButton = 'normal', classname, accessibilityLabel }: ButtonProps) => {

	const buttonStyles = {
		normal: 'bg-[#322F2F]',
		logOutExcluir: 'bg-red-500',
		aceite: 'bg-green-500',
	}

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`py-2.5 rounded-lg ${buttonStyles[typeButton]} ${classname}`}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel || title}
		>
			<Text className='text-white text-center font-bold text-lg'>{title}</Text>
		</TouchableOpacity>
	);
}

const ButtonUpload = ({ title, onPress, classname, disabled, accessibilityLabel }: ButtonProps) => {

	const buttonStyles = "py-2 px-4 rounded-lg border border-black bg-[#322F2F]";
	const titleStyles = "text-white text-base text-center font-bold";

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${buttonStyles} ${classname}`}
			disabled={disabled}
			accessibilityRole="button"
			accessibilityState={disabled ? { disabled: true } : undefined}
			accessibilityLabel={accessibilityLabel || title}
		>
			<Text className={titleStyles}>{title}</Text>
		</TouchableOpacity>
	);
}

export {ButtonPadrao, ButtonUpload};
