import AdminPublicationsAdvert from '@comps/AdminPublicationsAdvert'
import Advert from '@comps/Advert.v3'
import ModalPubish from '@comps/Modals/ModalPublish'
import { useEffect, useState } from 'react'
import useUser from 'src/context/UserContext'
import { usePublications } from 'src/hooks/usePublications'
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
  const [advertPulications, setAdvertPublications] =
    useState()
  useEffect(() => {
    setAdvertPublications(
      publications?.filter(
        ({ advertId }) => advertId === advert.id
      )
    )
  }, [publications])

  return (
    <div className="">
      {admin && (
        <div className="">
          <h3 className="text-xl font-bold text-center">
            Publicar
          </h3>

          <AdminPublicationsAdvert
            publications={advertPulications}
          />
          <div className='py-2 flex w-full justify-center'>
            <button
              className="btn btn-primary  "
              onClick={handleOpenPublish}
            >
              Publicar
            </button>
          </div>
          <ModalPubish
            open={modalPublish}
            handleOpen={handleOpenPublish}
            advertId={advert.id}
          />
        </div>
      )}
      <div className="">
        <Advert edit advert={advert} />
      </div>
    </div>
  )
}
