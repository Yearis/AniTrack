import { useNavigate } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { Heart } from "lucide-react";
import Button from "./Button";
import Review from "./Review";
import ButtonAddToList from "./AddToListButton";

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

    return (
        <li
            className="search-result-item"
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <img
                className="search-result-cover"
                src={item.coverImage.medium}
                alt={`${item.title.english || item.title.romaji} poster`}
            />

            <div className="search-result-info">
                <h3 className="search-result-title">
                    {item.title.english || item.title.romaji}
                </h3>

                <span className="search-result-year">
                    {item.startDate?.year ?? "Unknown year"}
                </span>

                <span className="search-result-format">{item.format} </span>

                <span className="search-result-genres">
                    - {item.genres?.slice(0, 4).join(", ")}
                </span>
            </div>

            <div
                className="search-result-actions"
                onClick={(e) => e.stopPropagation()}
            >
                <Review maxStars={5} animeId={item.id} />

                <ButtonAddToList anime={item} type="icon" />

                <Button
                    className="search-result-favourite-btn"
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
            </div>
        </li>
    );
}
