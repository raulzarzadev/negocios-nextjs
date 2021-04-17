import styles from './styles.module.css'

export function P ({ children, size }) {
  return (
    <p font={size} className={styles.paragraph}>
      {children}
    </p>
  )
}
