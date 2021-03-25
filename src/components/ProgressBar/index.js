import styles from "./styles.module.css";

export default function ProgressBar({ progressPorcent, showPorcent }) {
  return (
    <div className={styles.progress_bar_content}>
      <div style={{ width: `${progressPorcent}%` }} className={styles.progress}>
        {" "}
      </div>
      <span>{showPorcent && `${progressPorcent}%`}</span>
    </div>
  );
}
