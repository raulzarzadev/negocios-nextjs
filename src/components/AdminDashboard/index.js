import styles from './styles.module.css'
import EditIcon from '@material-ui/icons/Edit'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import Modal from '@comps/Modal'
import IconBtn from '@comps/IconBtn'
import { P } from '@comps/P'
import { usePublications } from 'src/hooks/usePublications'
import { useRouter } from 'next/router'
import Link from '@comps/Link'
import Advert2 from '@comps/Advert2'
import PrimBtn from '@comps/PrimBtn'

export default function AdminDashboard() {
  const [adverts, setAdverts] = useState([])
  const [publications, setPublications] = useState([])
  const { getAds, unpublishAdvert, reactivePublish } = useAds()
  const { getAllPublications } = usePublications()
  useEffect(() => {
    getAds().then(setAdverts)
    getAllPublications().then(setPublications)
  }, [])

  const normalizeAds = adverts.map((ad) => {
    const adPublications = publications.filter((pub) => pub.advertId === ad.id)
    return { ...ad, publications: adPublications }
  })

  return (
    <div className={styles.dashboard}>
      <div>
        <h3 className={styles.page_title}>{`Todos los anuncios`}</h3>
          <div className={styles.action}>
            <Link href='/adverts/new'>
              <PrimBtn color='secondary'>
                {`Nuevo anuncio`}
              </PrimBtn>
            </Link>
          </div>
          <div className={styles.action}>
            <Link href="/barrios/new">
              <PrimBtn color='primary'>
                {'Nuevo Barrio'}            
              </PrimBtn>
            </Link>
        </div>
        <div>
        </div>
        <div className={styles.dash_table}>
          <div className={styles.table_title}>{`Titulo`}</div>
          <div className={styles.table_title}>{`¿Pub?`}</div>
          <div className={styles.table_title}>{`Acciones`}</div>
        </div>
        {normalizeAds?.map((ad) => (
          <AddRow
            key={ad.id}
            ad={ad}
            unpublishAdvert={unpublishAdvert}
            reactivePublish={reactivePublish}
          />
        ))}
      </div>
    </div>
  )
}

const normalizeDate = (date) => {
  const newDate = new Date(date)
  const month = newDate.getMonth()
  const year = newDate.getFullYear().toString().slice(2)
  return `${month}-${year}`
}
const AddRow = ({ ad, unpublishAdvert, reactivePublish }) => {
  const [openPublicationOptions, setOpenPublicationOptions] = useState(false)
  const router = useRouter()
  const handleOpenPublicationOptions = () => {
    setOpenPublicationOptions(!openPublicationOptions)
  }
  const [openDetails, setOpenDetails] = useState(false)
  const handleOpenDetailsModal = () => {
    setOpenDetails(!openDetails)
  }
  const handleUnpublish = (publicationId) => {
    unpublishAdvert(publicationId)
  }
  const handleReactivePublish = (publicationId) => {
    reactivePublish(publicationId)
  }
  const handleEditRedirect = (advertId) => {
    router.push(`/adverts/edit/${ad.id}`)
  }

  const { title, publications } = ad
  return (
    <>
      <div className={styles.dash_row} key={ad.id}>
        <div className={styles.table_cell}>
          <P size="small">{title}</P>
        </div>
        <div className={styles.table_cell}>
          <div className={styles.publications}>
            Publicaciones: <strong>{publications.length}</strong>
            {publications.map(({ barrioId }) => (
              <div key={barrioId} className={styles.publicaciones_barrio}>
                {barrioId}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.table_cell}>
          <div className="center">
            <IconBtn  onClick={handleEditRedirect}>
              <EditIcon fontSize="small" style={{color:'#fff'}}/>
            </IconBtn>
            <IconBtn onClick={handleOpenDetailsModal}>
              <SettingsApplicationsIcon fontSize="small"  style={{color:'#fff'}}/>
            </IconBtn>
          </div>
        </div>
        <Modal
          title="Configuraciones de anuncio"
          open={openDetails}
          handleOpen={handleOpenDetailsModal}
        >
          <div className={styles.modal_advert}>
            <div className={styles.modal_options}>
              Publicaciones: {publications?.length}
              <div className={styles.details}>
                {publications?.map(
                  ({ id, barrioId, active, publishEnds, publishStart }) => (
                    <div
                      key={id}
                      className={styles.public_details_cell}
                      style={{ background: active ? 'green' : 'red' }}
                      onClick={() => handleOpenPublicationOptions(id)}
                    >
                      <div>{barrioId}</div>
                      <div>de: {normalizeDate(publishStart)}</div>
                      <div>a: {normalizeDate(publishEnds)}</div>
                      <Modal
                        title="Activar / Desactivar Publicación"
                        open={openPublicationOptions}
                        handleOpen={handleOpenPublicationOptions}
                      >
                        {active ? (
                          <div>
                            Desactivar publicacion
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleUnpublish(id)
                              }}
                            >
                              descativar
                            </button>
                          </div>
                        ) : (
                          <div>
                            Reactivar publicacion
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleReactivePublish(id)
                              }}
                            >
                              Activar
                            </button>
                          </div>
                        )}
                      </Modal>
                    </div>
                  )
                )}
              </div>
            </div>
            <Advert2 advert={ad} admin />
          </div>
        </Modal>
      </div>
    </>
  )
}
