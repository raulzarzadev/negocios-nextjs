import { L } from '@comps/L'
import styles from './styles.module.css'

export default function StateList({ statesList = [], publications = [] }) {
  console.log(publications)
  return (
    <div className={styles.state_list}>
      {statesList.map((state) => (
        <div key={state.name} className={styles.state}>
          <h3 className={styles.state_title}>
            {`${state?.name}`}
            <em
              className={styles.barrios_quantity}
            >{` (${state.barrios?.length} Barrios)`}</em>
          </h3>
          {state?.barrios?.map((barrio, i) => (
            <h5 key={i} className={styles.barrio_title}>
              <L href={barrio.shortName}>{`${barrio.name}`}</L>
              <em className={styles.ads_quantity}>{` (${
                publications?.filter((pub) => pub?.barrioId === barrio?.shortName)
                  .length
              } Ads)`}</em>
            </h5>
          ))}
        </div>
      ))}
    </div>
  )
}
