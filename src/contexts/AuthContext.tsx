import React, {createContext, ReactNode, useEffect, useState} from "react";

import {auth} from "../firebase/firebaseconfig.ts";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User
} from "firebase/auth";


export interface AuthProviderProps {
    children: ReactNode;
}


export interface AuthContextType {
    user: User | null

    login(email: string, password: string): Promise<UserCredential>

    createUser(email: string, password: string): Promise<UserCredential>

    logout(): Promise<void>

    loading: boolean
}

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    // STATES
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false);


    // Login
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Create User
    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Logout
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        // Set up a listener for changes in the authentication state
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setLoading(true)
            setUser(currentUser);
            setLoading(false)
        })

        return () => {
            unsub();
        }
    }, []);

    const contextValues: AuthContextType = {
        login,
        createUser,
        logout,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
    );
};
