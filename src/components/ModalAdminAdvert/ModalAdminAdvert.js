
import Advert2 from '@comps/Advert2'
import Modal from '@comps/Modal'
import { useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import normalizeDate from 'src/utils/normalizeDate'
import s from './styles.module.css'
	
export default function ModalAdminAdvert ({open, handleOpen, advert}) {
  const {  unpublishAdvert, reactivePublish } = useAds()
  
  const [openPublicationOptions, setOpenPublicationOptions] = useState(false)
 
  const handleOpenPublicationOptions = () => {
    setOpenPublicationOptions(!openPublicationOptions)
  }
  const handleUnpublish = (publicationId) => {
    unpublishAdvert(publicationId)
  }
  const handleReactivePublish = (publicationId) => {
    reactivePublish(publicationId)
  }
  console.log('', advert);
  const {publications} = advert
  return (
  <Modal
          title="Configuraciones de anuncio"
          open={open}
          handleOpen={handleOpen}
        >
          <div className={s.modal_advert}>
            <div className={s.modal_options}>
              Publicaciones: {publications?.length}
              <div className={s.details}>
                {publications?.map(
                  ({ id, barrioId, active, publishEnds, publishStart }) => (
                    <div
                      key={id}
                      className={s.public_details_cell}
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
            <Advert2 advert={advert} admin />
          </div>
        </Modal>
      
  )
}
