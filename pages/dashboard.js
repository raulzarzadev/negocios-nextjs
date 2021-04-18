import AdminDashboard from '@comps/AdminDashboard'
import Head from 'next/head'
import AdminRoute from 'src/HOC/AdminRoute'

export default function Dashboard () {
  return <>
  <Head>
    <title>
      Admin Dashboard
    </title>
  </Head>
  <AdminRoute Component={AdminDashboard} />
  </>
}
