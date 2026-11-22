import { Search, X } from "lucide-react";

export default function SearchBar({ ref, query, setDetailId, setQuery }) {
    return (
        <form
            className="search-bar"
            onSubmit={(e) => {
                e.preventDefault();
                ref?.current?.blur();
            }}
        >
            <input
                ref={ref}
                className="search-input"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (typeof setDetailId === "function") setDetailId(null);
                }}
                placeholder="Search anime... (Space to focus)"
            />
            {query && (
                <button
                    type="button"
                    className="search-clear-btn"
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
            <button
                type="submit"
                className="search-btn"
                onClick={() => ref?.current?.focus()}
            >
                <Search size={18} />
            </button>
        </form>
    );
}
