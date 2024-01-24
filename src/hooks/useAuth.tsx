import { useContext } from "react";
import {AuthContext, AuthContextType} from "../contexts/AuthContext.tsx";

export const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);

    /*
      This guard is in place to prevent using the useAuth hook in components that are not wrapped by an AuthProvider.
      Since the useAuth hook requires the context values provided by the AuthProvider, this guard ensures that those values are available before using the hook.
    */
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return authContext;
};