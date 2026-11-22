import { Link } from "react-router";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.brand}>
                    <img
                        src="/favicon.svg"
                        alt="AniTrack Logo"
                        className={styles.logo}
                    />
                    <span className={styles.brandTitle}>AniTrack</span>
                </Link>
            </header>

            <main className={styles.content}>
                <span className={styles.code}>404</span>
                <h1 className={styles.heading}>Page Not Found</h1>
                <p className={styles.description}>
                    The page you are looking for does not exist, has been
                    removed, or is temporarily unavailable.
                </p>

                <div className={styles.actions}>
                    <Link to="/" className={styles.secondaryBtn}>
                        Back to Home
                    </Link>
                    <Link to="/app" className={styles.primaryBtn}>
                        Go to App
                    </Link>
                </div>
            </main>
        </div>
    );
}
