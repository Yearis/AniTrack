import { Heart } from "lucide-react";

export default function AnimeCard({
    item,
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    /*
        5 type of status
        FINISHED RELEASING NOT_YET_RELEASED CANCELLED HIATUS
    */
    const isFavourite =
        favouritesList?.some((ele) => ele.id === item.id) ?? false;

    const STATUS_LABELS = {
        FINISHED: "Finished",
        RELEASING: "Currently Airing",
        NOT_YET_RELEASED: "Upcoming",
        CANCELLED: "Cancelled",
        HIATUS: "On Hiatus",
    };

    return (
        <li className="anime-card" onClick={() => handleClickDetails(item.id)}>
            <img
                className="anime-card-cover"
                src={item.coverImage.large}
                alt={`${item.title.english || item.title.romaji} poster`}
            />

            <button
                className="anime-card-favourite-btn"
                key="favourites"
                onClick={(e) => {
                    e.stopPropagation();

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
                    color={isFavourite ? "#ef4444" : "#c5c5c5"}
                    fill={isFavourite ? "#ef4444" : "none"}
                />
            </button>

            <div className="anime-card-content">
                <h3 className="anime-card-title">{item.title.english || item.title.romaji}</h3>

                {/* This will be besides the title */}
                <span className="anime-card-status">{STATUS_LABELS[item.status]}</span>

                {/* Under the title */}
                {item.genres?.slice(0, 2).map((genre) => (
                    <span key={genre} className="anime-card-genre">{genre}</span>
                ))}

                {/* Under the genre's */}
                {item.description
                    ? item.description.split(" ").slice(0, 15).join(" ") +
                      (item.description.split(" ").length > 15 ? "..." : "")
                    : "No description available."}
            </div>
        </li>
    );
}
