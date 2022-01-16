import PrimBtn from '@comps/PrimBtn'
import { ESTADOS_LABEL_MX } from 'CONST/ESTADOS_MX'
import { addBarrio } from 'firebase/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function NewBarrioForm ({ barrio }) {
  const router = useRouter()
  const STATES = ESTADOS_LABEL_MX

  const [form, setForm] = useState({
    state: 'AGU',
    barrio: '',
    shortName: ''
  })

  useEffect(() => {
    if (barrio) setForm(barrio)
  }, [barrio])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (form) => {
    addBarrio(form).then((res) => {
      router.push('/profile')
      console.log(res)
    })
    setLoading(true)
  }

  const [loading, setLoading] = useState(false)

  const isDisabled =
    !form.state || !form.name || !form.shortName || loading

  return (
    <div className={styles.form_container}>
      <h3>Nuevo Barrio</h3>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
      >
        {/* SELECCIONA ESTADO */}
        <div className={styles.span_input}>
          <p>Estado:</p>
          <select
            className={styles.input}
            name="state"
            onChange={handleChange}
            value={form?.state}
          >
            {STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        {/* NOMBRE DEL BARRIO */}
        <div className={styles.span_input}>
          <p>Barrio:</p>
          <input
            className={styles.input}
            type="text"
            name="name"
            onChange={handleChange}
            value={form?.name}
          />
        </div>
        {/* NOMBRE CORTO */}
        {/* NOMBRE DEL BARRIO */}
        <div className={styles.span_input}>
          <p>Nombre Corto:</p>
          <input
            className={styles.input}
            type="text"
            name="shortName"
            onChange={handleChange}
            value={form?.shortName}
          />
        </div>
        <div>
          <PrimBtn color="primary" disabled={isDisabled}>
            Guardar
          </PrimBtn>
        </div>
      </form>
    </div>
  )
}
