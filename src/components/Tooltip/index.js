import styles from './styles.module.css'

export default function Tooltip ({ text = 'tooltip', children, position }) {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext} position={position}>
        {text}
      </span>
      {children}
    </div>
  )
}
