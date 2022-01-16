import DeleteModal from '@comps/Modals/DeleteModal'
import { deleteBarrio } from 'firebase/barrios'
import Link from 'next/link'
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
          <div className="pl-3">
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

  const [openDeleteBarrio, setOpenDeleteBarrio] =
    useState(false)

  const handleOpenDeleteBarrio = () => {
    setOpenDeleteBarrio(!openDeleteBarrio)
  }
  const handleDelete = () => {
    deleteBarrio({ barrioId: barrio.id }).then((res) =>
      console.log('res', res)
    )
  }

  return (
    <div key={barrio.id} className="flex">
      <div className="w-2/3">{`${barrio.name} `}</div>
      <div className="flex w-1/3 justify-evenly">
        <div className="">
          <Link href={`/barrios/edit/${barrio?.id}`}>
            <a className="text-info">
              <ICONS.Edit />
            </a>
          </Link>
        </div>
        <div className="">
          <button
            className="text-error"
            onClick={handleOpenDeleteBarrio}
          >
            <ICONS.Delete />
          </button>
        </div>
      </div>
      <DeleteModal
        open={openDeleteBarrio}
        handleOpen={handleOpenDeleteBarrio}
        handleDelete={handleDelete}
      >
        <div className="grid place-content-center text-center">
          <h2 className="font-bold">Barrio</h2>
          <div>Id: {`${barrio.id}`}</div>
          <div>Nombre: {`${barrio.name}`}</div>
        </div>
      </DeleteModal>
    </div>
  )
}
