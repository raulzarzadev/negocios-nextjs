import s from './styles.module.css'
import { FcGoogle } from 'react-icons/fc'
import ICONS from 'src/utils/ICONS'

export default function ButtonGoogle ({ onClick }) {
  return (
    <button className="btn btn-info  " onClick={onClick}>
      <div className="flex ">
        <div className='p-1 pr-4 '>
          <ICONS.Google />
        </div>
        Registrate con google
      </div>
    </button>
  )
}
