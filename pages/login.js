import LoginView from '@comps/Login'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from 'src/context/UserContext'

export default function Login () {
  const router = useRouter()
  const { user } = useUser()
  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  })
  return (
    <>
      <Head>
        <title>NdB - Ingresa</title>
      </Head>
      <LoginView />
    </>
  )
}
