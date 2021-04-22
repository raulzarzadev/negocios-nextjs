import NewAdForm from '@comps/NewAdForm'
import PrivateRoute from 'src/HOC/PrivateRoute'

export default function NewAdvert () {
  return <PrivateRoute Component={NewAdForm}/>
}
