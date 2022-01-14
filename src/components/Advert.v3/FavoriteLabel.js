import LoginModal from '@comps/Modals/LoginModal'
import Modal from '@comps/Modals/Modal'
import Tooltip from '@comps/Tooltip'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ICONS from 'src/utils/ICONS'

const FavoriteLabel = ({ isFavorite, advertId }) => {
  const router = useRouter()
  const { addFavorite, removeFavorite } = useAds()

  const handleAddFavorite = () => {
    addFavorite(advertId).then((res) => {
      console.log('type', res)
      res?.type === 'NOT_USER' && handleOpenNotUser()
    })
  }

  const handleRemoveFavorite = () => {
    removeFavorite(advertId).then((res) => console.log(res))
  }

  const [openNotUser, setOpenNotUser] = useState()
  const handleOpenNotUser = () => {
    setOpenNotUser(!openNotUser)
  }
  return (
    <div>
      <div>
        {isFavorite
          ? (
          <Tooltip
            text="Eliminar de favoritos"
            position="right"
          >
            <div onClick={handleRemoveFavorite}>
              <ICONS.FillBook />
            </div>
          </Tooltip>
            )
          : (
          <Tooltip
            text="Agregar a favoritos"
            position="right"
          >
            <div onClick={handleAddFavorite}>
              <ICONS.EmptyBook />
            </div>
          </Tooltip>
            )}
      </div>
      <LoginModal
        open={openNotUser}
        handleOpen={handleOpenNotUser}
      />
    </div>
  )
}
export default FavoriteLabel
