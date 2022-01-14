import Modal from '../Modal'
import router from 'next/router'
export default function LoginModal ({ open, handleOpen }) {
  return (
    <div className="">
      <Modal
        open={open}
        handleOpen={handleOpen}
        title="Registrate"
      >
        Para continuar debes registrarte primero
        <button
          className="btn btn-primary"
          onClick={() => router.push('/login')}
        >
          Registrate
        </button>
      </Modal>
    </div>
  )
}
