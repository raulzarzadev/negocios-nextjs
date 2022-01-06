import AdvertForm from '@comps/AdvertForm'
import PrivateRoute from 'src/HOC/PrivateRoute'

export default function NewAdvert () {
  return <PrivateRoute Component={AdvertForm} />
}
