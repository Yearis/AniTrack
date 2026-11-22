import styles from "./List.module.css";

export default function List({ items, ItemComponent, className, emptyMessage = "Empty List.", ...rest }) {
    if (!items?.length) {
        return <p className={styles.empty}>{emptyMessage}</p>;
    }

    const combinedClassName = [styles.list, className].filter(Boolean).join(" ");

    return (
        <ul className={combinedClassName}>
            {items.map((item) => (
                <ItemComponent key={item.id} item={item} {...rest} />
            ))}
        </ul>
    );
}
