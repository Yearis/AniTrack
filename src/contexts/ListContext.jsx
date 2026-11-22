/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "../hooks/useAuth";

const ListContext = createContext();

const initialState = {
    lists: [],
    savedAnimes: [],
    reviews: [],
    isLoading: false,
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true, error: "" };

        case "dataLoaded":
            return {
                ...state,
                isLoading: false,
                lists: action.payload.lists,
                savedAnimes: action.payload.savedAnimes,
                reviews: action.payload.reviews || [],
                error: "",
            };

        case "listCreated":
            return {
                ...state,
                lists: [...state.lists, action.payload],
            };

        case "animeAdded":
            return {
                ...state,
                savedAnimes: [...state.savedAnimes, action.payload],
            };

        case "animeDeleted":
            return {
                ...state,
                savedAnimes: state.savedAnimes.filter(
                    (item) =>
                        !(
                            item.list_id === action.payload.listId &&
                            item.anime_id === action.payload.animeId
                        ),
                ),
            };

        case "reviewUpdated": {
            const exists = state.reviews.some(
                (r) => String(r.anime_id) === String(action.payload.anime_id),
            );
            return {
                ...state,
                reviews: exists
                    ? state.reviews.map((r) =>
                          String(r.anime_id) === String(action.payload.anime_id)
                              ? action.payload
                              : r,
                      )
                    : [...state.reviews, action.payload],
            };
        }

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        case "reset":
            return { ...initialState };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

function ListProvider({ children }) {
    const { user } = useAuth();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { lists, savedAnimes, reviews, isLoading, error } = state;

    // Fetch user lists & saved entries on mount / user change
    useEffect(() => {
        if (!user) {
            dispatch({ type: "reset" });
            return;
        }

        async function fetchUserData() {
            dispatch({ type: "loading" });

            try {
                const { data: listsData, error: listsError } = await supabase
                    .from("lists")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (listsError) throw listsError;

                const { data: savedData, error: savedError } = await supabase
                    .from("saved")
                    .select("*");

                if (savedError) throw savedError;

                const { data: reviewsData, error: reviewsError } = await supabase
                    .from("reviews")
                    .select("*");

                if (reviewsError) throw reviewsError;

                dispatch({
                    type: "dataLoaded",
                    payload: {
                        lists: listsData || [],
                        savedAnimes: savedData || [],
                        reviews: reviewsData || [],
                    },
                });
            } catch (err) {
                dispatch({ type: "rejected", payload: err.message });
            }
        }

        fetchUserData();
    }, [user]);

    // Create a new list
    async function createList(name) {
        if (!user) return;

        const trimmedName = name?.trim();

        if (!trimmedName) {
            throw new Error("List name cannot be empty.");
        }

        const exists = lists.some(
            (l) => l.name.toLowerCase() === trimmedName.toLowerCase(),
        );

        if (exists) {
            throw new Error(`A list named "${trimmedName}" already exists!`);
        }

        try {
            const { data, error } = await supabase
                .from("lists")
                .insert([{ name: trimmedName }])
                .select()
                .single();

            if (error) throw error;

            dispatch({ type: "listCreated", payload: data });
            return data;
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
            throw err;
        }
    }

    // Add an anime to a list
    async function addToList(listId, anime) {
        if (!user) return;

        try {
            const newEntry = {
                list_id: listId,
                anime_id: anime.id,
                anime_title:
                    anime.title?.english || anime.title?.romaji || anime.title,
                anime_image:
                    anime.coverImage?.medium ||
                    anime.coverImage?.large ||
                    anime.image,
            };

            const { data, error } = await supabase
                .from("saved")
                .insert([newEntry])
                .select()
                .single();

            if (error) throw error;

            dispatch({ type: "animeAdded", payload: data });
            return data;
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
            throw err;
        }
    }

    // Delete an anime from a list
    async function deleteFromList(listId, animeId) {
        if (!user) return;

        try {
            const { error } = await supabase
                .from("saved")
                .delete()
                .match({ list_id: listId, anime_id: animeId });

            if (error) throw error;

            dispatch({
                type: "animeDeleted",
                payload: { listId, animeId },
            });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
            throw err;
        }
    }

    // Convenient toggle for checkboxes
    async function toggleAnimeInList(listId, anime, isCurrentlyInList) {
        if (isCurrentlyInList) {
            await deleteFromList(listId, anime.id);
        } else {
            await addToList(listId, anime);
        }
    }

    // Rate an anime in Supabase reviews table
    async function rateAnime(animeId, rating) {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from("reviews")
                .upsert(
                    {
                        user_id: user.id,
                        anime_id: animeId,
                        rating: rating,
                    },
                    { onConflict: "user_id, anime_id" },
                )
                .select()
                .single();

            if (error) throw error;

            dispatch({ type: "reviewUpdated", payload: data });
            return data;
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
            throw err;
        }
    }

    return (
        <ListContext.Provider
            value={{
                lists,
                savedAnimes,
                reviews,
                isLoading,
                error,
                createList,
                addToList,
                deleteFromList,
                toggleAnimeInList,
                rateAnime,
            }}
        >
            {children}
        </ListContext.Provider>
    );
}

export { ListContext, ListProvider };
