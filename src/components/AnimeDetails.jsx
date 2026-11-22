import { Heart, ArrowLeft } from "lucide-react";
import { useAnimeDetails } from "../hooks/useAnimeDetails";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../hooks/useKey";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Button from "./Button";
import Review from "./Review";
import ButtonAddToList from "./AddToListButton";

function formatAnimeDate(date) {
    if (!date?.year) return "Unknown";
    if (!date.month) return date.year;

    const month = new Date(2000, date.month - 1).toLocaleString("en", {
        month: "short",
    });

    if (!date.day) return `${month} ${date.year}`;
    return `${month} ${date.day}, ${date.year}`;
}

function cleanDescription(description) {
    return description
        ?.replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .trim();
}

const STATUS_LABELS = {
    FINISHED: "Finished",
    RELEASING: "Currently Airing",
    NOT_YET_RELEASED: "Upcoming",
    CANCELLED: "Cancelled",
    HIATUS: "On Hiatus",
};

export default function AnimeDetails() {
    const { id } = useParams();
    const { result: item, isLoading, error } = useAnimeDetails(id);

    const {
        favouritesList,
        handleAddElementsToFavourites,
        handleDeleteElementsToFavourites,
    } = useWishlist();

    const { user } = useAuth();
    const navigate = useNavigate();

    useKey(
        "escape",
        () => {
            navigate(-1);
        },
        document,
        id !== null,
    );

    if (isLoading) return <Loader content="Anime Details" />;
    if (error) return <ErrorMessage message={error} />;
    if (!item) {
        return <p>Couldn't load anime details. Please try again later.</p>;
    }

    const isFavourite =
        favouritesList?.some((ele) => String(ele.id) === String(item.id)) ??
        false;

    const title =
        item.title?.english ||
        item.title?.romaji ||
        item.title?.native ||
        "Untitled Anime";

    const studios =
        item.studios?.nodes?.map((studio) => studio.name).join(", ") ||
        "Unknown studio";

    const relatedAnime = item.relations?.edges ?? [];
    const recommendations =
        item.recommendations?.nodes
            ?.map((node) => node.mediaRecommendation)
            .filter(Boolean) ?? [];

    function handleFavouriteClick() {
        if (!user) {
            navigate("/login");
            return;
        }

        if (isFavourite) {
            handleDeleteElementsToFavourites(item.id);
        } else {
            const newItem = {
                id: item.id,
                image: item.coverImage?.medium,
                title: {
                    english: item.title?.english,
                    romaji: item.title?.romaji,
                },
            };

            handleAddElementsToFavourites(newItem);
        }
    }

    return (
        <main className="anime-details">
            {/* Anime Hero Section */}
            <section
                className="anime-details-hero"
                style={{
                    backgroundImage: item.coverImage?.extraLarge
                        ? `linear-gradient(rgba(14, 16, 21, 0.65), rgba(14, 16, 21, 0.88)), url("${item.coverImage.extraLarge}")`
                        : "none",
                }}
            >
                {/* Back and Favourite Buttons */}
                <div className="anime-details-nav">
                    <Button
                        className="anime-details-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={20} />
                    </Button>

                    <Button
                        className="anime-details-fav-btn"
                        onClick={handleFavouriteClick}
                    >
                        <Heart
                            size={18}
                            color={isFavourite ? "#ef4444" : "#cbd5e1"}
                            fill={isFavourite ? "#ef4444" : "none"}
                        />
                    </Button>
                </div>

                {/* Poster and Anime Information */}
                <div className="anime-details-main">
                    <img
                        className="anime-details-cover"
                        src={item.coverImage?.large}
                        alt={`${title} poster`}
                    />

                    <div className="anime-details-info">
                        <h3>{title}</h3>

                        <div className="anime-details-subtitles">
                            {item.title?.native && (
                                <span>{item.title.native}</span>
                            )}
                            <span>
                                {item.format?.replaceAll("_", " ") ||
                                    "Unknown format"}
                            </span>
                            <span>
                                {STATUS_LABELS[item.status] ||
                                    item.status ||
                                    "Unknown status"}
                            </span>
                        </div>

                        <div className="anime-details-stats">
                            <span>★ {item.averageScore ?? "N/A"}/100</span>
                            <small>{item.episodes ?? "?"} Episodes</small>
                            <small>
                                {item.format?.replaceAll("_", " ") ||
                                    "Unknown format"}
                            </small>
                        </div>

                        <div className="anime-details-dates">
                            <div>
                                <p>Start: {formatAnimeDate(item.startDate)}</p>
                                <p>End: {formatAnimeDate(item.endDate)}</p>
                            </div>
                            <div>
                                <p>Studio</p>
                                <span>{studios}</span>
                            </div>
                        </div>

                        {item.duration && (
                            <p className="anime-details-duration">
                                Duration: {item.duration} minutes per episode
                            </p>
                        )}

                        {/* Rating & Add to List Actions */}
                        <div className="anime-details-actions">
                            <Review key={id} maxStars={5} />
                            <ButtonAddToList anime={item} type="full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Synopsis */}
            <section className="anime-details-section">
                <h3>Synopsis</h3>
                <p>
                    {cleanDescription(item.description) ||
                        "No description available."}
                </p>
            </section>

            {/* Genres */}
            <section className="anime-details-section">
                <h3>Genres</h3>
                <div className="anime-details-genres">
                    {item.genres?.map((genre) => (
                        <span key={genre}>{genre}</span>
                    ))}
                </div>
            </section>

            {/* Additional Information */}
            <section className="anime-details-section">
                <h3>Additional Information</h3>
                <div>
                    <p>
                        <strong>Season:</strong> {item.season || "Unknown"}
                    </p>
                    <p>
                        <strong>Season Year:</strong>{" "}
                        {item.seasonYear || "Unknown"}
                    </p>
                    <p>
                        <strong>Country of Origin:</strong>{" "}
                        {item.countryOfOrigin || "Unknown"}
                    </p>
                    <p>
                        <strong>Source:</strong>{" "}
                        {item.source?.replaceAll("_", " ") || "Unknown"}
                    </p>
                    <p>
                        <strong>Mean Score:</strong> {item.meanScore ?? "N/A"}
                    </p>
                    <p>
                        <strong>Popularity:</strong> {item.popularity ?? "N/A"}
                    </p>
                    <p>
                        <strong>Favourites:</strong> {item.favourites ?? "N/A"}
                    </p>
                </div>
            </section>

            {/* Tags */}
            {item.tags?.length > 0 && (
                <section className="anime-details-section">
                    <h3>Tags</h3>

                    <div className="anime-details-tags">
                        {item.tags.map((tag) => (
                            <span key={tag.name}>
                                {tag.name} ({tag.rank}%)
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Characters and Voice Actors */}
            {item.characters?.edges?.length > 0 && (
                <section className="anime-details-section anime-details-characters">
                    <h3>Characters</h3>

                    <div>
                        {item.characters.edges.map((edge) => {
                            const voiceActor = edge.voiceActors?.[0];

                            return (
                                <div key={edge.node.id}>
                                    <img
                                        className="character-img"
                                        src={edge.node.image?.large}
                                        alt={edge.node.name.full}
                                    />

                                    <p>{edge.node.name.full}</p>

                                    <small>{edge.role}</small>

                                    {voiceActor && (
                                        <div>
                                            <p>
                                                Japanese Voice Actor:{" "}
                                                {voiceActor.name.full}
                                            </p>

                                            <img
                                                className="va-img"
                                                src={voiceActor.image?.large}
                                                alt={voiceActor.name.full}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Related Anime */}
            {relatedAnime.length > 0 && (
                <section className="anime-details-section anime-details-related">
                    <h3>Related Anime</h3>

                    <div>
                        {relatedAnime.map((edge) => (
                            <div
                                key={edge.node.id}
                                onClick={() =>
                                    navigate(`/app/anime/${edge.node.id}`)
                                }
                            >
                                <img
                                    className="related-img"
                                    src={edge.node.coverImage?.medium}
                                    alt={
                                        edge.node.title.english ||
                                        edge.node.title.romaji
                                    }
                                />

                                <p>
                                    {edge.node.title.english ||
                                        edge.node.title.romaji}
                                </p>

                                <small>
                                    {edge.relationType?.replaceAll("_", " ")}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <section className="anime-details-section anime-details-recommendations">
                    <h3>Recommended Anime</h3>

                    <div>
                        {recommendations.map((anime) => (
                            <div
                                key={anime.id}
                                onClick={() =>
                                    navigate(`/app/anime/${anime.id}`)
                                }
                            >
                                <img
                                    className="rec-img"
                                    src={anime.coverImage?.medium}
                                    alt={
                                        anime.title.english ||
                                        anime.title.romaji
                                    }
                                />

                                <p>
                                    {anime.title.english || anime.title.romaji}
                                </p>

                                <small>
                                    Score: {anime.averageScore ?? "N/A"}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Trailer */}
            {item.trailer?.thumbnail && (
                <section className="anime-details-section anime-details-trailer">
                    <h3>Trailer</h3>

                    {item.trailer.site === "youtube" ? (
                        <a
                            href={`https://www.youtube.com/watch?v=${item.trailer.id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                className="trailer-img"
                                src={item.trailer.thumbnail}
                                alt={`${title} trailer`}
                            />
                        </a>
                    ) : (
                        <img
                            className="trailer-img"
                            src={item.trailer.thumbnail}
                            alt={`${title} trailer`}
                        />
                    )}
                </section>
            )}
        </main>
    );
}
