import AdminDashboard from '@comps/AdminDashboard'
import Advert from '@comps/Advert.v3'
import { useEffect, useState } from 'react'
import useUser from 'src/context/UserContext'
import { useAds } from 'src/hooks/useAds'

import styles from './styles.module.css'

export default function ViewProfile () {
  const { getAdvert } = useAds()
  const { favoritesList } = useUser()

  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    Promise.all(
      favoritesList.map((fav) => getAdvert(fav))
    ).then((res) => setFavorites(res))
  }, [favoritesList.length])

  return (
    <div className={styles.view_profile}>
      <div className={styles.favs}>
        <h3 className="font-bold text-xl">Favoritos</h3>
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
                <Advert advert={ad} showFavorite={true} />
              </div>
            ))}
          </div>
            )}
      </div>
      <AdminDashboard />
    </div>
  )
}
