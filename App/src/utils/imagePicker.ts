import * as ImagePicker from 'expo-image-picker';

export const requestPermission = async (type: 'camera' | 'gallery') => {
    if (type === 'camera') {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        return result.granted;
    } else {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return result.granted;
    }
};

export const pickOrTakeImage = async (type: 'camera' | 'gallery') => {
    const hasPermission = await requestPermission(type);
    if (!hasPermission) {
        alert(
            type === 'camera'
                ? 'Permissão para acessar a câmera é necessária!'
                : 'Permissão para acessar a galeria é necessária!'
        );
        return null;
    }

    const pickerFn =
        type === 'camera'
            ? ImagePicker.launchCameraAsync
            : ImagePicker.launchImageLibraryAsync;

    const result = await pickerFn({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
        return result.assets[0].uri;
    }
    return null;
};