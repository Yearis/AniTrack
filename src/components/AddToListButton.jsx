import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, Plus } from "lucide-react";
import Button from "./Button";
import AddToListModal from "./AddToListModal";
import { useAuth } from "../hooks/useAuth";

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
                    className="btn-add-to-list-icon"
                    onClick={handleClick}
                    title="Add to list"
                >
                    <Plus size={18} />
                </Button>
            )}

            {type === "full" && (
                <Button className="btn-add-to-list-full" onClick={handleClick}>
                    <Bookmark size={16} />
                    <span>Add to List</span>
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
