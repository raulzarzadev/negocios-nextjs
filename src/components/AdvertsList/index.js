import Advert2 from "@comps/Advert2";
import styles from "./styles.module.css";

export default function AdvertsList({ barrio = undefined, adverts }) {
  return (
    <div className={styles.barrio}>
      <h2 className={styles.title}>{barrio?.name}</h2>
      <span>
        <em>
         {`${barrio.shortName} - ${barrio.state} - ads (${barrio?.ads?.length})`}
        </em>
        </span>
      <div className={styles.grid}>
        {adverts?.map((ad, i) => (
          <div key={i} className={styles.item}>
            <Advert2 advert={ad} showFavorite/>
          </div>
        ))}
      </div>
    </div>
  );
}
