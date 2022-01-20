import { L } from '@comps/L'
import ICONS from 'src/utils/ICONS'
import FavoriteLabel from './FavoriteLabel'
import PublicationStatus from './PublicationStatus'

export default function AdevertRigthInfo ({
  advertId,
  isAdmin,
  isEditable,
  isFavorite,
  publication,
  showFavorite
}) {
  return (
    <div className={' flex items-center '}>
      {showFavorite && (
        <FavoriteLabel
          isFavorite={isFavorite}
          advertId={advertId}
        />
      )}
      {isEditable && (
        <L href={`/adverts/edit/${advertId}`}>
          <ICONS.Edit />
        </L>
      )}
      {isAdmin && (
        <>
          <L
            href={`/adverts/${advertId}?publication=${publication?.id}`}
          >
            <ICONS.Settings />
          </L>
          <L
            href={`/adverts/edit/${advertId}`}
          >
            <ICONS.Edit />
          </L>
          {publication && (
            <PublicationStatus publication={publication} />
          )}
        </>
      )}
    </div>
  )
}
