import Advert from "@comps/Advert";
import { L } from "@comps/L";
import { firebaseLogout } from "firebase/client";
import { useEffect, useState } from "react";
import { useUser } from "src/context/UserContext";
import { useAds } from "src/hooks/useAds";

import styles from "./styles.module.css";

export default function ViewProfile() {
  const { getUserAds, getUserActiveAds, favorites } = useAds();
  const { favoritesList } = useUser();
  const handleLogOut = () => {
    firebaseLogout();
  };
  const [userAds, setUserAds] = useState();

  useEffect(() => {
    getUserAds().then((res) => setUserAds(res));
  }, []);
  const [publishedAds, setPublishedAds] = useState([]);
  useEffect(() => {
    getUserActiveAds().then(setPublishedAds);
  }, []);

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
        <div className={styles.action}>
          <L href="/dashboard">{"Dashboard"}</L>
        </div>
      </div>
      <div>
        <h3>Favoritos Guardados</h3>
        {favorites.length === 0 ? (
          <p>No has guardado</p>
        ) : (
          <div className={styles.user_ads_grid}>
            {favorites.map((ad,i) => (
              <div key={ad.id} className={styles.grid_item}>
                <Advert advert={ad} showFavorite={true} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3>Anuncios creados</h3>
        {userAds && (
          <div className={styles.user_ads_grid}>
            {userAds.map((ad) => (
              <div key={ad.id} className={styles.grid_item}>
                <Advert
                  advert={ad}
                  favorite={favoritesList.includes(ad.id)}
                  admin
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3>Anuncios Publicados</h3>
        {publishedAds.length === 0 ? (
          <p>No has publicado anuncios</p>
        ) : (
          <div className={styles.user_ads_grid}>
            {publishedAds.map((ad) => (
              <div key={ad.id} className={styles.grid_item}>
                <Advert
                  advert={ad}
                  favorite={favoritesList.includes(ad.id)}
                  admin
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
