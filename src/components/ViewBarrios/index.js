import Loading from '@comps/Loading'
import StateList from '@comps/StatesList.js'
import { useEffect, useState } from 'react'
import { useBarrios } from 'src/hooks/useBarrios'
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

  if (loading) return <Loading size="lg" />

  return <StateList statesList={barrios}/>
}
