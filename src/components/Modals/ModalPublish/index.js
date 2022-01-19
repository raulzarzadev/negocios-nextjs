import Modal from '@comps/Modals/Modal'
import React, { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import { useBarrios } from 'src/hooks/useBarrios'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function ModalPubish ({
  open,
  handleOpen = () => {},
  advertId
}) {
  const [barrios, setBarrios] = useState()
  const { getBarrios } = useBarrios()
  const { publishAdvert } = useAds()
  const [form, setForm] = useState({
    barrio: '',
    duration: '6_months'
  })

  useEffect(() => {
    getBarrios().then((res) =>
      setBarrios(normalizeBarriosList(res))
    )
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (form) => {
    const periods = {
      '1_month': 1,
      '3_months': 3,
      '6_months': 6,
      '1_year': 12
    }
    const today = new Date()
    console.log(today.getMonth() + periods[form.duration])
    const publishStart = today.toISOString()
    const publishEnds = new Date(
      today.setMonth(
        today.getMonth() + periods[form.duration]
      )
    ).toISOString()
    const publication = {
      advertId,
      barrioId: form?.barrio,
      publishEnds,
      publishStart,
      active: true,
      status: 'ACTIVE'
    }
    publishAdvert(publication).then((res) => {
      setMessage({ type: 'success', message: 'Publicado' })
      setTimeout(() => {
        setForm({ ...form, barrio: '' })
        setMessage(null)
      }, 500)
    })
  }
  const [message, setMessage] = useState(null)
  const isValid = !form.barrio || !form.duration

  return (
    <Modal
      open={open}
      handleOpen={handleOpen}
      title="Publicar "
    >
      {/*  <form
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit(form);
        }}
      > */}
      <div className="min-h-[300px] grid place-content-center gap-2">
        <label className="flex flex-col items-start ">
          {'Publicar en: '}
          <select
            className="w-full select"
            onChange={handleChange}
            name="barrio"
            value={form?.barrio}
          >
            {barrios?.map((state) => (
              <React.Fragment key={state.label}>
                <option value="">{'Selecciona'}</option>
                <optgroup label={state.label}>
                  {state.barrios.map((barrio) => (
                    <option
                      key={barrio?.id}
                      value={barrio.id}
                    >
                      {barrio.name}
                    </option>
                  ))}
                </optgroup>
              </React.Fragment>
            ))}
          </select>
        </label>
        <label className="flex flex-col items-start ">
          {'Publicar por : '}
          <select
            className="w-full select"
            onChange={handleChange}
            name="duration"
            value={form?.duration}
          >
            <option value="1_month">{'1 mes'} </option>
            <option value="3_months">{'3 meses'} </option>
            <option value="6_months">{'6 meses'}</option>
            <option value="1_year">{'1 año '}</option>
          </select>
        </label>
        {/* Select barrio */}
        {/* Select tiempo de duración */}
        {message
          ? (
              message.message
            )
          : (
          <button
            className="btn btn-primary my-3"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(form)
            }}
            disabled={isValid}
          >
            Publicar
          </button>
            )}
      </div>
      {/* </form> */}
    </Modal>
  )
}
