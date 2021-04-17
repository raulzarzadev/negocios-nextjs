
import IconBtn from '@comps/IconBtn'
import { P } from '@comps/P'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './styles.module.css'

import EditIcon from '@material-ui/icons/Edit'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import ModalAdminAdvert from '@comps/ModalAdminAdvert'

export default function AdvertRow ({ ad }) {
  const router = useRouter()
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpenDetailsModal = () => {
    setOpenDetails(!openDetails)
  }
  const handleEditRedirect = () => {
    router.push(`/adverts/edit/${ad.id}`)
  }

  const { title, publications } = ad
  return (
    <>
      <div className={s.dash_row} key={ad.id}>
        <div className={s.table_cell}>
          <P size="small">{title}</P>
        </div>
        <div className={s.table_cell}>
          <div className={s.publications}>
            Publicaciones: <strong>{publications.length}</strong>
            {publications.map(({ barrioId }) => (
              <div key={barrioId} className={s.publicaciones_barrio}>
                {barrioId}
              </div>
            ))}
          </div>
        </div>

        <div className={s.table_cell}>
          <div className="center">
            <IconBtn onClick={handleEditRedirect}>
              <EditIcon fontSize="small" style={{ color: '#fff' }}/>
            </IconBtn>
            <IconBtn onClick={handleOpenDetailsModal}>
              <SettingsApplicationsIcon fontSize="small" style={{ color: '#fff' }}/>
            </IconBtn>
          </div>
        </div>
        <ModalAdminAdvert open={openDetails} handleOpen={handleOpenDetailsModal} advert={ad}/>
        </div>
    </>
  )
}
