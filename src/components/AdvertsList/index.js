import Advert2 from '@comps/Advert2'
import { useUser } from 'src/context/UserContext'
import styles from './styles.module.css'

export default function AdvertsList ({ barrio = undefined, adverts }) {
  const { user } = useUser()
  console.log('user', user.admin)

  return (
    <div className={styles.barrio}>
      <h2 className={styles.title}>{barrio?.name}</h2>
      <span>
        <em>{`${barrio.shortName} - ${barrio.state} - ads (${barrio?.ads?.length})`}</em>
      </span>
      <div className={styles.grid}>
        {adverts?.map((ad, i) => (
          <div key={i} className={styles.item}>
            <Advert2 advert={ad} showFavorite admin={user?.admin}/>
          </div>
        ))}
      </div>
    </div>
  )
}
