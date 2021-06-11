import Advert from '@comps/Advert2'
import ModalPubish from '@comps/ModalPublish'
import { useEffect, useState } from 'react'
import { useUser } from 'src/context/UserContext'
import { useAds } from 'src/hooks/useAds'
import { usePublications } from 'src/hooks/usePublications'
import isGoodTime from 'src/utils/isGoodTime'
import s from './styles.module.css'

export default function AdvertDetails ({ advert }) {
  if (!advert) return 'Cargando ...'

  const { user } = useUser()

  const admin = user?.admin
  console.log('admin', admin)

  const { getAdvertPublications } = usePublications()
  const [publications, setPublications] = useState([])

  useEffect(() => {
    getAdvertPublications(advert?.id).then(setPublications)
  }, [])

  const { unpublishAdvert, reactivePublish } = useAds()
  const handleUnpublish = (publicationId) => {
    unpublishAdvert(publicationId).then((res) =>
      console.log(res)
    )
  }
  const handleReactivePublish = (publicationId) => {
    reactivePublish(publicationId).then((res) =>
      console.log(res)
    )
  }
  const handleRepublish = () => {
    // TODO republish
    console.log('TODO republish?')
  }

  const activesPublications = publications.filter(
    ({ active, publishEnds }) => {
      const { onTime } = isGoodTime(publishEnds)
      return active && onTime
    }
  )
  const finishedPublications = publications.filter(
    ({ publishEnds }) => {
      const finshOn = new Date(publishEnds).getTime()
      const todayIs = new Date().getTime()
      return finshOn < todayIs
    }
  )
  const pausedPublications = publications.filter(
    ({ active }) => !active
  )

  const [modalPublish, setModalPublish] = useState()

  const handleOpenPublish = () => {
    setModalPublish(!modalPublish)
  }

  return (
    <div className={s.advert_details}>
      {admin && (
        <div className={s.publications}>
          <h3>Publicar</h3>
          <button onClick={handleOpenPublish}>
            Publicar
          </button>
          <ModalPubish
            open={modalPublish}
            handleOpen={handleOpenPublish}
            advertId={advert.id}
          />
          <h3>Publicaciones</h3>
          {publications?.map((publication) => (
            <div className={s.details} key={publication.id}>
              <PublicationType
                title="Activas"
                publications={activesPublications}
                color="green"
                changePublicationStatus={handleUnpublish}
              />
              <PublicationType
                title="Pausadas"
                publications={pausedPublications}
                color="red"
                changePublicationStatus={
                  handleReactivePublish
                }
              />
              <PublicationType
                title="Terminadas"
                publications={finishedPublications}
                color="black"
                changePublicationStatus={handleRepublish}
              />
            </div>
          ))}
        </div>
      )}
      <div>
        <Advert advert={advert} />
      </div>
    </div>
  )
}

const PublicationType = ({
  publications = [],
  color,
  changePublicationStatus,
  title
}) => (
  <div>
    {`${title} ${publications.length}`}
    <div style={{ display: 'flex' }}>
      {publications?.map(
        ({ id, barrioId, publishEnds }) => (
          <div
            onClick={() => changePublicationStatus(id)}
            key={id}
            style={{
              minWidth: 70,
              margin: '4px',
              minHeight: 20,
              border: '1px solid',
              backgroundColor: color,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div>{barrioId}</div>
            <div>{isGoodTime(publishEnds).fromNow}</div>
          </div>
        )
      )}
    </div>
  </div>
)
