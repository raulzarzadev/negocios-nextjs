import { useState } from 'react'
import ICONS from 'src/utils/ICONS'

export default function BarriosTable ({ states }) {
  return (
    <div className="">
      <h3 className="text-lg font-bold text-center">
        {'Barrios por estado'}
      </h3>
      {states?.map(({ tag, label, barrios }) => (
        <div key={tag} className="shadow-md p-1 rounded-lg">
          <div>
            <h4>
              {`${label} - ${tag} `}
              <span className="">
                {`( ${barrios?.length} )`}
              </span>
            </h4>
          </div>
          <div className='pl-3'>
            {barrios.map((barrio) => (
              <BarrioRow key={barrio.id} barrio={barrio} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BarrioRow ({ barrio }) {
  const [openModalEditBarrio, setOpenModalEditBarrio] =
    useState(false)

  const handleEditBarrio = () => {
    setOpenModalEditBarrio(!openModalEditBarrio)
  }

  const [openDeleteBarrio, setOpenDeleteBarrio] = useState()

  const handleDeleteBarrio = () => {
    setOpenDeleteBarrio(!openDeleteBarrio)
  }

  return (
    <div key={barrio.id} className="flex">
      <div className="w-2/3">{`${barrio.name} `}</div>
      <div className="flex w-1/3 justify-evenly">
        <div className="">
          <button className='text-info' onClick={handleEditBarrio}>
            <ICONS.Edit />
          </button>
        </div>
        <div className="">
          <button className='text-error' onClick={handleDeleteBarrio}>
            <ICONS.Delete />
          </button>
        </div>
      </div>
    </div>
  )
}
