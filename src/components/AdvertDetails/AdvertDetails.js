import AdminPublicationsAdvert from '@comps/AdminPublicationsAdvert'
import Advert from '@comps/Advert2'
import ModalPubish from '@comps/Modals/ModalPublish'
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

  const [modalPublish, setModalPublish] = useState()

  const handleOpenPublish = () => {
    setModalPublish(!modalPublish)
  }

  const { publications } = usePublications()
  const [
    advertPulications,
    setAdvertPublications
  ] = useState()
  useEffect(() => {
    setAdvertPublications(
      publications?.filter(
        ({ advertId }) => advertId === advert.id
      )
    )
  }, [publications])

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
          <AdminPublicationsAdvert
            publications={advertPulications}
          />
        </div>
      )}
      <div className={s.adverts}>
        <Advert edit advert={advert} />
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
