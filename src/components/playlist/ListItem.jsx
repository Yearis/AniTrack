import { useNavigate } from "react-router";
import { useLists } from "../../hooks/useLists";
import { Trash2 } from "lucide-react";
import Button from "../ui/Button";
import styles from "./ListItem.module.css";

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
            className={styles.item}
            onClick={() => navigate(`/app/anime/${item.id}`)}
        >
            <img
                className={styles.cover}
                src={item.image}
                alt={`${displayTitle} poster`}
            />

            <p className={styles.title}>{displayTitle}</p>

            <Button
                className={styles.deleteBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    if (currentListId) {
                        deleteFromList(currentListId, item.id);
                    }
                }}
                title="Remove from playlist"
            >
                <Trash2 size={15} />
            </Button>
        </li>
    );
}
