import PrivateRoute from 'src/HOC/PrivateRoute'
import ViewProfile from '@comps/ViewProfile'
import Head from 'next/head'

export default function Profile () {
  return (
    <>
    <Head>
      <title>
        User Profile
      </title>
    </Head>
      <PrivateRoute Component={ViewProfile} />
    </>
  )
}
