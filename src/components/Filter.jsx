export default function Filter({ filterMap, filter, setFilter }) {
    return (
        <div className="filter-container">
            <select
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                {filterMap.map(([label, value]) => (
                    <option key={label} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
