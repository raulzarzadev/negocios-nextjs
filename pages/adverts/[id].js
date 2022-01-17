import AdvertPage from '@comps/Advert.v3/AdvertPage'
import Loading from '@comps/Loading'
import { listenAdvert } from 'firebase/adverts'
import { fbGetPublication } from 'firebase/publications'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdvertContext from 'src/context/AdvertContext'

export default function PublicationDetails () {
  const {
    query: { id, publication: publicationId }
  } = useRouter()
  const [publication, setPublication] = useState()
  useEffect(() => {
    if (publicationId) {
      fbGetPublication({ id: publicationId }).then(
        setPublication
      )
    }
  }, [publicationId])
  useEffect(() => {
    if (id) {
      listenAdvert({ id }, (res) => {
        setAdvert(res)
      })
    }

    return () => {
      setAdvert(undefined)
    }
  }, [id])

  const [advert, setAdvert] = useState(undefined)

  if (!advert) return <Loading />
  return (
    <div className="">
      <AdvertContext.Provider
        value={{ ...advert, publication }}
      >
        <AdvertPage showFavorite={true} />
      </AdvertContext.Provider>
    </div>
  )
}
