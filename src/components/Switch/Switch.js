
import s from './styles.module.css'

export default function Switch ({ label, disabled }) {
  return (
    <div className={s.switch_content}>
      {label && <span className={s.label}>{label}</span>}
      <label className={s.switch}>
        <input type="checkbox" disabled={disabled}/>
        <span className={s.slider} />
      </label>
    </div>
  )
}
