import useUser from 'src/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@comps/Loading'

export default function PrivateRoute ({
  Component,
  children,
  ...res
}) {
  const router = useRouter()
  const { user } = useUser()
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setUserData(user)
      setLoading(false)
    }
    // console.log(user)
    //  if (user === null) router.replace('/')
  }, [user])

  if (loading) return <Loading size="lg" />

  if (children) return children

  return <Component {...res} user={userData} />
}
