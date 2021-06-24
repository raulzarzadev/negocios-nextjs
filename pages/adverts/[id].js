import AdvertDetails from '@comps/AdvertDetails/AdvertDetails'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'

export default function EditAdvert () {
  const [advert, setAdvert] = useState(undefined)
  const router = useRouter()
  const { getAdvert } = useAds()

  const {
    query: { id }
  } = router
  console.log('id', id)

  useEffect(() => {
    if (id) {
      getAdvert(id).then(setAdvert)
    }
  }, [id])

  return (
    <AdvertDetails advert={advert} />
  )
}
