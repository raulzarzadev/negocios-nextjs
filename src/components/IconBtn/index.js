import styles from './styles.module.css'

export default function IconBtn ({ children, ...rest }) {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  )
}
