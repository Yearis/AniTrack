import styles from "./Button.module.css";

export default function Button({ children, className, onClick, ...rest }) {
    const combinedClassName = [styles.button, className].filter(Boolean).join(" ");

    return (
        <button className={combinedClassName} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}
