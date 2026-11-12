import Loader from "./Loader";
import List from "./List";
import SearchResultItem from "./SearchResultItem";
import ErrorMessage from "./ErrorMessage";
import { useAnimes } from "../hooks/useAnimes";

export default function SearchResults({
    query,
    genre,
    status,
    format,
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    // hook
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

                    <List
                        items={results}
                        ItemComponent={SearchResultItem} // COMPONENT
                        favouritesList={favouritesList}
                        handleClickDetails={handleClickDetails}
                        handleAddElementsToFavourites={
                            handleAddElementsToFavourites
                        }
                        handleDeleteElementsToFavourites={
                            handleDeleteElementsToFavourites
                        }
                    />
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}
