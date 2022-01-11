import Advert from '@comps/Advert.v3'
import Loading from '@comps/Loading'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'

export default function PublicationDetails () {
  const { getAdvert } = useAds()
  const {
    query: { advertId, barrioName }
  } = useRouter()
  useEffect(() => {
    if (barrioName && advertId) {
      getAdvert(advertId).then(setAdvert)
    }
  }, [advertId])
  const [advert, setAdvert] = useState(undefined)
  console.log('advertId', advert)
  if (!advert) return <Loading />
  return (
    <div className="">
      <Advert advert={advert} />
    </div>
  )
}
