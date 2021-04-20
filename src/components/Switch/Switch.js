
import s from './styles.module.css'

export default function Switch ({ label, disabled, name = 'switch' }) {
  return (
    <div className={s.switch_content}>
      <label htmlFor="check-box" className={s.switch}>
      {label && <span className={s.label}>{label}</span>}
        <input
          id="check-box"
          type="checkbox"
          disabled={disabled}
          name={name}
        />
        <span className={s.slider} />
      </label>
    </div>
  )
}
