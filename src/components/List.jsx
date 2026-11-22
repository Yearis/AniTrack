export default function List({ items, ItemComponent, ...rest }) {
    if (!items?.length) {
        return <p className="list-empty">Empty List.</p>;
    }

    // console.log(items);

    return (
        <ul className="list">
            {items.map((item) => (
                <ItemComponent key={item.id} item={item} {...rest} />
            ))}
        </ul>
    );
}
