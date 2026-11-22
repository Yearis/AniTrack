import { useEffect, useReducer } from "react";

const initialState = {
    results: [],
    isLoading: false,
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "discover/loading":
            return { ...state, isLoading: true, error: "" };

        case "discover/loaded":
            return {
                ...state,
                results: action.payload,
                isLoading: false,
                error: "",
            };

        case "discover/rejected":
            return { ...state, error: action.payload, isLoading: false };

        default:
            throw new Error("Unknown action");
    }
}

export function useDiscover(sort) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { results, isLoading, error } = state;

    useEffect(() => {
        const ANILIST_API = "https://graphql.anilist.co";

        const controller = new AbortController();

        const query = `query (
                $sort: [MediaSort]
            ) {
                Page(page: 1, perPage: 20) {
                    media(
                        type: ANIME
                        sort: $sort
                    ) {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                            medium
                            color
                        }
                        averageScore
                        episodes
                        genres
                        status
                        description(asHtml: false)
                    }
                }
            }
        `;

        async function fetchAnime() {
            try {
                dispatch({ type: "discover/loading" });

                const response = await fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables: { sort },
                    }),
                    signal: controller.signal,
                });

                const result = await response.json();

                if (!response.ok || result.errors) {
                    throw new Error(
                        result.errors?.[0]?.message || "API request failed",
                    );
                }

                dispatch({
                    type: "discover/loaded",
                    payload: result.data.Page.media,
                });
            } catch (err) {
                if (err.name !== "AbortError") {
                    dispatch({
                        type: "discover/rejected",
                        payload: err.message,
                    });
                }
            }
        }

        fetchAnime();

        return () => {
            controller.abort();
        };
        // here sort is not required but added due to react but sort never changes after initial mount
    }, [sort]);

    return { results, isLoading, error };
}
