import Link from '@comps/Link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import s from './styles.module.css'

export default function StateList ({ statesList = [] }) {
  const [stateSelected, setStateSelected] = useState('')
  const [barrios, setBarrios] = useState([])

  const handleChangeSate = (tag) => {
    setStateSelected(tag)
  }

  useEffect(() => {
    const state = statesList.find(
      ({ tag }) => tag === stateSelected
    )
    if (state) {
      setBarrios(state.barrios)
    } else if (stateSelected === '') {
      setStateSelected('BCS')
    }
  }, [stateSelected])

  return (
    <>
      <Head>
        <title>Barrios - {stateSelected || 'Home'}</title>
      </Head>
      <div className={s.state_list}>
        {/* <div className={s.location}>
          <Switch label="Ubicacón" disabled name='location-active'/>
        </div> */}
        <div className="text-center">
          <h3 className="font-bold text-4xl mt-4">
            Negocios del barrio
          </h3>
          {statesList.map((state) => (
            <h4
              onClick={() => handleChangeSate(state.tag)}
              key={state.label}
            >
              {state.label}
            </h4>
          ))}
          {/* <select
            className={s.select}
            onChange={handleChange}
            value={stateSelected}
          >
            <option value="" unselectable='true'>
              {'Selecciona un Estado'}
            </option>
            {statesList.map((state) => (
              <option value={state.tag} key={state.label}>
                {state.label}
              </option>
            ))}
          </select> */}
        </div>
        <div className={s.barrios}>
          {barrios?.map((barrio, i) => (
            <div key={i} className={s.barrio}>
              <Link href={barrio.shortName}>
                <div
                  className={s.link}
                  style={{
                    backgroundImage:
                      'url(https://i.pinimg.com/originals/6a/a3/cf/6aa3cf588c7a6527610455c9c8d38837.jpg)'
                  }}
                ></div>
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
