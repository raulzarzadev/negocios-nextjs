import Tooltip from '@comps/Tooltip'
import ICONS from 'src/utils/ICONS'

export default function PublicationStatus ({ publication }) {
  const STATUSES = {
    ACTIVE: { label: 'Activo', style: 'text-success' },
    FINISED: { label: 'Terminado', style: 'text-error' },
    OUT_OF_TIME: {
      label: 'Fuera de tiempo',
      style: 'text-error'
    },
    NEAR_TO_FINISH: {
      label: 'Cerca de terminar',
      style: 'text-warning'
    }
  }
  const defineStatus = (publication) => {
    const finishAt = new Date(
      publication?.publishEnds
    ).getTime()
    const startAt = new Date(
      publication?.publishStart
    ).getTime()
    const DAYS = 15
    const timeNearToFinish = 60_000 * 60 * 24 * DAYS
    if (finishAt < new Date().getTime()) {
      return 'OUT_OF_TIME'
    }
    if (finishAt > new Date().getTime()) return 'ACTIVE'
    if (
      finishAt - new Date().getTime() <
      timeNearToFinish
    ) {
      return 'NEWR_TO_FIISH'
    }
  }

  return (
    <div className="">
      <div
        className={`${
          STATUSES[defineStatus(publication)].style
        }`}
      >
        <Tooltip
          text={`${
            STATUSES[defineStatus(publication)].label
          }`}
        >
          <ICONS.Clock />
        </Tooltip>
      </div>
    </div>
  )
}
