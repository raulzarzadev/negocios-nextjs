import Select from '@comps/Inputs/Select'
import { addDays } from 'date-fns'
// eslint-disable-next-line camelcase
import { fb_getBarrios } from 'firebase/client'
import { useEffect, useState } from 'react'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'

export default function PublishForm({ form, setForm }) {
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

  const handleSubmit = (form) => {
    console.log(' form.period', form.period)
    const startAt = new Date()
    const finishAt = addDays(startAt, form?.period)

    const period = {
      days: form.period,
      startAt: startAt,
      finishAt: finishAt
    }
    /* const dates = datesToFirebaseFromat({
      document: { ...form, period }
    })

    const publication = {
      // advertId,
      // barrioId: form?.barrio,
      // publishEnds,
      // publishStart,
      // active: true
    } */
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
