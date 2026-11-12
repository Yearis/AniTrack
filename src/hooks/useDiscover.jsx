import { useState, useEffect } from "react";

export function useDiscover(sort) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
                setIsLoading(true);
                setError("");

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

                setResults(result.data.Page.media);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
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
