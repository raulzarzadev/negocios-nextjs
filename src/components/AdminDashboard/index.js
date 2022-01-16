import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import { usePublications } from 'src/hooks/usePublications'
import Link from '@comps/Link'
import PrimBtn from '@comps/PrimBtn'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'
import { useBarrios } from 'src/hooks/useBarrios'
import AdvertsTable from './AdvertsTable'
import BarriosTable from './BarriosTable'

export default function AdminDashboard () {
  const [states, setStates] = useState()
  const [adverts, setAdverts] = useState([])
  const { getAds } = useAds()
  const { getBarrios } = useBarrios()
  const { publications } = usePublications()

  useEffect(() => {
    getAds().then(setAdverts)
  }, [])

  useEffect(() => {
    getBarrios().then((res) =>
      setStates(normalizeBarriosList(res))
    )
  }, [])

  return (
    <div className="grid gap-5 py-5 px-1 place-content-center ">
      <div className="grid gap-5">
        <div className="">
          <Link href="/adverts/new">
            <PrimBtn color="secondary">
              {'Nuevo anuncio'}
            </PrimBtn>
          </Link>
        </div>
        <div className="">
          <Link href="/barrios/new">
            <PrimBtn color="primary">
              {'Nuevo Barrio'}
            </PrimBtn>
          </Link>
        </div>
      </div>
      <AdvertsTable
        adverts={adverts}
        publications={publications}
      />
      <BarriosTable states={states} />

    </div>
  )
}
