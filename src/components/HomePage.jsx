import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { LogOut, Sun, Moon } from "lucide-react";

export default function HomePage() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

    const userName =
        user?.user_metadata?.name ||
        user?.user_metadata?.username ||
        user?.email?.split("@")[0] ||
        "User";
    const userEmail = user?.email || "";
    const userInitial = (userName?.[0] || "U").toUpperCase();

    async function handleLogout() {
        setIsUserDialogOpen(false);
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    }

    return (
        <div className="homepage">
            <header className="homepage-header">
                <div className="homepage-brand">
                    <img
                        src="/favicon.svg"
                        alt="AniTrack Logo"
                        className="homepage-logo"
                    />
                    <span className="homepage-title">AniTrack</span>
                </div>

                <nav className="homepage-nav">
                    <button
                        type="button"
                        className="theme-toggle-btn homepage-theme-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {user ? (
                        <button
                            type="button"
                            className="homepage-user-profile-btn"
                            onClick={() => setIsUserDialogOpen(true)}
                        >
                            <div className="sidebar-avatar-circle">{userInitial}</div>
                            <div className="sidebar-user-text">
                                <span className="sidebar-user-name">{userName}</span>
                                <span className="sidebar-user-email">{userEmail}</span>
                            </div>
                        </button>
                    ) : (
                        <Link to="/login" className="homepage-login-btn">
                            LOGIN
                        </Link>
                    )}
                </nav>
            </header>

            {isUserDialogOpen && (
                <div
                    className="homepage-user-dialog-backdrop"
                    onClick={() => setIsUserDialogOpen(false)}
                >
                    <div
                        className="user-dialog-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="user-dialog-header">
                            <div className="sidebar-avatar-circle large">
                                {userInitial}
                            </div>
                            <div className="user-dialog-details">
                                <strong className="user-dialog-name">
                                    {userName}
                                </strong>
                                <small className="user-dialog-email">
                                    {userEmail}
                                </small>
                            </div>
                        </div>
                        <div className="user-dialog-divider" />
                        <button
                            type="button"
                            className="user-dialog-logout-btn"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}

            <main className="homepage-hero">
                <div className="homepage-hero-content">
                    <h1 className="homepage-heading">
                        You watch anime.
                        <br />
                        AniTrack keeps track of your journey.
                    </h1>

                    <p className="homepage-description">
                        A focused dashboard that tracks your favorite series,
                        seasonal releases, and recommendations in real time.
                        Never lose track of what to watch next.
                    </p>

                    <Link to="/app" className="homepage-cta-btn">
                        START TRACKING NOW
                    </Link>
                </div>
            </main>
        </div>
    );
}
