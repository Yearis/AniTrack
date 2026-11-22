import { useLists } from "../hooks/useLists";
import Button from "./Button";
import List from "./List";
import DialogItem from "./DialogItem";

export default function AddToListDialog({ setIsCreatingNew, anime, onClose }) {
    const { lists } = useLists();

    return (
        <div className="add-to-list-dialog">
            <div className="dialog-header">
                <h3>Save to...</h3>
                {onClose && (
                    <Button className="dialog-close-btn" onClick={onClose}>
                        &times;
                    </Button>
                )}
            </div>

            <div className="dialog-list-container">
                <List items={lists} ItemComponent={DialogItem} anime={anime} />
            </div>

            <div className="dialog-footer">
                <Button
                    className="dialog-create-btn"
                    onClick={() => setIsCreatingNew(true)}
                >
                    &plus; Create New List
                </Button>
            </div>
        </div>
    );
}
