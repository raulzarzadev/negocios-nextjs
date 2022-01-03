import Select from '@comps/Inputs/Select'
import Text from '@comps/Inputs/Text'
import Textarea from '@comps/Inputs/Textarea'
import TextIcon from '@comps/Inputs/TextIcon'
import Modal from '@comps/Modals/Modal'
import SelectLabels from '@comps/SelectLabels'
import { TextRotateVerticalOutlined } from '@material-ui/icons'
import { fb_getBarrios } from 'firebase/client'
import { useEffect, useState } from 'react'
import ICONS from 'src/utils/ICONS'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function NewAddForm () {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({})
  return (
    <div className="flex w-full border border-black justify-between max-w-md m-auto">
      <div className="steps steps-vertical border border-black w-1/3">
        <li
          onClick={() => setStep(1)}
          className={`step  ${step > 0 && 'step-primary'} `}
        >
          Información
        </li>
        <li
          onClick={() => setStep(2)}
          className={`step ${step > 1 && 'step-primary'} `}
        >
          Clasificación
        </li>
        <li
          onClick={() => setStep(3)}
          className={`step  ${step > 2 && 'step-primary'} `}
        >
          Contactos
        </li>
        <li
          onClick={() => setStep(4)}
          className={`step  ${step > 3 && 'step-primary'} `}
        >
          Publicación
        </li>
      </div>
      <div className=" w-2/3 p-2">
        {step === 1 && <Step1 form={form} />}
        {step === 2 && <Step2 form={form} />}
        {step === 3 && <Step3 form={form} />}
        {step === 4 && <Step4 form={form} />}
      </div>
    </div>
  )
}
const Step1 = ({ form }) => {
  const [openImages, setOpenImages] = useState()
  const handleOpenImages = () => {
    setOpenImages(!openImages)
  }
  return (
    <div>
      <p>Titulo:</p>
      <Text label={'Titulo'} />
      <Textarea label={'Resumen'} />
      <Textarea label={'Descripción'} rows={4} />
      <div className="flex justify-center p-3">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleOpenImages}
        >
          {' '}
          Imagenes
        </button>
        <Modal
          open={openImages}
          handleOpen={handleOpenImages}
          title="Imagenes"
        >
          <div className="grid grid-cols-3 gap-4 ">
            <div className="border-dashed border-2 border-gray-600 rounded-lg h-16 w-16"></div>
            <div className=" border-2 border-gray-600 rounded-lg h-16 w-16"></div>
            <div className=" border-2 border-gray-600 rounded-lg h-16 w-16"></div>
            <div className=" border-2 border-gray-600 rounded-lg h-16 w-16"></div>
            <div className=" border-2 border-gray-600 rounded-lg h-16 w-16"></div>
            <div className="  border-2 border-gray-600 rounded-lg h-16 w-16"></div>
          </div>
        </Modal>
        {/*   <input
          className="file:btn file:btn-sm file:btn-primary"
          type={'file'}
          multiple="true"
          accept=".png, .jpg, .jpeg"
        /> */}
      </div>
    </div>
  )
}

const Step2 = ({ form }) => {
  return (
    <div>
      <p>Titulo:</p>
      <SelectLabels
        labels={[]}
        setLabels={(a) => {
          console.log(a)
        }}
      />
    </div>
  )
}

const Step3 = ({ form }) => {
  return (
    <div>
      <h3>Contactos</h3>
      <div className="grid gap-2 ">
        <TextIcon
          placeholder="whatsapp"
          className={'input-sm'}
          icon={<ICONS.Whatsapp />}
        />
        <TextIcon
          placeholder={'Instagram'}
          className={'input-sm'}
          icon={<ICONS.Instagram />}
        />
        <TextIcon
          placeholder={'facebook'}
          className={'input-sm'}
          icon={<ICONS.Facebook />}
        />
      </div>
    </div>
  )
}

const Step4 = ({ form }) => {
  const [barrios, setBarrios] = useState()
  const TIMES = [
    { value: '1_month', label: '1 mes' },
    { value: '3_months', label: '3 meses' },
    { value: '6_months', label: '6 meses' },
    { value: '1_year', label: '1 año' }
  ]
  useEffect(() => {
    fb_getBarrios().then((res) =>
      setBarrios(normalizeBarriosList(res))
    )
  }, [])
  console.log('barrios', barrios)
  return (
    <div>
      <h3>Publicar</h3>
      <div className="grid gap-2 ">
        <Select
          label={'Barrio'}
          placeholder={'Barrios'}
          options={barrios}
        />
        <Select
          options={TIMES}
          label={'Tiempo '}
          placeholder={'Tiempo'}
        />
      </div>
    </div>
  )
}
