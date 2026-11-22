import { useNavigate } from "react-router";
import { useLists } from "../hooks/useLists";
import { Trash2 } from "lucide-react";
import Button from "./Button";

export default function ListItem({ item, listId }) {
    const navigate = useNavigate();
    const { deleteFromList } = useLists();

    const currentListId = listId || item.listId;

    const displayTitle =
        typeof item.title === "string"
            ? item.title
            : item.title?.english || item.title?.romaji || "Untitled Anime";

    return (
        <li
            className="favourite-item"
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <img
                className="favourite-img"
                src={item.image}
                alt={`${displayTitle} poster`}
            />

            <p className="favourite-title">{displayTitle}</p>

            <Button
                className="favourite-delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    if (currentListId) {
                        deleteFromList(currentListId, item.id);
                    }
                }}
            >
                <Trash2 size={18} color="#ef4444" strokeWidth={2} />
            </Button>
        </li>
    );
}
