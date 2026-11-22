import styles from "./Box.module.css";

export default function Box({ children }) {
    return <section className={styles.box}>{children}</section>;
}
