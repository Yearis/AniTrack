import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

export function useLists() {
    const context = useContext(ListContext);

    if (context === undefined) {
        throw new Error("useLists was used outside of the ListProvider");
    }

    return context;
}
