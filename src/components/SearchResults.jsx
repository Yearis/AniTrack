import Loader from "./Loader";
import List from "./List";
import SearchResultItem from "./SearchResultItem";
import ErrorMessage from "./ErrorMessage";
import { useAnimes } from "../hooks/useAnimes";
import { useSearchParams } from "react-router";

export default function SearchResults() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const genre = searchParams.get("genre") || "";
    const format = searchParams.get("format") || "";
    const status = searchParams.get("status") || "";

    const { results, isLoading, error } = useAnimes(
        query,
        genre,
        format,
        status,
    );

    return (
        <div className="search-results">
            {isLoading && <Loader content="" />}
            {!isLoading && !error && (
                <>
                    <p className="search-results-count">{`Found ${results.length} results`}</p>

                    <List items={results} ItemComponent={SearchResultItem} />
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}
