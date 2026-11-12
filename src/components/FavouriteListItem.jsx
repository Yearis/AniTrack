import { Trash2 } from "lucide-react";

export default function FavouriteListItem({
    item,
    handleClickDetails,
    handleDeleteElementsToFavourites,
}) {
    // console.log(item);
    return (
        <li className="favourite-item" onClick={() => handleClickDetails(item.id)}>
            <img
                className="favourite-img"
                src={item.image}
                // alt={item.title.english || item.title.romaji}
            />

            {/* Felxible side bar controls the height of these */}
            <p className="favourite-title">{item.title.english || item.title.romaji || "Untitled Anime"}</p>

            <button
                className="favourite-delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteElementsToFavourites(item.id);
                }}
            >
                <Trash2 size={20} color="#ef4444" strokeWidth={2} />
            </button>
        </li>
    );
}
