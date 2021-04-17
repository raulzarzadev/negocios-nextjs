import NewBarrioForm from '@comps/NewBarrioForm'
import PrivateRoute from 'src/HOC/PrivateRoute'

export default function NewBarrio () {
  return <PrivateRoute Component={NewBarrioForm}/>
}
