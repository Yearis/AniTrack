import { useState, useEffect } from "react";

export function useLocalStorageState(keyword) {
    const [elements, setElements] = useState(() => {
        try {
            const item = localStorage.getItem(keyword);
            return item ? JSON.parse(item) : [];
        } catch (err) {
            console.error("Failed to parse localStorage:", err);
            return [];
        }
    });

    function handleAddElement(newItem) {
        setElements((itemsList) => [...itemsList, newItem]);
    }

    function handleDeleteElement(itemId) {
        setElements((elements) =>
            elements.filter((item) => item.id !== itemId),
        );
    }

    useEffect(() => {
        if (keyword) {
            localStorage.setItem(keyword, JSON.stringify(elements));
        }
    }, [keyword, elements]);

    return { elements, handleAddElement, handleDeleteElement };
}
