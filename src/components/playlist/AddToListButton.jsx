import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, Plus } from "lucide-react";
import Button from "../ui/Button";
import AddToListModal from "./AddToListModal";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AddToListButton.module.css";

export default function ButtonAddToList({ type = "icon", anime }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    function handleClick(e) {
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        setIsOpen(true);
    }

    return (
        <>
            {type === "icon" && (
                <Button
                    className={styles.iconBtn}
                    onClick={handleClick}
                    title="Add to playlist"
                >
                    <Plus size={16} />
                </Button>
            )}

            {type === "full" && (
                <Button className={styles.fullBtn} onClick={handleClick}>
                    <Bookmark size={16} />
                    <span>Add to Playlist</span>
                </Button>
            )}

            {isOpen && (
                <AddToListModal
                    anime={anime}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
