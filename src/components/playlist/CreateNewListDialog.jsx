import { useState } from "react";
import Button from "../ui/Button";
import { useLists } from "../../hooks/useLists";
import styles from "./CreateNewListDialog.module.css";

export default function CreateNewListDialog({ onClose, setIsCreatingNew }) {
    const [name, setName] = useState("");
    const { createList } = useLists();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            await createList(name);
            setName("");
            if (setIsCreatingNew) setIsCreatingNew(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className={styles.dialog}>
            <div className={styles.header}>
                <h3 className={styles.title}>New Playlist</h3>
                {onClose && (
                    <Button className={styles.closeBtn} onClick={onClose}>
                        &times;
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter playlist name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />

                <div className={styles.actions}>
                    <Button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className={styles.createBtn}>
                        &plus; Add
                    </Button>
                </div>
            </form>
        </div>
    );
}
