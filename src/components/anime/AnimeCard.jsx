import { useNavigate } from "react-router";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuth } from "../../hooks/useAuth";
import { Heart } from "lucide-react";
import Button from "../ui/Button";
import styles from "./AnimeCard.module.css";

const STATUS_LABELS = {
    FINISHED: "Finished",
    RELEASING: "Airing",
    NOT_YET_RELEASED: "Upcoming",
    CANCELLED: "Cancelled",
    HIATUS: "On Hiatus",
};

function cleanDescription(description) {
    if (!description) return "";
    return description
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .trim();
}

export default function AnimeCard({ item }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const {
        favouritesList,
        handleAddElementsToFavourites,
        handleDeleteElementsToFavourites,
    } = useWishlist();

    const isFavourite =
        favouritesList?.some((ele) => String(ele.id) === String(item.id)) ?? false;

    const title = item.title?.english || item.title?.romaji || "Untitled Anime";
    const cleanedDesc = cleanDescription(item.description);

    return (
        <li
            className={styles.card}
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <div className={styles.coverWrapper}>
                <img
                    className={styles.cover}
                    src={item.coverImage.large}
                    alt={`${title} poster`}
                    loading="lazy"
                />

                <Button
                    className={styles.favBtn}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (!user) {
                            navigate("/login");
                            return;
                        }

                        if (isFavourite) {
                            handleDeleteElementsToFavourites(item.id);
                        } else {
                            const newItem = {
                                id: item.id,
                                image: item.coverImage.medium,
                                title: {
                                    english: item.title.english,
                                    romaji: item.title.romaji,
                                },
                            };

                            handleAddElementsToFavourites(newItem);
                        }
                    }}
                    title={isFavourite ? "Remove from watchlist" : "Add to watchlist"}
                >
                    <Heart
                        size={17}
                        color={isFavourite ? "#ef4444" : "currentColor"}
                        fill={isFavourite ? "#ef4444" : "none"}
                    />
                </Button>

                {item.averageScore && (
                    <span className={styles.scoreBadge}>
                        ★ {item.averageScore}%
                    </span>
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title} title={title}>
                    {title}
                </h3>

                <div className={styles.badges}>
                    {item.status && (
                        <span
                            className={`${styles.statusBadge} ${
                                item.status === "RELEASING"
                                    ? styles.airing
                                    : ""
                            }`}
                        >
                            {STATUS_LABELS[item.status] || item.status}
                        </span>
                    )}

                    {item.genres?.slice(0, 2).map((genre) => (
                        <span key={genre} className={styles.genreBadge}>
                            {genre}
                        </span>
                    ))}
                </div>

                <p className={styles.summary}>
                    {cleanedDesc
                        ? cleanedDesc.split(" ").slice(0, 16).join(" ") +
                          (cleanedDesc.split(" ").length > 16 ? "..." : "")
                        : "No synopsis available."}
                </p>
            </div>
        </li>
    );
}
