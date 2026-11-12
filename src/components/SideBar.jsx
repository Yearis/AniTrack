import { PanelLeft } from "lucide-react";
import List from "./List";
import FavouriteListItem from "./FavouriteListItem";

export default function SideBar({
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    return (
        <div className="sidebar">
            {/* <h3></h3> */}
            <button className="sidebar-btn">
                <PanelLeft size={22} color="#c5c5c5" strokeWidth={1.8} />
            </button>

            {/* My List Component */}
            <List
                items={favouritesList}
                ItemComponent={FavouriteListItem} // COMPONENT
                favouritesList={favouritesList}
                handleClickDetails={handleClickDetails}
                handleAddElementsToFavourites={handleAddElementsToFavourites}
                handleDeleteElementsToFavourites={
                    handleDeleteElementsToFavourites
                }
            />
        </div>
    );
}
