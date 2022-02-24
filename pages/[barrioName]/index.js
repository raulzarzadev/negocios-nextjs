import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdvertsList from '@comps/AdvertsList'
import Filter from '@comps/Filter/index.js'
import Head from 'next/head'
import Loading from '@comps/Loading'
import { listenBarrioActivePublications } from 'firebase/publications'
import { fbGetAdvert } from 'firebase/adverts'
// eslint-disable-next-line camelcase
import { fb_getBarrio } from 'firebase/client'
// TODO this page is bloqued by ads blocking
export default function Barrio () {
  //  const { getAdsByBarrio } = useAds()
  const router = useRouter()

  const [barrio, setBarrio] = useState(undefined)

  const {
    query: { barrioName }
  } = router

  useEffect(() => {
    if (barrioName) {
      fb_getBarrio(barrioName).then(setBarrio)
      listenBarrioActivePublications(
        { barrioId: barrioName },
        setPublications
      )
    }
  }, [barrioName])

  const [publications, setPublications] =
    useState(undefined)

  useEffect(() => {
    if (publications) {
      const adverts = publications?.map((publication) =>
        fbGetAdvert({ id: publication.advertId }).then(
          (advert) => {
            return { ...advert, publication }
          }
        )
      )
      Promise.all(adverts).then((ads) => setAdverts(ads))
    }
  }, [publications])

  const [adverts, setAdverts] = useState([])
  const [advertsFiltered, setAdvertsFiltered] = useState([])

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (filter === 'all') return setAdvertsFiltered(adverts)
    setAdvertsFiltered(
      adverts?.filter((ad) => {
        return ad.labels.includes(filter)
      })
    )
  }, [filter, adverts])

  const handleSetFilter = (filter) => {
    setFilter(filter)
  }

  const labelsAvailables = adverts?.reduce((acc, item) => {
    const labels = [...acc, item.labels]
      .flat()
      .reduce((acc, item) => {
        if (acc.includes(item)) return acc
        return [...acc, item]
      }, [])

    return labels
  }, [])
  if (!publications === undefined) {
    return <Loading size="lg" />
  }
  return (
    <>
      <Head>
        <title>Barrio - {barrio?.name}</title>
      </Head>
      <div className="sticky top-0 right-0 left-0 bg-white z-10">
        <Filter
          labels={labelsAvailables}
          handleSetFilter={handleSetFilter}
        />
        <h3 className="text-center mt-2 text-xl font-bold">
          {barrio?.name}{' '}
          <span className="text-xs">
            ({advertsFiltered.length})
          </span>
        </h3>
      </div>
      <AdvertsList
        adverts={advertsFiltered}
        filter={filter}
        handleSetFilter={handleSetFilter}
      />
    </>
  )
}
