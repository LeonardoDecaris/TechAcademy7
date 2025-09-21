

interface UseNewPassword {
    newPassword: string;
    confirmPassword: string;
    onChange: (field: string, value: string) => void;
    onSubmit: () => void;
}

function useNewPassword() {
    const useNewPassword = () => {

    }
    return { useNewPassword }
}

export default useNewPassword;