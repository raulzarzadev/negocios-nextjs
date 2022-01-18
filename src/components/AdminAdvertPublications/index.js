import ModalPubish from '@comps/Modals/ModalPublish'
import {
  fbListenAdvertPublications,
  fbUpdatePublicationStatus
} from 'firebase/publications'
import { useContext, useEffect, useState } from 'react'
import AdvertContext from 'src/context/AdvertContext'
import CopyableToClipboard from 'src/HOC/CopyableToClipboard'
import { fromNow } from 'src/utils/dates'

export default function AdminAdvertPublications () {
  const advert = useContext(AdvertContext)
  const [publications, setPublications] = useState()

  useEffect(() => {
    fbListenAdvertPublications(
      { advertId: advert.id },
      setPublications
    )
  }, [])

  const activesPublications = publications?.filter(
    ({ status }) => {
      return status === 'ACTIVE'
    }
  )
  const finishedPublications = publications?.filter(
    ({ status }) => {
      return status === 'FINISHED'
    }
  )
  const pausedPublications = publications?.filter(
    ({ status }) => status === 'PAUSED'
  )

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
            publications={activesPublications}
          />
          <PublicationType
            title="Pausadas"
            publications={pausedPublications}
          />
          <PublicationType
            title="Terminadas"
            publications={finishedPublications}
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

const PublicationType = ({ publications = [], title }) => {
  const PUBLICATION_TYPE = {
    ACTIVE: {
      label: 'Pausar',
      style: 'bg-success',
      onClick: (id) =>
        fbUpdatePublicationStatus({
          publicationId: id,
          newStatus: 'PAUSED'
        })
    },
    PAUSED: {
      label: 'Activar',
      style: 'bg-info',
      onClick: (id) =>
        fbUpdatePublicationStatus({
          publicationId: id,
          newStatus: 'ACTIVE'
        })
    },
    FINISHED: {
      label: 'Activar',
      style: 'bg-error',
      onClick: (id) => {
        fbUpdatePublicationStatus({
          publicationId: id,
          newStatus: 'ACTIVE'
        })
      }
    }
  }
  const isPublishedTimeEnds = (publishEnds) => {
    const finshOn = new Date(publishEnds).getTime()
    const todayIs = new Date().getTime()
    return finshOn < todayIs
  }

  return (
    <div className="text-center">
      <span className="text-sm">{`${title} (${publications.length})`}</span>
      <div className={'grid gap-2 '}>
        {publications?.map(
          ({ id, barrioId, publishEnds, status }) => (
            <div
              className={`${PUBLICATION_TYPE[status]?.style} `}
              key={id}
            >
              <CopyableToClipboard value={id}>
                <span>Id</span>
              </CopyableToClipboard>
              <div>{barrioId}</div>
              <div>
                <div>Termina: </div>
                {isPublishedTimeEnds(publishEnds) && (
                  <div>{}</div>
                )}
                {fromNow(publishEnds)}
              </div>
              {PUBLICATION_TYPE[status]?.label && (
                <button
                  className="btn rounded-full btn-secondary btn-xs"
                  onClick={() =>
                    PUBLICATION_TYPE[status]?.onClick(id)
                  }
                >
                  {PUBLICATION_TYPE[status]?.label}
                </button>
              )}
              <button
                onClick={() =>
                  fbUpdatePublicationStatus({
                    publicationId: id,
                    newStatus: 'FINISHED'
                  })
                }
                className="btn rounded-full btn-error btn-xs"
              >
                Terminar
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
