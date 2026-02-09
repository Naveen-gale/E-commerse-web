import React, { createContext, useContext } from 'react'

const authContext = createContext()

export const useAuth = () => {
    return useContext(authContext)
}

const AuthProvider = ({ children }) => {
    // Automatically use the same hostname (IP) as the frontend
    const serverurl = `http://${window.location.hostname}:3000`
    const value = {
        serverurl,
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider