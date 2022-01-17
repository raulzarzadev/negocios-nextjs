import ModalPubish from '@comps/Modals/ModalPublish'
import { fbListenAdvertPublications } from 'firebase/publications'
import { useContext, useEffect, useState } from 'react'
import AdvertContext from 'src/context/AdvertContext'
import { useAds } from 'src/hooks/useAds'
import isGoodTime from 'src/utils/isGoodTime'

export default function AdminAdvertPublications () {
  const advert = useContext(AdvertContext)
  const [publications, setPublications] = useState()

  useEffect(() => {
    fbListenAdvertPublications(
      { advertId: advert.id },
      setPublications
    )
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
  const pausedPublications = publications?.filter(
    ({ active }) => !active
  )

  const handleRepublish = () => {
    console.log('TODO republish?')
  }

  const [modalPublish, setModalPublish] = useState()

  const handleOpenPublish = () => {
    setModalPublish(!modalPublish)
  }

  return (
    <div className=" w-full">
      <div className="">
        <h4 className="text-lg font-bold my-1 text-center">
          Publicaciones
        </h4>
        <div className="flex w-full justify-center">
          <button
            className="btn btn-primary  btn-sm "
            onClick={handleOpenPublish}
          >
            Publicar
          </button>
        </div>
        <div className="grid grid-flow-col place-content-center grid-cols-3 px-2 gap-2 max-w-md mx-auto">
          <PublicationType
            title="Activas"
            publications={activesPublications?.map(
              (pub) => {
                return { ...pub, status: 'ACTIVE' }
              }
            )}
            changePublicationStatus={handleUnpublish}
          />
          <PublicationType
            title="Pausadas"
            publications={pausedPublications?.map((pub) => {
              return { ...pub, status: 'PAUSED' }
            })}
            changePublicationStatus={handleReactivePublish}
          />
          <PublicationType
            title="Terminadas"
            publications={finishedPublications?.map(
              (pub) => {
                return { ...pub, status: 'FINISHED' }
              }
            )}
            color="black"
            changePublicationStatus={handleRepublish}
          />
        </div>
      </div>
      <ModalPubish
        open={modalPublish}
        handleOpen={handleOpenPublish}
        advertId={advert.id}
      />
    </div>
  )
}

const PublicationType = ({
  publications = [],
  changePublicationStatus,
  title
}) => {
  const styling = {
    ACTIVE: ' bg-success',
    PAUSED: 'bg-info',
    FINISHED: 'bg-error'
  }
  const buttonLabel = {
    ACTIVE: 'pausar',
    PAUSED: 'activar',
    FINISHED: 'publicar'
  }
  return (
    <div className="text-center">
      <span className="text-sm">{`${title} (${publications.length})`}</span>
      <div className={'grid gap-2 '}>
        {publications?.map(
          ({ id, barrioId, publishEnds, status }) => (
            <div
              className={`${styling[status]} `}
              onClick={() => changePublicationStatus(id)}
              key={id}
            >
              <div>{barrioId}</div>
              <div>{isGoodTime(publishEnds).fromNow}</div>
              <button className='btn rounded-full btn-primary'>{buttonLabel[status]}</button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
