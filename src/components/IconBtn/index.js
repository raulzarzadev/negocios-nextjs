import styles from "./styles.module.css";

export default function IconBtn({ children, onClick }) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={styles.button}
    >
      {children}
    </a>
  );
}
