import ICONS from 'src/utils/ICONS'

export default function ButtonGoogle ({
  onClick,
  disabled
}) {
  return (
    <button
      className="btn btn-info  "
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex ">
        <div className="p-1 pr-4 ">
          <ICONS.Google />
        </div>
        Registrate con google
      </div>
    </button>
  )
}
