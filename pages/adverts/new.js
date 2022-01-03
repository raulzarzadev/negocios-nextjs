import NewAddForm from '@comps/NewAddForm'
import PrivateRoute from 'src/HOC/PrivateRoute'

export default function NewAdvert () {
  return <PrivateRoute Component={NewAddForm}/>
}
