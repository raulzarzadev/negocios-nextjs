import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import { usePublications } from 'src/hooks/usePublications'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'
import { useBarrios } from 'src/hooks/useBarrios'
import AdvertsTable from './AdvertsTable'
import BarriosTable from './BarriosTable'

export default function AdminDashboard() {
  const [states, setStates] = useState()
  const [adverts, setAdverts] = useState([])
  const { getUserAds } = useAds()
  const { getBarrios } = useBarrios()
  const { publications } = usePublications()

  useEffect(() => {
    getUserAds().then(setAdverts)
  }, [])

  useEffect(() => {
    getBarrios().then((res) =>
      setStates(normalizeBarriosList(res))
    )
  }, [])

  return (
    <div className="grid gap-5 py-5 px-1 place-content-center ">
      <AdvertsTable
        adverts={adverts}
        publications={publications}
      />
      <BarriosTable states={states} />
    </div>
  )
}
