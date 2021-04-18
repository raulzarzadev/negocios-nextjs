import StateList from '@comps/StatesList.js'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useBarrios } from 'src/hooks/useBarrios'
// import { usePublications } from 'src/hooks/usePublications'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function ViewBarrios () {
  const { getBarrios } = useBarrios()
  // const { getActivePublications } = usePublications()
  const [barrios, setBarrios] = useState([])
  // const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBarrios().then((res) => {
      setLoading(false)
      setBarrios(normalizeBarriosList(res))
    })
  }, [])

  /* useEffect(() => {
    getActivePublications().then(setPublications)
  }, []) */

  if (loading) return 'Cargando...'

  return <>

  <StateList statesList={barrios}/>
  </>
}
