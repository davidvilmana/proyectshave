import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider');
    }
    return context;
};

const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <authContext.Provider value={{ user, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    );
}