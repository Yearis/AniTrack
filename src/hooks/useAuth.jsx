import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth was used outside the AuthProvider");
    }

    return context;
}
