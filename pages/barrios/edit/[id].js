import NewBarrioForm from '@comps/NewBarrioForm'
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
      <h3>Barrio</h3>
      <NewBarrioForm barrio={barrio} />
    </div>
  )
}
