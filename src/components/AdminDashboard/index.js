import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import { usePublications } from 'src/hooks/usePublications'
import Link from '@comps/Link'
import PrimBtn from '@comps/PrimBtn'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'
import { useBarrios } from 'src/hooks/useBarrios'
import AdminAdvertRow from '@comps/AdminAdvertRow'
import AdminBarrioRow from '@comps/AdminBarrioRow'

export default function AdminDashboard () {
  const [states, setStates] = useState()
  const [adverts, setAdverts] = useState([])
  const [publications, setPublications] = useState([])
  const { getAds, unpublishAdvert, reactivePublish } = useAds()
  const { getBarrios } = useBarrios()
  const { getAllPublications } = usePublications()
  useEffect(() => {
    getAds().then(setAdverts)
    getAllPublications().then(setPublications)
  }, [])

  useEffect(() => {
    getBarrios().then((res) => setStates(normalizeBarriosList(res)))
  }, [])

  const normalizeAds = adverts.map((ad) => {
    const adPublications = publications.filter((pub) => pub.advertId === ad.id)
    return { ...ad, publications: adPublications }
  })

  return (
    <div className={styles.dashboard}>
      <div>
        <div className={styles.action}>
          <Link href="/adverts/new">
            <PrimBtn color="secondary">{'Nuevo anuncio'}</PrimBtn>
          </Link>
        </div>
        <div className={styles.action}>
          <Link href="/barrios/new">
            <PrimBtn color="primary">{'Nuevo Barrio'}</PrimBtn>
          </Link>
        </div>
        <h3 className={styles.page_title}>{'Todos los anuncios'}</h3>
        <div className={styles.dash_table}>
          <div className={styles.table_title}>{'Titulo'}</div>
          <div className={styles.table_title}>{'¿Pub?'}</div>
          <div className={styles.table_title}>{'Acciones'}</div>
        </div>
        {normalizeAds?.map((ad) => (
          <AdminAdvertRow
            key={ad.id}
            ad={ad}
            unpublishAdvert={unpublishAdvert}
            reactivePublish={reactivePublish}
          />
        ))}
        <h3 className={styles.page_title}>{'Barrios'}</h3>
        {states?.map(({ name, tag, label, barrios }) => (
          <div key={tag}>
            <div>
              <h4>
                {`${label} - ${tag} `}
                <span className={styles.barrios_count}>
                  {`( ${barrios?.length} )`}
                </span>
              </h4>
            </div>
            {barrios.map((barrio) => (
              <AdminBarrioRow key={barrio.id} barrio={barrio} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
