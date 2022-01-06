import AdvertForm from '@comps/AdvertForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PrivateRoute from 'src/HOC/PrivateRoute'
import { useAds } from 'src/hooks/useAds'

export default function EditAdvert () {
  const [advert, setAdvert] = useState(undefined)
  const router = useRouter()
  const { getAdvert } = useAds()

  const {
    query: { id }
  } = router

  useEffect(() => {
    if (id) {
      getAdvert(id).then(setAdvert)
    }
  }, [id])
  return (
    <PrivateRoute Component={AdvertForm} advert={advert} />
  )
}
