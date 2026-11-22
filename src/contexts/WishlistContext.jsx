/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { useLists } from "../hooks/useLists";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const { lists, savedAnimes, addToList, deleteFromList, createList } =
        useLists();

    // Default playlist for the heart button and sidebar favourites
    const watchlist =
        lists.find(
            (l) =>
                l.name.toLowerCase() === "watchlist" ||
                l.name.toLowerCase() === "favourites" ||
                l.name.toLowerCase() === "favorites",
        ) || lists[0];

    // Filter saved entries for the default watchlist and map to expected shape
    const favouritesList = watchlist
        ? savedAnimes
              .filter((entry) => entry.list_id === watchlist.id)
              .map((entry) => ({
                  id: entry.anime_id,
                  savedId: entry.id,
                  image: entry.anime_image,
                  title: {
                      english: entry.anime_title,
                      romaji: entry.anime_title,
                  },
              }))
        : [];

    async function handleAddElementsToFavourites(anime) {
        let targetList = watchlist;

        if (!targetList) {
            targetList = await createList("Watchlist");
        }

        await addToList(targetList.id, anime);
    }

    async function handleDeleteElementsToFavourites(animeId) {
        if (!watchlist) return;
        await deleteFromList(watchlist.id, animeId);
    }

    return (
        <WishlistContext.Provider
            value={{
                favouritesList,
                handleAddElementsToFavourites,
                handleDeleteElementsToFavourites,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export { WishlistContext, WishlistProvider };
