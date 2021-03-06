import { L } from "@comps/L";
import styles from "./styles.module.css";

export default function StateList({ statesList = [] }) {
  return (
    <div className={styles.state_list}>
      {statesList.map((state) => (
        <div key={state.name} className={styles.state}>
          <h3
            className={styles.state_title}
          >{`${state?.name} (${state.barrios?.length})`}</h3>
          {state?.barrios?.map((barrio, i) => (
            <h5 key={i} className={styles.barrio}>
              <L href={barrio.shortName}>{`${barrio.name} (${
                barrio.advertsPublished || "0"
              })`}</L>
            </h5>
          ))}
        </div>
      ))}
    </div>
  );
}
