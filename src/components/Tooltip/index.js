import styles from './styles.module.css'

export default function Tooltip ({
  text = 'tooltip',
  children,
  position = 'right' || 'left'
}) {
  return (
    <div className={'relative group'}>
      <span
        className={
          'whitespace-nowrap absolute right-0 -top-4 bg-white px-1 rounded-lg hidden group-hover:block   '
        }
      >
        {text}
      </span>
      {children}
    </div>
  )
}
