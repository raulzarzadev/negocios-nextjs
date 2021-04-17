
import s from './styles.module.css'
import { FcGoogle } from 'react-icons/fc'

export default function ButtonGoogle ({ onClick, color, label = 'Google Singin' }) {
  return (
  <button className={s.button} onClick={onClick} color={color}>
    <FcGoogle className={s.icon}/>
    <span className={s.label}>
    {label}
    </span>
  </button>
  )
}
