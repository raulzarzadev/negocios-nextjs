import BarrioForm from '@comps/BarrioForm'
import { listenBarrio } from 'firebase/barrios'
import router from 'next/router'
import { useEffect, useState } from 'react'
export default function EditBarrio () {
  const {
    query: { id }
  } = router
  const [barrio, setBarrio] = useState(undefined)
  useEffect(() => {
    listenBarrio({ barrioId: id }, setBarrio)
  }, [])
  return (
    <div className="">
      <h3 className="text-center mt-5 font-bold ">
        Editar Barrio
      </h3>
      <BarrioForm barrio={barrio} />
    </div>
  )
}
