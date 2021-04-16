
import Modal from '@comps/Modal'
import SelectLabels from '@comps/SelectLabels'
import s from './styles.module.css'
	
export default function ModalSelectLabels ({ handleOpen, open, labels, setLabels}) {
 
 return (
      <Modal
        title="Clasifica tu anuncio"
        open={open}
        handleOpen={handleOpen}
        className={s.modal}
      >
        <SelectLabels labels={labels} setLabels={setLabels} />
      </Modal> 
  )
}
