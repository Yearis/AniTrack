export default function Button({ children, className, onClick, ...rest }) {
    return (
        <button className={className} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}
