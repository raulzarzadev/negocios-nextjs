import Link from '@comps/Link'
import Switch from '@comps/Switch'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import s from './styles.module.css'

export default function StateList ({ statesList = [] }) {
  const [stateSelected, setStateSelected] = useState('')
  const [barrios, setBarrios] = useState([])

  const handleChange = (e) => {
    setStateSelected(e.target.value)
  }

  useEffect(() => {
    const state = statesList.find(
      ({ tag }) => tag === stateSelected
    )
    if (state) {
      setBarrios(state.barrios)
    }
  }, [stateSelected])

  return (
    <>
    <Head>
      <title>Barrios - {stateSelected || 'Home'}</title>
    </Head>
      <div className={s.state_list}>
        <div className={s.location}>
          <Switch label="Ubicacón" disabled name='location-active'/>
        </div>
        <div className={s.select_content}>
          <select
            className={s.select}
            onChange={handleChange}
          >
            <option value="" unselectable>
              {'Selecciona un Estado'}
            </option>
            {statesList.map((state) => (
              <option value={state.tag} key={state.label}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        <div className={s.barrios}>
          <h5>Barrios</h5>
          {barrios?.map((barrio, i) => (
            <div key={i} className={s.link}>
              <Link href={barrio.shortName}>
                <h4 className={s.barrio_title}>
                  {`${barrio.name}`}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
