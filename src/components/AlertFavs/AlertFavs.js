import ButtonGoogle from '@comps/ButtonGoogle'
import Modal from '@comps/Modal'
import { loginWithGoogle } from 'firebase/client'
import { useUser } from 'src/context/UserContext'
import s from './styles.module.css'

export default function AlertFavs ({ open, handleOpen }) {
  const { setUser } = useUser()
  const handleClick = () => {
    loginWithGoogle()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => console.log(err))
  }
  return (
    <Modal
      open={open}
      handleOpen={handleOpen}
      title="Usuario sin registro"
      otraprop="propeidd ds dad adasd ads sadad"
    >
      <div className={s.content}>

    <h4>Usuario sin registro</h4>
        <div>
          <em>Necesitas estar registrado para guardar favoritos</em>
        </div>
        <div className={s.button}>
          <ButtonGoogle onClick={handleClick} color="secondary" label="Ingresa con Google" />
        </div>
      </div>
    </Modal>
  )
}
