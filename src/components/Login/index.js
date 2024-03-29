import ButtonGoogle from '@comps/ButtonGoogle'
import { loginWithGoogle } from 'firebase/client'
import { useState } from 'react'
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
  const [disabled, setDisabled] = useState(true)
  const changeDisabled = ({ target }) => {
    setDisabled(!target.checked)
  }
  return (
    <div className="pt-16 p-2">
      <div className=" p-1 rounded-md shadow-lg bg-white max-w-sm mx-auto">
        <h3 className="text-center text-2xl font-bold mt-2">
          Ingresa
        </h3>
        <p className="text-center bg-info rounded-lg px-2 text-xs relative p-1 my-5 max-w-xs mx-auto flex items-center">
          <span className="">
            <ICONS.Info className="text-white" />
          </span>
          Usamos Google para verificar el email de nuestros
          usuarios y anunciantes
        </p>
        <div className="p-2 text-center my-5">
          Para facilitar tu registro se obtendra la
          siguiente información de tu cuenta de Google
          <ul className="text-left list-disc pl-32">
            <li className="">Correo electronico</li>
            <li className="">Nombre </li>
            <li className="">Imagen </li>
          </ul>
        </div>
        <label className="flex pl-4 ">
          <input
            type="checkbox"
            className="mr-2"
            onChange={changeDisabled}
          />
          <span>Autoriza conectar con Google</span>
        </label>
        <div className="flex justify-center py-5">
          <ButtonGoogle
            disabled={disabled}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}
