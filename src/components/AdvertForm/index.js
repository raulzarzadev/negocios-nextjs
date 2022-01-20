/* eslint-disable camelcase */
import SelectLabels from '@comps/SelectLabels'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ICONS from 'src/utils/ICONS'
import router from 'next/router'
import Loading from '@comps/Loading'
import ContactsForm from './ContactsForm'
import PublishForm from './PublishForm'
import InfoForm from './InfoForm'

export default function AdvertForm ({
  advert = null,
  loading = false
}) {
  console.log('advert', advert)
  if (loading) return <Loading size="lg" />

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({})
  const { addAdvert, editAdvert } = useAds()
  useEffect(() => {
    if (advert) {
      setForm(advert)
    }
  }, [advert])
  const STEPS = [
    { title: 'Informacion' },
    { title: 'Clasificación' },
    { title: 'Contactos' }
    /* { title: 'Publicar' } */
  ]
  const addStep = () => {
    step < STEPS.length && setStep(step + 1)
  }
  const subStep = () => {
    step > 0 && setStep(step - 1)
  }
  const handleSubmit = () => {
    /* --------------Edit Advert-------------- */
    if (form?.id) {
      editAdvert(advert.id, form).then((res) => {
        console.log('res', res)
      })
    } else {
      /* --------------New Advert-------------- */
      console.log('form', form)
      addAdvert(form).then(({ res }) => {
        // TODO add check ok box
        console.log('res', res)
        if (res?.advert?.id) {
          console.log('res.advert', res.advert)
          setTimeout(() => {
            router.push(`/adverts/edit/${res?.advert?.id}`)
            // router.back()
            // router.push('/profile')
          }, 1000)
        }
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
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const Step1 = ({ form = {}, setForm = () => {} }) => {
  return <InfoForm form={form} setForm={setForm} />
}

const Step2 = ({ form = {}, setForm = () => {} }) => {
  return (
    <div>
      <SelectLabels
        labels={form.labels}
        setLabels={(labels) => {
          setForm({ ...form, labels })
        }}
      />
    </div>
  )
}

const Step3 = ({ form = {}, setForm = () => {} }) => {
  return <ContactsForm form={form} setForm={setForm} />
}

const Step4 = ({ form = {}, setForm = () => {} }) => {
  return <PublishForm form={form} setForm={setForm} />
}
