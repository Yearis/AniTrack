import styles from "./NavBar.module.css";

export default function NavBar({ children }) {
    return <header className={styles.navbar}>{children}</header>;
}
