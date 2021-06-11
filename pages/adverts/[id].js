import AdvertDetails from '@comps/AdvertDetails/AdvertDetails'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'

export default function EditAdvert () {
  const [advert, setAdvert] = useState(undefined)
  const router = useRouter()
  const { getAdvert } = useAds()

  useEffect(() => {
    const {
      query: { id }
    } = router
    if (id) {
      getAdvert(id).then(setAdvert)
    }
  }, [router])
  return (
    <AdvertDetails advert={advert} />
  )
}
