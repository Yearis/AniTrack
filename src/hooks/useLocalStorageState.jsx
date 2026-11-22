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
        setElements((elements) => {
            const exists = elements.some(
                (item) => String(item.id) === String(newItem.id),
            );

            if (exists) {
                return elements.map((item) =>
                    String(item.id) === String(newItem.id)
                        ? { ...item, ...newItem }
                        : item,
                );
            } else {
                return [...elements, newItem];
            }
        });
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

    return {
        elements,
        handleAddElement,
        handleDeleteElement,
    };
}
