import styles from "./Filter.module.css";

export default function Filter({ label, filterMap, filter, setFilter }) {
    return (
        <div className={styles.filterGroup}>
            {label && <span className={styles.label}>{label}</span>}
            <select
                className={styles.select}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                {filterMap.map(([lbl, value]) => (
                    <option key={lbl} value={value} className={styles.option}>
                        {lbl}
                    </option>
                ))}
            </select>
        </div>
    );
}
