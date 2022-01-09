import { useAds } from 'src/hooks/useAds'
import isGoodTime from 'src/utils/isGoodTime'
import s from './styles.module.css'

export default function AdminPublicationsAdvert ({
  publications
}) {
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
    <div className='border border-black w-full'>
      <div className=''>
        <h4 className="text-lg font-bold my-1">
          Publicaciones
        </h4>
        <div className='grid grid-flow-col place-content-center grid-cols-3 px-2 gap-2'>
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
  <div className='text-center'>
    {`${title} ${publications.length}`}
    <div className='flex '>
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
