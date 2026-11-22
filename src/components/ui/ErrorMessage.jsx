import styles from "./ErrorMessage.module.css";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
    return (
        <div className={styles.container}>
            <AlertCircle size={18} className={styles.icon} />
            <p className={styles.message}>{message}</p>
        </div>
    );
}
