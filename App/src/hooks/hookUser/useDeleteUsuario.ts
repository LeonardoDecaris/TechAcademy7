import { useAuth } from "@/src/context/AuthContext";
import http from "@/src/service/httpAxios";
import { useCallback } from "react";

interface UseDeleteUsuario {
	deleteUsuario: () => Promise<void>;
}


function useDeleteUsuario(): UseDeleteUsuario {
	const { userId, logout } = useAuth();

	if (!userId) {
		console.error("User ID is not available");
	}
	
	const deleteUsuario = useCallback(async () => {
		try {
			console.log("Usuário com ID:", userId);
			await http.delete(`usuario/${userId}`);
			console.log("Usuário deletado com sucesso!");
			logout();
		} catch (error) {
			console.error("Erro ao deletar usuário:", error);
		}
	}, [userId]);

	return { deleteUsuario };
}

export default useDeleteUsuario;