import { useDiscover } from "../hooks/useDiscover";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import AnimeCard from "./AnimeCard";
import List from "./List";

export default function Discover({
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    const {
        results: trendingAnime,
        isLoading: trendingLoading,
        error: trendingError,
    } = useDiscover("TRENDING_DESC");

    const {
        results: popularAnime,
        isLoading: popularLoading,
        error: popularError,
    } = useDiscover("POPULARITY_DESC");

    const {
        results: highestRatedAnime,
        isLoading: highestRatedLoading,
        error: highestRatedError,
    } = useDiscover("SCORE_DESC");

    return (
        <div className="discover">
            {/* section for trending anime's */}
            <section className="discover-section">
                <h3>Trending Animes</h3>

                {trendingLoading && <Loader content="Trending Animes" />}
                {!trendingLoading && !trendingError && (
                    <List
                        items={trendingAnime}
                        ItemComponent={AnimeCard} // COMPONENT
                        favouritesList={favouritesList}
                        handleClickDetails={handleClickDetails}
                        handleAddElementsToFavourites={
                            handleAddElementsToFavourites
                        }
                        handleDeleteElementsToFavourites={
                            handleDeleteElementsToFavourites
                        }
                    />
                )}
                {trendingError && <ErrorMessage message={trendingError} />}
            </section>

            {/* section for popular anime's */}
            <section className="discover-section">
                <h3>Popular Animes</h3>

                {popularLoading && <Loader content="Popular Animes" />}
                {!popularLoading && !popularError && (
                    <List
                        items={popularAnime}
                        ItemComponent={AnimeCard}
                        favouritesList={favouritesList}
                        handleClickDetails={handleClickDetails}
                        handleAddElementsToFavourites={
                            handleAddElementsToFavourites
                        }
                        handleDeleteElementsToFavourites={
                            handleDeleteElementsToFavourites
                        }
                    />
                )}
                {popularError && <ErrorMessage message={popularError} />}
            </section>

            {/* section for highest rated anime's */}
            <section className="discover-section">
                <h3>Highest Rated</h3>

                {highestRatedLoading && (
                    <Loader content="Highest Rated Animes" />
                )}
                {!highestRatedLoading && !highestRatedError && (
                    <List
                        items={highestRatedAnime}
                        ItemComponent={AnimeCard}
                        favouritesList={favouritesList}
                        handleClickDetails={handleClickDetails}
                        handleAddElementsToFavourites={
                            handleAddElementsToFavourites
                        }
                        handleDeleteElementsToFavourites={
                            handleDeleteElementsToFavourites
                        }
                    />
                )}
                {highestRatedError && (
                    <ErrorMessage message={highestRatedError} />
                )}
            </section>
        </div>
    );
}
