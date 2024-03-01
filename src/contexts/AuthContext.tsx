import React, {createContext, ReactNode, useEffect, useState} from "react";

import {auth} from "../firebase/firebaseconfig.ts";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User,
    sendPasswordResetEmail
} from "firebase/auth";
import LoadingSpinner from "../components/spinner/LoadingSpinner.tsx";


export interface AuthProviderProps {
    children: ReactNode;
}


export interface AuthContextType {
    user: User | null

    login(email: string, password: string): Promise<UserCredential>

    createUser(email: string, password: string): Promise<UserCredential>

    logout(): Promise<void>

    resetPassword(email: string): Promise<void>
}

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    // STATES
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);

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

    // Reset password
    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        // Set up a listener for changes in the authentication state
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
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
        resetPassword,
    }

    /*
        Timing Issue Without this approach

        - The onAuthStateChanged listener might not have updated the user state before the useAuth hook is called within the ProtectedRoute component.
          Ensure that the onAuthStateChanged listener has completed before the useAuth hook is invoked (in ProtectedRoute).

        - To handle this, you can add a loading state to your AuthProvider to indicate when the authentication state is still being fetched.

        - Shows loading screen while fetching Observable Information (Listener from Firebase) with the below If Statement

     */
    if (loading) {
        // Return a loading indicator or null
        return <LoadingSpinner />;
    }

    return (
        <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
    );
};
