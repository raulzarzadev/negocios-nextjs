import { useState } from 'react'
import Modal from '../Modal'

export default function DeleteModal ({
  handleDelete = () => {},
  handleOpen,
  open,
  children
}) {
  const [textButton, setTextButton] = useState('Eliminar')

  return (
    <Modal
      handleOpen={handleOpen}
      open={open}
      title="Eliminar"
    >
      <div className="grid gap-4">
        <p>Desea eliminar este recurso</p>
        <div className="center">{children}</div>
        <button
          className="btn btn-error"
          onClick={() => {
            handleDelete()
            setTextButton('Eliminando')
            setTimeout(() => {
              handleOpen()
              setTextButton('Eliminar')
            }, 400)
          }}
        >
          {textButton}
        </button>
      </div>
    </Modal>
  )
}
