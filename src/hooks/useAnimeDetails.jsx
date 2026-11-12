import { useState, useEffect } from "react";

export function useAnimeDetails(id) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const ANILIST_API = "https://graphql.anilist.co";

        const controller = new AbortController();

        const query = `query ($id: Int!) {
            Media(id: $id, type: ANIME) {
                id

                # Titles
                title {
                    english
                    romaji
                    native
                }

                # Images
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                bannerImage

                # Description
                description(asHtml: false)

                # General information
                format
                status
                episodes
                duration
                season
                seasonYear
                countryOfOrigin
                source

                # Dates
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }

                # Ratings
                averageScore
                meanScore
                popularity
                favourites

                # Genres and tags
                genres
                tags {
                    name
                    rank
                    description
                }

                # Studios
                studios {
                    nodes {
                        id
                        name
                        isAnimationStudio
                    }
                }

                # Characters and voice actors
                characters(perPage: 10, sort: [ROLE, RELEVANCE]) {
                    edges {
                        role
                        node {
                            id

                            name {
                                full
                            }

                            image {
                                large
                            }
                        }
                        voiceActors(language: JAPANESE, sort: [RELEVANCE]) {
                            id
                            name {
                                full
                            }
                            image {
                                large
                            }
                        }
                    }
                }

                # Related anime
                relations {
                edges {
                    relationType
                        node {
                            id
                            type
                            title {
                                english
                                romaji
                            }

                            coverImage {
                                medium
                            }

                            episodes
                            format
                        }
                    }
                }

                # Trailer
                trailer {
                    id
                    site
                    thumbnail
                }

                # Recommendations
                recommendations(perPage: 10, sort: RATING) {
                nodes {
                        mediaRecommendation {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            medium
                        }
                        averageScore
                        }
                    }
                }
            }
        }`;

        async function fetchAnime() {
            try {
                setResult(null);
                setIsLoading(true);
                setError("");

                if (!id) return;

                const response = await fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables: { id },
                    }),
                    signal: controller.signal,
                });

                const result = await response.json();

                if (!response.ok || result.errors) {
                    throw new Error(
                        result.errors?.[0]?.message || "API request failed",
                    );
                }

                setResult(result.data.Media);
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
    }, [id]);

    return { result, isLoading, error };
}
