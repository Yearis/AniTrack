import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { LogOut, Sun, Moon, Sparkles } from "lucide-react";
import styles from "./HomePage.module.css";

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
        <div className={styles.homepage}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <img
                        src="/favicon.svg"
                        alt="AniTrack Logo"
                        className={styles.logo}
                    />
                    <span className={styles.brandTitle}>AniTrack</span>
                </div>

                <nav className={styles.nav}>
                    <button
                        type="button"
                        className={styles.themeBtn}
                        onClick={toggleTheme}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {user ? (
                        <button
                            type="button"
                            className={styles.userProfileBtn}
                            onClick={() => setIsUserDialogOpen(true)}
                        >
                            <div className={styles.avatarCircle}>{userInitial}</div>
                            <div className={styles.userText}>
                                <span className={styles.userName}>{userName}</span>
                                <span className={styles.userEmail}>{userEmail}</span>
                            </div>
                        </button>
                    ) : (
                        <Link to="/login" className={styles.loginBtn}>
                            LOGIN
                        </Link>
                    )}
                </nav>
            </header>

            {isUserDialogOpen && (
                <div
                    className={styles.dialogBackdrop}
                    onClick={() => setIsUserDialogOpen(false)}
                >
                    <div
                        className={styles.dialogCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.dialogHeader}>
                            <div className={`${styles.avatarCircle} ${styles.large}`}>
                                {userInitial}
                            </div>
                            <div className={styles.dialogDetails}>
                                <strong className={styles.dialogName}>
                                    {userName}
                                </strong>
                                <small className={styles.dialogEmail}>
                                    {userEmail}
                                </small>
                            </div>
                        </div>
                        <div className={styles.dialogDivider} />
                        <button
                            type="button"
                            className={styles.logoutBtn}
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}

            <main className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.pillBadge}>
                        <Sparkles size={14} />
                        <span>Discover, Rate & Organize</span>
                    </div>

                    <h1 className={styles.heading}>
                        You watch anime.
                        <br />
                        <span className={styles.gradientText}>AniTrack</span> keeps track of your journey.
                    </h1>

                    <p className={styles.description}>
                        A focused, beautifully crafted dashboard that tracks your favorite series,
                        seasonal releases, custom playlists, and recommendations in real time.
                    </p>

                    <Link to="/app" className={styles.ctaBtn}>
                        START TRACKING NOW &rarr;
                    </Link>
                </div>
            </main>
        </div>
    );
}
