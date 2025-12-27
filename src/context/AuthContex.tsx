import React, { createContext, useEffect, useReducer, type ReactNode } from 'react';
import { AuthMe } from '../services/AuthService';

interface UserProps {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    token: string | null;
    user: UserProps | null;
    isInitialized: boolean; 
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    user: null,
    isInitialized: false 
};

const authReducer = (state: AuthState, action: any): AuthState => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isInitialized: true
            };
        case "SET_USER":
            return { ...state, user: action.payload, isInitialized: true };
        case "FINISH_INITIALIZATION":
            return { ...state, isInitialized: true };
        case "LOGOUT":
            localStorage.removeItem("token");
            return { token: null, user: null, isInitialized: true };
        default:
            return state;
    }
};

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token && !state.user) {
                try {
                    const userData = await AuthMe(token);
                    if (userData) {
                        dispatch({ type: "SET_USER", payload: userData });
                    } else {
                        dispatch({ type: "LOGOUT" });
                    }
                } catch {
                    dispatch({ type: "LOGOUT" });
                }
            } else {
                dispatch({ type: "FINISH_INITIALIZATION" });
            }
        };
        
        if (!state.isInitialized) {
            initAuth();
        }
    }, [state.isInitialized, state.user]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            
            {state.isInitialized ? children : <div>טוען מערכת...</div>}
        </AuthContext.Provider>
    );
};