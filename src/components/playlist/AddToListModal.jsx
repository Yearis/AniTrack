import { useState } from "react";
import { createPortal } from "react-dom";
import { useKey } from "../../hooks/useKey";
import CreateNewListDialog from "./CreateNewListDialog";
import AddToListDialog from "./AddToListDialog";
import styles from "./AddToListModal.module.css";

export default function AddToListModal({ anime, onClose }) {
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    useKey("Escape", onClose);

    return createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {isCreatingNew ? (
                    <CreateNewListDialog
                        onClose={onClose}
                        setIsCreatingNew={setIsCreatingNew}
                    />
                ) : (
                    <AddToListDialog
                        setIsCreatingNew={setIsCreatingNew}
                        anime={anime}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>,
        document.body,
    );
}
