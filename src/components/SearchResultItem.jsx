import { Heart } from "lucide-react";

export default function SearchResultItem({
    item,
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    const isFavourite =
        favouritesList?.some((ele) => ele.id === item.id) ?? false;

    return (
        <li
            className="search-result-item"
            onClick={() => handleClickDetails(item.id)}
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

                {/* under the title all of them in a horizontal line */}
                <span className="search-result-year">
                    {item.startDate?.year ?? "Unknown year"}
                </span>

                <span className="search-result-format">{item.format} </span>

                <span className="search-result-genres">
                    - {item.genres?.slice(0, 4).join(", ")}
                </span>
            </div>

            <button
                className="search-result-favourite-btn"
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
        </li>
    );
}
