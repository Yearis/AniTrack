import { useLists } from "../../hooks/useLists";
import { Bookmark } from "lucide-react";
import styles from "./DialogItem.module.css";

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
        <li
            className={`${styles.item} ${isSelected ? styles.selected : ""}`}
            onClick={handleClick}
        >
            <span className={styles.name}>{item.name}</span>

            <Bookmark
                size={18}
                color={isSelected ? "#fbbf24" : "var(--text-muted)"}
                fill={isSelected ? "#fbbf24" : "none"}
                className={styles.icon}
            />
        </li>
    );
}
