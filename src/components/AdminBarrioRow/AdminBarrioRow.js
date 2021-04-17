import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'

import IconBtn from '@comps/IconBtn'
import s from './styles.module.css'
import { useState } from 'react'

export default function AdminBarrioRow ({ barrio }) {
  const [openModalEditBarrio, setOpenModalEditBarrio] = useState(false)

  const handleEditBarrio = () => {
    setOpenModalEditBarrio(!openModalEditBarrio)
  }

  const [openDeleteBarrio, setOpenDeleteBarrio] = useState()

  const handleDeleteBarrio = () => {
    setOpenDeleteBarrio(!openDeleteBarrio)
  }

  return (
    <div key={barrio.id} className={s.barrio_row}>
      <div>{`${barrio.name} `}</div>
      <div className={s.barrio_icons}>
        <div className={s.barrio_icon}>
          <IconBtn onClick={handleEditBarrio}>
            <AiOutlineEdit color="green" />
          </IconBtn>
        </div>
        <div className={s.barrio_icon}>
          <IconBtn onClick={handleDeleteBarrio}>
            <AiTwotoneDelete color="red" />
          </IconBtn>
        </div>
      </div>
    </div>
  )
}
