
import ColorPicker from '@comps/ColorPicker'
import Modal from '@comps/Modals/Modal'

export default function ModalColorPicker ({ open, handleOpen, color, setColor }) {
  return (
    <Modal
      title="Selecciona un colo de fondo"
      open={open}
      handleOpen={handleOpen}
    >
      <div>
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </Modal>
  )
}
