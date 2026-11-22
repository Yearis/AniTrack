import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

const initialState = {
    isSignUp: false,
    email: "",
    password: "",
    showPassword: false,
    error: "",
    successMessage: "",
    isSubmitting: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "setEmail":
            return { ...state, email: action.payload };

        case "setPassword":
            return { ...state, password: action.payload };

        case "togglePassword":
            return { ...state, showPassword: !state.showPassword };

        case "toggleMode":
            return {
                ...state,
                isSignUp: !state.isSignUp,
                error: "",
                successMessage: "",
            };

        case "submitStart":
            return {
                ...state,
                isSubmitting: true,
                error: "",
                successMessage: "",
            };

        case "submitSuccess":
            return {
                ...state,
                isSubmitting: false,
                successMessage: action.payload || "",
                error: "",
            };

        case "submitError":
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
            };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export default function LoginPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        isSignUp,
        email,
        password,
        showPassword,
        error,
        successMessage,
        isSubmitting,
    } = state;

    const { login, signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: "submitStart" });

        try {
            if (isSignUp) {
                await signup(email, password);
                dispatch({
                    type: "submitSuccess",
                    payload:
                        "Check your email! We sent a confirmation link to activate your account.",
                });
            } else {
                await login(email, password);
                navigate("/app");
            }
        } catch (err) {
            dispatch({
                type: "submitError",
                payload:
                    err.message || "Authentication failed. Please try again.",
            });
        }
    }

    return (
        <div className="auth-page">
            <header className="auth-header">
                <Link to="/" className="auth-brand">
                    <img
                        src="/favicon.svg"
                        alt="AniTrack Logo"
                        className="auth-logo"
                    />
                    <span className="auth-title">AniTrack</span>
                </Link>
            </header>

            <main className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-heading">
                        {isSignUp ? "Create your account" : "Welcome back"}
                    </h1>
                    <p className="auth-subheading">
                        {isSignUp
                            ? "Sign up to create custom lists, rate animes, and track your watch journey."
                            : "Log in to access your personal lists and reviews."}
                    </p>

                    {error && (
                        <div className="auth-alert auth-error">{error}</div>
                    )}
                    {successMessage && (
                        <div className="auth-alert auth-success">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label htmlFor="auth-email">Email Address</label>
                            <input
                                id="auth-email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) =>
                                    dispatch({
                                        type: "setEmail",
                                        payload: e.target.value,
                                    })
                                }
                                required
                                className="auth-input"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="auth-password">Password</label>
                            <div className="auth-password-wrapper">
                                <input
                                    id="auth-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "setPassword",
                                            payload: e.target.value,
                                        })
                                    }
                                    required
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() =>
                                        dispatch({ type: "togglePassword" })
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="auth-btn-loading">
                                    <Loader2
                                        size={16}
                                        className="auth-spinner"
                                    />
                                    {isSignUp
                                        ? "Creating account..."
                                        : "Signing in..."}
                                </span>
                            ) : isSignUp ? (
                                "Sign Up"
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>

                    <div className="auth-toggle">
                        <p>
                            {isSignUp
                                ? "Already have an account?"
                                : "Don't have an account yet?"}{" "}
                            <button
                                type="button"
                                className="auth-toggle-btn"
                                onClick={() =>
                                    dispatch({ type: "toggleMode" })
                                }
                            >
                                {isSignUp ? "Log in" : "Sign up"}
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
