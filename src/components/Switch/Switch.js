
import s from './styles.module.css'

export default function Switch ({ label, disabled, name = 'switch' }) {
  return (
    <div className={s.switch_content}>
      {label && <span className={s.label}>{label}</span>}
      <label className={s.switch}>
        <input type="checkbox" disabled={disabled} name={name}/>
        <span className={s.slider} />
      </label>
    </div>
  )
}
