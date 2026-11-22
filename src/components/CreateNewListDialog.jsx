import { useState } from "react";
import Button from "./Button";
import { useLists } from "../hooks/useLists";

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
        <div className="create-new-list-dialog">
            <div className="dialog-header">
                <h3>New Playlist</h3>
                {onClose && (
                    <Button className="dialog-close-btn" onClick={onClose}>
                        &times;
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="dialog-form">
                <input
                    type="text"
                    className="dialog-input"
                    placeholder="Enter Playlist name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />

                <div className="dialog-form-actions">
                    <Button
                        type="button"
                        className="dialog-btn-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="dialog-btn-create">
                        &plus; Add
                    </Button>
                </div>
            </form>
        </div>
    );
}
