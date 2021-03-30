import styles from "./styles.module.css";

export default function IconBtn({ children, ...rest }) {
  return (
    <div {...rest} className={styles.button}>
      {children}
    </div>
  );
}

