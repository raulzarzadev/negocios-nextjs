import Advert from "@comps/Advert";
import styles from "./styles.module.css";

export default function AdvertsList({ barrio = undefined, adverts }) {
  return (
    <div className={styles.barrio}>
      <div className={styles.filter}></div>
      <h2 className={styles.title}>{barrio?.name}</h2>
      <div className={styles.adverts}>
        {adverts?.map((ad, i) => (
          <div key={i} className={styles.advert}>
            <Advert advert={ad} showFavorite/>
          </div>
        ))}
      </div>
    </div>
  );
}
