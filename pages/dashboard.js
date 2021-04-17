import AdminDashboard from '@comps/AdminDashboard'
import AdminRoute from 'src/HOC/AdminRoute'

export default function Dashboard () {
  return <AdminRoute Component={AdminDashboard} />
}
