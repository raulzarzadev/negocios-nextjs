import styles from "./styles.module.css";
import Link from "next/link";

export function L({ href, children, style }) {
  return (
    <Link href={href}>
      <a className={styles.link} style={style}>
        {children}
      </a>
    </Link>
  );
}

export function BtnL({ onClick, children, style }) {
  return (
    <a onClick={onClick} className={styles.link} style={style}>
      {children}
    </a>
  );
}

export function ExternalL({ href, children }) {
  return (
    <a className={`${styles.link} ${styles.external_link}`} href={href}>
      {children}
    </a>
  );
}
