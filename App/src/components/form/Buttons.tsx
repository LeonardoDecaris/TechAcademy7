import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface ButtonProps {
	title: string;
	onPress?: () => void;
	typeButton?: 'normal' | 'logOutExcluir' | 'aceite';
	classname?: string;
	disabled?: boolean;
	accessibilityLabel?: string;
	loading?: boolean;
}

const ButtonPadrao = ({ title, onPress, typeButton = 'normal', classname, accessibilityLabel, loading, disabled = false }: ButtonProps) => {

	const buttonStyles = {
		normal: 'bg-[#322F2F]',
		logOutExcluir: 'bg-red-500',
		aceite: 'bg-green-500',
	};

	const spinner = <ActivityIndicator size="small" color="#fff" />;

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`py-2.5 rounded-lg flex-row justify-center ${buttonStyles[typeButton]} ${classname} ${disabled ? 'opacity-50' : ''}`}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel || title}
			disabled={disabled}
		>
			{loading ? (
				<>
					{spinner}
					<Text className='text-white text-center font-bold text-lg'> Loading</Text>
				</>
			) : (
				<Text className='text-white text-center font-bold text-lg'>{title}</Text>
			)}
		</TouchableOpacity>
	);
}

const ButtonUpload = ({ title, onPress, classname, disabled, accessibilityLabel }: ButtonProps) => {

	const buttonStyles = "py-2 px-4 rounded-lg border border-black bg-[#322F2F]";
	const titleStyles = "text-white text-base text-center font-bold";

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${buttonStyles} ${classname} ${disabled ? 'opacity-50' : ''}`}
			disabled={disabled}
			accessibilityRole="button"
			accessibilityState={disabled ? { disabled: true } : undefined}
			accessibilityLabel={accessibilityLabel || title}
		>
			<Text className={titleStyles}>{title}</Text>
		</TouchableOpacity>
	);
}

export { ButtonPadrao, ButtonUpload };
