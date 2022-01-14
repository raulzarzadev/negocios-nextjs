import AdvertPage from '@comps/Advert.v3/AdvertPage'
import Loading from '@comps/Loading'
import { listenAdvert } from 'firebase/adverts'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdvertContext from 'src/context/AdvertContext'

export default function PublicationDetails () {
  const {
    query: { advertId, barrioName }
  } = useRouter()
  useEffect(() => {
    if (barrioName && advertId) {
      listenAdvert({ id: advertId }, (res) => {
        setAdvert(res)
      })
    }
    return () => {
      setAdvert(undefined)
    }
  }, [advertId])
  const [advert, setAdvert] = useState(undefined)
  if (!advert) return <Loading />
  return (
    <div className="">
      <AdvertContext.Provider value={advert}>
        <AdvertPage showFavorite={true} />
      </AdvertContext.Provider>
    </div>
  )
}
