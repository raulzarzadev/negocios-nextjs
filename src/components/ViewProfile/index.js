import Advert from "@comps/Advert";
import { L } from "@comps/L";
import { firebaseLogout } from "firebase/client";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";

import styles from "./styles.module.css";

export default function ViewProfile() {
  const { getUserAds } = useAds();
  const handleLogOut = () => {
    firebaseLogout();
  };
  const [userAds, setUserAds] = useState();
  useEffect(() => {
    getUserAds().then((res) => setUserAds(res));
  }, []);
  console.log(userAds);
  return (
    <div className={styles.view_profile}>
      <div className={styles.profile_actions}>
        <div className={styles.action}>
          <button onClick={handleLogOut}>{"Salir"}</button>
        </div>
        <div className={styles.action}>
          <L href="/adverts/new">{"Nuevo Anuncio"}</L>
        </div>
        <div className={styles.action}>
          <L href="/barrios/new">{"Nuevo Barrio"}</L>
        </div>
      </div>
      <div>
        <h3>Anuncios creados</h3>
        {userAds && (
          <div className={styles.user_ads_grid}>
            {userAds.map((ad) => (
              <div key={ad.id} className={styles.grid_item}>
                <Advert advert={ad} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
