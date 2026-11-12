export default function List({
    items,
    ItemComponent,
    favouritesList,
    handleClickDetails,
    handleAddElementsToFavourites,
    handleDeleteElementsToFavourites,
}) {
    if (!items?.length) {
        return <p className="list-empty">No anime found.</p>;
    }

    // console.log(items);

    return (
        <ul className="list">
            {items.map((item) => (
                <ItemComponent
                    key={item.id}
                    item={item}
                    favouritesList={favouritesList}
                    handleClickDetails={handleClickDetails}
                    handleAddElementsToFavourites={
                        handleAddElementsToFavourites
                    }
                    handleDeleteElementsToFavourites={
                        handleDeleteElementsToFavourites
                    }
                />
            ))}
        </ul>
    );
}
