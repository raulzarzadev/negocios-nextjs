import { L } from '@comps/L'
import Link from '@comps/Link'
import styles from './styles.module.css'

export default function StateList({ statesList = [], publications = [] }) {
  return (
    <div className={styles.state_list}>
      {statesList.map((state) => (
        <div key={state.name} className={styles.state}>
          <h1 className={styles.state_title}>
            {`${state?.name}`}
            <em
              className={styles.barrios_quantity}
            >{` (${state.barrios?.length} Barrios)`}</em>
          </h1>
          {state?.barrios?.map((barrio, i) => (
            <div key={i} className={styles.link}>
              <Link  href={barrio.shortName}>
                  <h2  className={styles.barrio_title}>
                    {`${barrio.name}`}
                    <em className={styles.ads_quantity}>{` (${
                      publications?.filter((pub) => pub?.barrioId === barrio?.shortName)
                      .length
                    } Ads)`}</em>
                  </h2>
                </Link>
              </div>
          ))}
        </div>
      ))}
    </div>
  )
}
