import { Link } from "react-router";

export default function PageNotFound() {
    return (
        <div className="not-found">
            <header className="not-found-header">
                <Link to="/" className="not-found-brand">
                    <img
                        src="/favicon.svg"
                        alt="AniTrack Logo"
                        className="not-found-logo"
                    />
                    <span className="not-found-title">AniTrack</span>
                </Link>
            </header>

            <main className="not-found-content">
                <span className="not-found-code">404</span>
                <h1 className="not-found-heading">Page Not Found</h1>
                <p className="not-found-description">
                    The page you are looking for does not exist, has been
                    removed, or is temporarily unavailable.
                </p>

                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn not-found-btn-secondary">
                        Back to Home
                    </Link>
                    <Link to="/app" className="not-found-btn not-found-btn-primary">
                        Go to App
                    </Link>
                </div>
            </main>
        </div>
    );
}
