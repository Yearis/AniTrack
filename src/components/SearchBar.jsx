import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ ref, query, setQuery }) {
    const [inputValue, setInputValue] = useState(query);

    return (
        <form
            className="search-bar"
            onSubmit={(e) => {
                e.preventDefault();
                // Submitting keeps the form from reloading the page
                // and you can blur the input if desired on Enter
                ref?.current?.blur();
            }}
        >
            <input
                ref={ref}
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
            />
            <button
                type="submit"
                className="search-btn"
                onClick={() => ref?.current?.focus()}
            >
                <Search size={20} />
            </button>
        </form>
    );
}
