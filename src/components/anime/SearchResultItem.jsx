import { useNavigate } from "react-router";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuth } from "../../hooks/useAuth";
import { Heart } from "lucide-react";
import Button from "../ui/Button";
import Review from "./Review";
import ButtonAddToList from "../playlist/AddToListButton";
import styles from "./SearchResultItem.module.css";

export default function SearchResultItem({ item }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const {
        favouritesList,
        handleAddElementsToFavourites,
        handleDeleteElementsToFavourites,
    } = useWishlist();

    const isFavourite =
        favouritesList?.some((ele) => String(ele.id) === String(item.id)) ?? false;

    const displayTitle = item.title?.english || item.title?.romaji || "Untitled Anime";

    return (
        <li
            className={styles.item}
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <img
                className={styles.cover}
                src={item.coverImage.medium}
                alt={`${displayTitle} poster`}
                loading="lazy"
            />

            <div className={styles.info}>
                <h3 className={styles.title}>{displayTitle}</h3>

                <div className={styles.meta}>
                    <span className={styles.year}>
                        {item.startDate?.year ?? "Unknown year"}
                    </span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.format}>{item.format || "TV"}</span>
                    {item.genres?.length > 0 && (
                        <>
                            <span className={styles.dot}>•</span>
                            <span className={styles.genres}>
                                {item.genres.slice(0, 3).join(", ")}
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div
                className={styles.actions}
                onClick={(e) => e.stopPropagation()}
            >
                <Review maxStars={5} animeId={item.id} />

                <ButtonAddToList anime={item} type="icon" />

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
                        color={isFavourite ? "#ef4444" : "var(--text-secondary)"}
                        fill={isFavourite ? "#ef4444" : "none"}
                    />
                </Button>
            </div>
        </li>
    );
}
