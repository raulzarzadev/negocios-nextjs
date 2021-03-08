import styles from "./styles.module.css";

export default function Tooltip({ text = "tooltip", children }) {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>{text}</span>
      {children}
    </div>
  );
}
