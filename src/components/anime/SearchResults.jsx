import Loader from "../ui/Loader";
import List from "../ui/List";
import SearchResultItem from "./SearchResultItem";
import ErrorMessage from "../ui/ErrorMessage";
import { useAnimes } from "../../hooks/useAnimes";
import { useSearchParams } from "react-router";
import styles from "./SearchResults.module.css";

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
        <div className={styles.container}>
            {isLoading && <Loader content="results" />}
            {!isLoading && !error && (
                <>
                    <div className={styles.header}>
                        <p className={styles.count}>
                            Found <strong>{results.length}</strong> {results.length === 1 ? "result" : "results"}
                        </p>
                    </div>

                    <List items={results} ItemComponent={SearchResultItem} emptyMessage="No animes match your search query." />
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}
