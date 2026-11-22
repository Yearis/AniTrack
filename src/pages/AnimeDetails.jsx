import { Heart, ArrowLeft } from "lucide-react";
import { useAnimeDetails } from "../hooks/useAnimeDetails";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import Review from "../components/anime/Review";
import ButtonAddToList from "../components/playlist/AddToListButton";
import styles from "./AnimeDetails.module.css";

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

    if (isLoading) return <Loader content="anime details" />;
    if (error) return <ErrorMessage message={error} />;
    if (!item) return null;

    const title = item.title?.english || item.title?.romaji || "Untitled Anime";
    const studios =
        item.studios?.nodes?.map((studio) => studio.name).join(", ") ||
        "Unknown studio";

    const isFavourite =
        favouritesList?.some((ele) => String(ele.id) === String(item.id)) ?? false;

    const relatedAnime =
        item.relations?.edges?.filter((edge) => edge.node.type === "ANIME") || [];

    const recommendations =
        item.recommendations?.nodes
            ?.map((node) => node.mediaRecommendation)
            .filter(Boolean) || [];

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
        <main className={styles.animeDetails}>
            {/* Anime Hero Section */}
            <section
                className={styles.hero}
                style={{
                    backgroundImage: item.coverImage?.extraLarge
                        ? `linear-gradient(rgba(12, 13, 18, 0.7), rgba(12, 13, 18, 0.92)), url("${item.coverImage.extraLarge}")`
                        : "none",
                }}
            >
                {/* Back and Favourite Buttons */}
                <div className={styles.nav}>
                    <Button
                        className={styles.backBtn}
                        onClick={() => navigate(-1)}
                        title="Go back"
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <Button
                        className={styles.favBtn}
                        onClick={handleFavouriteClick}
                        title={isFavourite ? "Remove from watchlist" : "Add to watchlist"}
                    >
                        <Heart
                            size={18}
                            color={isFavourite ? "#ef4444" : "#ffffff"}
                            fill={isFavourite ? "#ef4444" : "none"}
                        />
                    </Button>
                </div>

                {/* Poster and Anime Information */}
                <div className={styles.heroMain}>
                    <img
                        className={styles.cover}
                        src={item.coverImage?.large}
                        alt={`${title} poster`}
                    />

                    <div className={styles.info}>
                        <h2 className={styles.heroTitle}>{title}</h2>

                        <div className={styles.subtitles}>
                            {item.title?.native && (
                                <span className={styles.nativeTitle}>{item.title.native}</span>
                            )}
                            <span className={styles.metaBadge}>
                                {item.format?.replaceAll("_", " ") || "Format"}
                            </span>
                            <span className={styles.metaBadge}>
                                {STATUS_LABELS[item.status] || item.status || "Status"}
                            </span>
                        </div>

                        <div className={styles.stats}>
                            <span className={styles.score}>★ {item.averageScore ?? "N/A"}/100</span>
                            <small>{item.episodes ?? "?"} Episodes</small>
                            {item.duration && (
                                <small>{item.duration} min/ep</small>
                            )}
                        </div>

                        <div className={styles.dates}>
                            <div>
                                <p className={styles.dateLabel}>Aired</p>
                                <span>{formatAnimeDate(item.startDate)} &ndash; {formatAnimeDate(item.endDate)}</span>
                            </div>
                            <div>
                                <p className={styles.dateLabel}>Studio</p>
                                <span>{studios}</span>
                            </div>
                        </div>

                        {/* Rating & Add to List Actions */}
                        <div className={styles.actions}>
                            <Review key={id} maxStars={5} />
                            <ButtonAddToList anime={item} type="full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Synopsis */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Synopsis</h3>
                <p className={styles.synopsisText}>
                    {cleanDescription(item.description) ||
                        "No description available."}
                </p>
            </section>

            {/* Genres */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Genres</h3>
                <div className={styles.genres}>
                    {item.genres?.map((genre) => (
                        <span key={genre} className={styles.genreTag}>{genre}</span>
                    ))}
                </div>
            </section>

            {/* Additional Information */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Information</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoRow}>
                        <strong>Season:</strong> <span>{item.season || "Unknown"} {item.seasonYear || ""}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Country:</strong> <span>{item.countryOfOrigin || "Japan"}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Source:</strong> <span>{item.source?.replaceAll("_", " ") || "Unknown"}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Mean Score:</strong> <span>{item.meanScore ?? "N/A"}%</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Popularity:</strong> <span>#{item.popularity?.toLocaleString() ?? "N/A"}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Favourites:</strong> <span>{item.favourites?.toLocaleString() ?? "N/A"}</span>
                    </div>
                </div>
            </section>

            {/* Characters and Voice Actors */}
            {item.characters?.edges?.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Characters & Cast</h3>

                    <div className={styles.horizontalScroll}>
                        {item.characters.edges.map((edge) => {
                            const voiceActor = edge.voiceActors?.[0];

                            return (
                                <div key={edge.node.id} className={styles.characterCard}>
                                    <img
                                        className={styles.characterImg}
                                        src={edge.node.image?.large}
                                        alt={edge.node.name.full}
                                        loading="lazy"
                                    />

                                    <p className={styles.characterName}>{edge.node.name.full}</p>
                                    <small className={styles.characterRole}>{edge.role}</small>

                                    {voiceActor && (
                                        <div className={styles.vaInfo}>
                                            <small className={styles.vaName}>
                                                VA: {voiceActor.name.full}
                                            </small>
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
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Related Anime</h3>

                    <div className={styles.horizontalScroll}>
                        {relatedAnime.map((edge) => (
                            <div
                                key={edge.node.id}
                                className={styles.relationCard}
                                onClick={() =>
                                    navigate(`/app/anime/${edge.node.id}`)
                                }
                            >
                                <img
                                    className={styles.relationImg}
                                    src={edge.node.coverImage?.medium}
                                    alt={
                                        edge.node.title.english ||
                                        edge.node.title.romaji
                                    }
                                    loading="lazy"
                                />

                                <p className={styles.relationTitle}>
                                    {edge.node.title.english ||
                                        edge.node.title.romaji}
                                </p>

                                <small className={styles.relationType}>
                                    {edge.relationType?.replaceAll("_", " ")}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Recommended</h3>

                    <div className={styles.horizontalScroll}>
                        {recommendations.map((anime) => (
                            <div
                                key={anime.id}
                                className={styles.relationCard}
                                onClick={() =>
                                    navigate(`/app/anime/${anime.id}`)
                                }
                            >
                                <img
                                    className={styles.relationImg}
                                    src={anime.coverImage?.medium}
                                    alt={
                                        anime.title.english ||
                                        anime.title.romaji
                                    }
                                    loading="lazy"
                                />

                                <p className={styles.relationTitle}>
                                    {anime.title.english || anime.title.romaji}
                                </p>

                                <small className={styles.scoreText}>
                                    ★ {anime.averageScore ?? "N/A"}%
                                </small>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
