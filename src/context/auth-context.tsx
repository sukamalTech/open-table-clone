'use client'
import React, { useState, createContext } from 'react'

interface User {
    id: string,
    email: string
}
interface State {
    loading: boolean,
    data: string | null,
    error: string | null,
    isSignIn? :boolean,
    isSuccessfulSignUp?:boolean
}

export interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthinticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    isSignIn:false,
    isSuccessfulSignUp:false,
    setAuthState: () => { }
})

export default function AuthContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null,
        isSignIn:false,
        isSuccessfulSignUp:false,
    })
    return (
        < AuthinticationContext.Provider
            value={{
                ...authState,
                setAuthState,
            }}
        >
            {children}
        </ AuthinticationContext.Provider >
    )
}



