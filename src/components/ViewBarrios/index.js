import StateList from '@comps/StatesList.js'
import { useEffect, useState } from 'react'
import { useBarrios } from 'src/hooks/useBarrios'
// import { usePublications } from 'src/hooks/usePublications'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function ViewBarrios () {
  const { getBarrios } = useBarrios()
  const [barrios, setBarrios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBarrios().then((res) => {
      setLoading(false)
      setBarrios(normalizeBarriosList(res))
    })
  }, [])

  if (loading) return 'Cargando...'

  return <StateList statesList={barrios}/>
}
