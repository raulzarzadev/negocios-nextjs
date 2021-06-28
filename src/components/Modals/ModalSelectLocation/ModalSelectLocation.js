import ICONS from 'src/utils/ICONS'
import Modal from '../Modal'
import s from './styles.module.css'

export default function ModalSelectLocation ({
  open,
  handleOpen,
  location,
  setLocation
}) {
  const handleChange = ({ target }) => {
    console.log('target.value', target.value)
    setLocation(target?.value)
  }
  return (
    <Modal
      open={open}
      handleOpen={handleOpen}
      title="Seleccionar Ubicación"
    >
      <div className={s.modal}>
        Pega el link de google maps aquí
        <input name="location" onChange={handleChange} />
        <div>
          <a
            href="https://www.google.com.mx/maps/"
            target="_blank"
            rel="noreferrer"
          >
            <ICONS.AddLocation fontSize='2rem'/>
          </a>
        </div>
        <div>
          {location && (
            <>
              <a
                href={location}
                target="_blank"
                rel="noreferrer"
              >
                Actual Ubicación
               <div style={{ fontSize: '.5rem' }}>
                  {location}
                 </div>
              </a>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
