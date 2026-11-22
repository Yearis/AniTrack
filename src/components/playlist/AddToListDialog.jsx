import { useLists } from "../../hooks/useLists";
import Button from "../ui/Button";
import List from "../ui/List";
import DialogItem from "./DialogItem";
import styles from "./AddToListDialog.module.css";

export default function AddToListDialog({ setIsCreatingNew, anime, onClose }) {
    const { lists } = useLists();

    return (
        <div className={styles.dialog}>
            <div className={styles.header}>
                <h3 className={styles.title}>Save to Playlist...</h3>
                {onClose && (
                    <Button className={styles.closeBtn} onClick={onClose}>
                        &times;
                    </Button>
                )}
            </div>

            <div className={styles.listContainer}>
                <List
                    items={lists}
                    ItemComponent={DialogItem}
                    anime={anime}
                    emptyMessage="No playlists found."
                />
            </div>

            <div className={styles.footer}>
                <Button
                    className={styles.createBtn}
                    onClick={() => setIsCreatingNew(true)}
                >
                    Create New Playlist
                </Button>
            </div>
        </div>
    );
}
