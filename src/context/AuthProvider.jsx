import React, { createContext, useState } from 'react';

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [auth, setAuth] = useState(false)
    const [level, setLevel] = useState("easy")
    const [name, setName] = useState("")


    const value = {auth, setAuth, level, setLevel, name, setName}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;