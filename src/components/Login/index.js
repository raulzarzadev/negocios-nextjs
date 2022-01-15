import ButtonGoogle from '@comps/ButtonGoogle'
import { loginWithGoogle } from 'firebase/client'
import useUser from 'src/context/UserContext'
import ICONS from 'src/utils/ICONS'

export default function LoginView () {
  const { setUser } = useUser()
  const handleClick = () => {
    loginWithGoogle()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="pt-16 p-2">
      <div className=" p-1 rounded-md shadow-lg bg-white ">
        <p className="text-center bg-info rounded-lg px-2 text-xs relative pl-6">
          Por tu seguridad dejamos usamos google para
          verificar la veracidad de la información de
          nuestros usuarios y anunciantes
          <span className="absolute top-0 left-0">
            <ICONS.Info className="text-white" />
          </span>
        </p>
        <div className="p-2 text-center">
          Para facilitar tu registro se obtendra la
          siguiente información de tu cuenta de google
          <ul className="text-left list-disc pl-8">
            <li className="">Correo electronico</li>
            <li className="">Nombre asociado</li>
            <li className="">Imagen asociada</li>
          </ul>
        </div>
        <label className='flex pl-4 my-4197346
        ' >
          <input type="checkbox" className="mr-2" />
          <span>
            Autorizo el uso de mi cuenta de google
          </span>
        </label>
        <ButtonGoogle onClick={handleClick} />
      </div>
    </div>
  )
}
