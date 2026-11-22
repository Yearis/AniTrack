/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext();

const initialState = {
    user: null,
    isLoading: true,
};

function reducer(state, action) {
    switch (action.type) {
        case "setuser":
            return { ...state, isLoading: false, user: action.payload };

        default:
            throw new Error("Unknown Action");
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user, isLoading } = state;

    // as we talk to the session of the browser
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            dispatch({ type: "setuser", payload: session?.user ?? null });
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            dispatch({ type: "setuser", payload: session?.user ?? null });
        });

        return () => subscription.unsubscribe();
    }, []);

    // login
    async function login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return data;
    }

    // signup
    async function signup(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        return data;
    }

    // logout
    async function logout() {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
    }

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
