import { useNavigate } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { Heart } from "lucide-react";
import Button from "./Button";

const STATUS_LABELS = {
    FINISHED: "Finished",
    RELEASING: "Currently Airing",
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

    return (
        <li
            className="anime-card"
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <img
                className="anime-card-cover"
                src={item.coverImage.large}
                alt={`${item.title.english || item.title.romaji} poster`}
            />

            <Button
                className="anime-card-favourite-btn"
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
            >
                <Heart
                    size={20}
                    color={isFavourite ? "#ef4444" : "currentColor"}
                    fill={isFavourite ? "#ef4444" : "none"}
                />
            </Button>

            <div className="anime-card-content">
                <h3 className="anime-card-title">
                    {item.title.english || item.title.romaji}
                </h3>

                <div className="anime-card-badges">
                    {item.status && (
                        <span className="anime-card-status">
                            {STATUS_LABELS[item.status] || item.status}
                        </span>
                    )}
                    {item.genres?.slice(0, 2).map((genre) => (
                        <span key={genre} className="anime-card-genre">
                            {genre}
                        </span>
                    ))}
                </div>

                <p className="anime-card-summary">
                    {cleanDescription(item.description)
                        ? cleanDescription(item.description)
                              .split(" ")
                              .slice(0, 16)
                              .join(" ") +
                          (cleanDescription(item.description).split(" ").length > 16
                              ? "..."
                              : "")
                        : "No description available."}
                </p>
            </div>
        </li>
    );
}
