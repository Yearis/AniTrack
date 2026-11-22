import { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";

export function useWishlist() {
    const context = useContext(WishlistContext);

    if (context === undefined)
        throw new Error("useWishlist was used outside the WishlistProvider");

    return context;
}
