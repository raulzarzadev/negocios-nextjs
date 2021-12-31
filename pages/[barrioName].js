import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAds } from 'src/hooks/useAds'
import AdvertsList from '@comps/AdvertsList'
import Filter from '@comps/Filter/index.js'
import Head from 'next/head'

export default function Barrio () {
  const { getAdsByBarrio } = useAds()
  const router = useRouter()

  const [barrio, setBarrio] = useState(undefined)

  const {
    query: { barrioName }
  } = router

  useEffect(() => {
    if (barrioName) {
      getAdsByBarrio(barrioName).then(setBarrio)
    }
  }, [barrioName])

  const [adverts, setAdverts] = useState(barrio?.ads || [])

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setAdverts(barrio?.ads)
  }, [barrio])

  useEffect(() => {
    if (filter === 'all') return setAdverts(barrio?.ads)
    setAdverts(filterAdsByLable)
  }, [filter])

  const handleSetFilter = (filter) => {
    setFilter(filter)
  }

  const filterAdsByLable = () => {
    const filtered = barrio?.ads?.filter((ad) => {
      return ad.labels.includes(filter)
    })
    return filtered
  }

  const labelsAvailables = barrio?.ads?.reduce(
    (acc, item) => {
      const labels = [...acc, item.labels]
        .flat()
        .reduce((acc, item) => {
          if (acc.includes(item)) return acc
          return [...acc, item]
        }, [])

      return labels
    },
    []
  )

  if (barrio === undefined) return 'Cargando...'
  return (
    <>
      <Head>
        <title>Barrio - {barrio.name}</title>
      </Head>
      <Filter
        labels={labelsAvailables}
        handleSetFilter={handleSetFilter}
      />
      <AdvertsList
        barrio={barrio}
        adverts={adverts}
        filter={filter}
        handleSetFilter={handleSetFilter}
      />
    </>
  )
}
