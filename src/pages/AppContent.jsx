import { useSearchParams } from "react-router";
import SearchResults from "../components/anime/SearchResults";
import Discover from "../components/anime/Discover";

export default function AppContent() {
    const [searchParams] = useSearchParams();

    const hasQuery = searchParams.get("query");
    const hasGenre = searchParams.get("genre");
    const hasFormat = searchParams.get("format");
    const hasStatus = searchParams.get("status");

    const isSearching = Boolean(hasQuery || hasGenre || hasFormat || hasStatus);

    return isSearching ? <SearchResults /> : <Discover />;
}

