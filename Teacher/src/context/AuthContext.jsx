import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {
    // Admin state
    const [isAdmin, setIsAdmin] = useState(false);
    // Teacher state
    const [isTeacher, setIsTeacher] = useState(false);

    // Optional: persist login in localStorage
    useEffect(() => {
        const savedAdmin = localStorage.getItem("isAdmin") === "true";
        const savedTeacher = localStorage.getItem("isTeacher") === "true";
        setIsAdmin(savedAdmin);
        setIsTeacher(savedTeacher);
    }, []);

    // Admin login/logout
    const loginAdmin = () => {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
    };
    const logoutAdmin = () => {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
    };

    // Teacher login/logout
    const loginTeacher = () => {
        setIsTeacher(true);
        localStorage.setItem("isTeacher", "true");
    };
    const logoutTeacher = () => {
        setIsTeacher(false);
        localStorage.removeItem("isTeacher");
    };

    return (
        <AuthContext.Provider value={{
            isAdmin,
            loginAdmin,
            logoutAdmin,
            isTeacher,
            loginTeacher,
            logoutTeacher
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
