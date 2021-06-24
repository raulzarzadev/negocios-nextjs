import { useAds } from 'src/hooks/useAds'
import isGoodTime from 'src/utils/isGoodTime'
import s from './styles.module.css'

export default function AdminPublicationsAdvert ({ publications }) {
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

  const activesPublications = publications?.filter(
    ({ active, publishEnds }) => {
      const { onTime } = isGoodTime(publishEnds)
      return active && onTime
    }
  )
  const finishedPublications = publications?.filter(
    ({ publishEnds }) => {
      const finshOn = new Date(publishEnds).getTime()
      const todayIs = new Date().getTime()
      return finshOn < todayIs
    }
  )

  const handleRepublish = () => {
    console.log('TODO republish?')
  }
  const pausedPublications = publications?.filter(
    ({ active }) => !active
  )

  return (
    <div className={s.modal_advert}>
      <div className={s.modal_options}>
        Publicaciones
        <div className={s.details}>
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
            changePublicationStatus={handleReactivePublish}
          />
          <PublicationType
            title="Terminadas"
            publications={finishedPublications}
            color="black"
            changePublicationStatus={handleRepublish}
          />
        </div>
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
