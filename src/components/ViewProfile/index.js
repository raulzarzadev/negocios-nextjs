import Advert2 from '@comps/Advert2'
import { L } from '@comps/L'
import PrimBtn from '@comps/PrimBtn'
import { firebaseLogout } from 'firebase/client'
import { useEffect, useState } from 'react'
import useUser from 'src/context/UserContext'
import { useAds } from 'src/hooks/useAds'

import styles from './styles.module.css'

export default function ViewProfile () {
  const { getAdvert } = useAds()
  const { favoritesList, user } = useUser()

  const handleLogOut = () => {
    firebaseLogout()
  }
  /*
  const [userAds, setUserAds] = useState()

  useEffect(() => {
    getUserAds().then((res) => setUserAds(res))
  }, []) */

  /*  const [publishedAds, setPublishedAds] = useState([])
  useEffect(() => {
    getUserActiveAds().then(setPublishedAds)
  }, []) */

  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    Promise.all(
      favoritesList.map((fav) => getAdvert(fav))
    ).then((res) => setFavorites(res))
  }, [favoritesList.length])

  return (
    <div className={styles.view_profile}>
      <div className={styles.actions}>
        {user?.admin && (
          <div className={styles.action}>
            <L href="/dashboard">
              <PrimBtn color="secondary">Dashboard</PrimBtn>
            </L>
          </div>
        )}
        <div className={styles.action}>
          <PrimBtn color="danger" onClick={handleLogOut}>
            {'Salir'}
          </PrimBtn>
        </div>
      </div>

      <div className={styles.favs}>
        <h3>Favoritos Guardados</h3>
        {favorites.length === 0
          ? (
          <p>Aun no has guardado </p>
            )
          : (
          <div className={styles.user_ads_grid}>
            {favorites?.map((ad, i) => (
              <div
                key={ad?.id}
                className={styles.grid_item}
              >
                <Advert2 advert={ad} showFavorite={true} />
              </div>
            ))}
          </div>
            )}
      </div>
    </div>
  )
}
