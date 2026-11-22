import styles from "./Loader.module.css";

export default function Loader({ content = "anime" }) {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
            <p className={styles.text}>{`Loading ${content}...`}</p>
        </div>
    );
}
