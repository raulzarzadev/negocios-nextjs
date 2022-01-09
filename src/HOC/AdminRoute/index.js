import useUser from 'src/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@comps/Loading'

export default function AdminRoute({ Component, ...res }) {
  const router = useRouter()
  const { user } = useUser()
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.admin) {
      setUserData(user)
      setLoading(false)
    }
    if (!user?.admin) router.replace('/profile')
  }, [user])

  if (loading) return <Loading size="lg" />

  return <Component {...res} user={userData} />
}
