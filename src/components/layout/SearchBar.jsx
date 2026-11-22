import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ ref, query, setDetailId, setQuery }) {
    return (
        <form
            className={styles.searchBar}
            onSubmit={(e) => {
                e.preventDefault();
                ref?.current?.blur();
            }}
        >
            <Search size={17} className={styles.searchIcon} />

            <input
                ref={ref}
                className={styles.searchInput}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (typeof setDetailId === "function") setDetailId(null);
                }}
                placeholder="Search anime..."
            />

            {!query && <span className={styles.shortcut}>Space</span>}

            {query && (
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => {
                        setQuery("");
                        if (typeof setDetailId === "function") setDetailId(null);
                        ref?.current?.focus();
                    }}
                    title="Clear search"
                >
                    <X size={15} />
                </button>
            )}
        </form>
    );
}
