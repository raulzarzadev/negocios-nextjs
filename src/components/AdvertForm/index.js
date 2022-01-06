import Select from '@comps/Inputs/Select'
import Text from '@comps/Inputs/Text'
import Textarea from '@comps/Inputs/Textarea'
import TextIcon from '@comps/Inputs/TextIcon'
import Modal from '@comps/Modals/Modal'
import SelectLabels from '@comps/SelectLabels'
import { addDays } from 'date-fns'
import { fb_getBarrios } from 'firebase/client'
import { datesToFirebaseFromat } from 'firebase/firebase-helpers'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ICONS from 'src/utils/ICONS'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function AdvertForm ({ advert = null }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({})
  console.log('advert', useAds)
  const { addAdvert, editAdvert } = useAds()
  useEffect(() => {
    if (advert) {
      setForm(advert)
    }
  }, [advert])
  const STEPS = [
    { title: 'Informacion' },
    { title: 'Clasificación' },
    { title: 'Contactos' },
    { title: 'Publicar' }
  ]
  const addStep = () => {
    step < STEPS.length && setStep(step + 1)
  }
  const subStep = () => {
    step > 0 && setStep(step - 1)
  }

  const handleSubmit = () => {
    /* --------------Edit Advert-------------- */
    if (advert?.id) {
      editAdvert(advert.id, form).then((res) => {
        console.log('res', res)
        setTimeout(() => {
          router.back()
        }, 400)
      })
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form).then((res) => {
        // TODO add check ok box
        console.log('res', res)

        setTimeout(() => {
          router.back()
          // router.push('/profile')
        }, 1000)
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex-col sm:grid sm:grid-cols-3  w-full  justify-between max-w-md m-auto  ">
        <div className="steps sm:steps-vertical  w-full sm:w-max  mt-4   sm:h-screen sticky top-0">
          {STEPS.map(({ title }, i) => {
            return (
              <li
                key={i}
                onClick={() => setStep(i)}
                className={`step  ${
                  i <= step && 'step-info'
                } `}
              >
                <span className="hidden sm:block">
                  {title}
                </span>
              </li>
            )
          })}
        </div>

        <div className=" sm:col-span-2 grid w-full p-2 gap-2 ">
          <div className="flex justify-center">
            <button
              disabled={step === 0}
              className={
                'font-bold  disabled:opacity-25 p-1 rounded-full  shadow-lg flex justify-center items-center'
              }
              onClick={subStep}
            >
              <ICONS.ArrowLeft />
            </button>
            <div className="w-40 text-center">
              <h3 className="text-center text-lg font-bold">
                {STEPS[step]?.title}
              </h3>
            </div>
            <button
              disabled={step === STEPS.length - 1}
              className={
                'font-bold disabled:opacity-25 p-1 rounded-full  shadow-lg flex justify-center items-center'
              }
              onClick={addStep}
            >
              <ICONS.ArrowRight />
            </button>
          </div>
          {step === 0 && (
            <Step1 form={form} setForm={setForm} />
          )}
          {step === 1 && (
            <Step2 form={form} setForm={setForm} />
          )}
          {step === 2 && (
            <Step3 form={form} setForm={setForm} />
          )}
          {step === 3 && (
            <Step4 form={form} setForm={setForm} />
          )}
          <div className="text-center">
            <button className="btn" onClick={handleSubmit}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const Step1 = ({ form = {}, setForm = () => {} }) => {
  const [openImages, setOpenImages] = useState()
  const handleOpenImages = () => {
    setOpenImages(!openImages)
  }
  const handleChange = ({ target }) => {
    setForm({ ...form, [target?.name]: target?.value })
  }
  return (
    <div>
      <Text
        label={'Titulo'}
        onChange={handleChange}
        value={form?.title}
        name={'title'}
      />
      <Textarea
        onChange={handleChange}
        value={form?.resume}
        label={'Resumen'}
        name={'resume'}
      />
      <Textarea
        rows={4}
        onChange={handleChange}
        label={'Descripción'}
        name={'description'}
        value={form?.description}
      />
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

const Step2 = ({ form = {}, setForm = () => {} }) => {
  return (
    <div>
      <SelectLabels
        labels={[]}
        setLabels={(labels) => {
          setForm({ ...form, labels })
        }}
      />
    </div>
  )
}

const Step3 = ({ form = {}, setForm = () => {} }) => {
  const handleChange = ({ target }) => {
    setForm({
      ...form,
      contacts: {
        ...form.contacts,
        [target.name]: target.value
      }
    })
  }
  return (
    <div>
      <div className="grid gap-2 ">
        <TextIcon
          placeholder="Whatsapp"
          className={'input-sm'}
          icon={<ICONS.Whatsapp />}
          onChange={handleChange}
          name={'whatsapp'}
        />
        <TextIcon
          placeholder={'Instagram'}
          className={'input-sm'}
          icon={<ICONS.Instagram />}
          onChange={handleChange}
          name={'instagram'}
        />
        <TextIcon
          placeholder={'Facebook'}
          className={'input-sm'}
          icon={<ICONS.Facebook />}
          onChange={handleChange}
          name={'facebook'}
        />
      </div>
    </div>
  )
}

const Step4 = ({ form = {}, setForm = () => {} }) => {
  const [_form, _setForm] = useState({})
  const [barrios, setBarrios] = useState()
  const DAYS_MONTH = 30
  const TIMES = [
    { value: DAYS_MONTH * 1, label: '1 mes' },
    { value: DAYS_MONTH * 3, label: '3 meses' },
    { value: DAYS_MONTH * 6, label: '6 meses' },
    { value: DAYS_MONTH * 12, label: '1 año' }
  ]
  useEffect(() => {
    fb_getBarrios().then((res) =>
      setBarrios(normalizeBarriosList(res))
    )
  }, [])
  const handleChange = ({ target }) => {
    _setForm({ ..._form, [target.name]: target.value })
  }
  console.log('_form', _form)

  const handleSubmit = (form) => {
    console.log(' form.period', form.period)
    const startAt = new Date()
    const finishAt = addDays(startAt, form?.period)

    const period = {
      days: form.period,
      startAt: startAt,
      finishAt: finishAt
    }
    const dates = datesToFirebaseFromat({
      document: { ...form, period }
    })
    console.log('dates', dates)

    const publication = {
      // advertId,
      // barrioId: form?.barrio,
      // publishEnds,
      // publishStart,
      // active: true
    }
    console.log('publication', period)
    /*
    publishAdvert(publication).then((res) => {
      console.log('res', res)
    }) */
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(_form)
        }}
      >
        <div className="grid gap-2 ">
          <Select
            label={'Barrio'}
            placeholder={'Barrios'}
            options={barrios}
            onChange={handleChange}
            name="barrio"
          />
          <Select
            options={TIMES}
            label={'Tiempo '}
            placeholder={'Tiempo'}
            onChange={handleChange}
            name="period"
          />
          <button className="btn btn-primary mx-auto my-2">
            Guardar y publicar
          </button>
        </div>
      </form>
    </div>
  )
}
