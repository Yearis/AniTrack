import { useState, useEffect } from "react";

export function useAnimes(keyword, genre, format, status) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const ANILIST_API = "https://graphql.anilist.co";

        const controller = new AbortController();

        // const query = `query (
        //         $search: String
        //         $sort: [MediaSort]
        //         $genre: String
        //         $format: MediaFormat
        //         $status: MediaStatus
        //     ) {
        //         Page(page: 1, perPage: 20) {
        //             media(
        //                 type: ANIME
        //                 search: $search
        //                 sort: $sort
        //                 genre: $genre
        //                 format: $format
        //                 status: $status
        //             ) {
        //                 id
        //                 title {
        //                     english
        //                     romaji
        //                 }
        //                 coverImage {
        //                     medium
        //                     color
        //                 }
        //                 format
        //                 startDate {
        //                     year
        //                 }
        //                 averageScore
        //                 episodes
        //                 genres
        //                 status
        //                 description(asHtml: false)
        //             }
        //         }
        //     }
        // `;

        const query = `query (
            $search: String
            $genre: String
            $format: MediaFormat
            $status: MediaStatus
            ) {
            Page(page: 1, perPage: 20) {
                media(
                type: ANIME
                search: $search
                genre: $genre
                format: $format
                status: $status
                ) {
                id

                title {
                    english
                    romaji
                    native
                }

                coverImage {
                    medium
                    large
                    color
                }

                format
                status

                startDate {
                    year
                    month
                    day
                }

                averageScore
                episodes
                duration

                genres

                description(asHtml: false)
                }
            }
        }`;

        const variables = {
            search: keyword || undefined,
            genre: genre || undefined,
            format: format || undefined,
            status: status || undefined,
        };

        async function fetchAnime() {
            try {
                setResults([]);
                setIsLoading(true);
                setError("");

                console.log("Keyword:", keyword);
                console.log("Genre:", genre);
                console.log("Format:", format);
                console.log("Status:", status);
                console.log("Variables:", variables);

                const response = await fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables,
                    }),
                    signal: controller.signal,
                });

                const result = await response.json();

                if (!response.ok || result.errors) {
                    throw new Error(
                        result.errors?.[0]?.message || "API request failed",
                    );
                }

                console.log("API results:", result.data.Page.media);
                console.log("Results count:", result.data.Page.media.length);

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

        const timer = setTimeout(() => {
            fetchAnime();
        }, 400);

        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [keyword, genre, status, format]);

    return { results, isLoading, error };
}
