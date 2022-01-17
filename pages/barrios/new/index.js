import BarrioForm from '@comps/BarrioForm'
import PrivateRoute from 'src/HOC/PrivateRoute'

export default function NewBarrio () {
  return (
    <PrivateRoute>
      <h3 className='text-center mt-5 font-bold '>Nuevo Barrio</h3>
      <BarrioForm />
    </PrivateRoute>
  )
}
