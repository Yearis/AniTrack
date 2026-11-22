import { useLists } from "../hooks/useLists";
import { Bookmark } from "lucide-react";

export default function DialogItem({ item, anime }) {
    const { savedAnimes, addToList, deleteFromList } = useLists();

    const isSelected = savedAnimes.some(
        (s) => s.list_id === item.id && String(s.anime_id) === String(anime.id),
    );

    function handleClick() {
        if (isSelected) {
            deleteFromList(item.id, anime.id);
        } else {
            addToList(item.id, anime);
        }
    }

    return (
        <li className="dialog-item" key={item.id} onClick={handleClick}>
            <p className="dialog-item-name">{item.name}</p>

            <Bookmark
                size={18}
                color={isSelected ? "#fbbf24" : "#a1a1aa"}
                fill={isSelected ? "#fbbf24" : "none"}
            />
        </li>
    );
}
