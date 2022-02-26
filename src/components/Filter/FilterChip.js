import ICONS from 'src/utils/ICONS'

const FilterChip = ({
  label,
  selected,
  onClick,
  justIcon,
  disabled,
  style,
  onDelete
}) => {
  return (
    <button
      disabled={disabled}
      style={style}
      className={` ${
        selected && ' border-slate-700  shadow-none '
      } cursor-pointer disabled:cursor-auto disabled:opacity-40 border-opacity-100 w-min border-2 shadow-md snap-start   rounded-full whitespace-nowrap flex justify-center items-center px-2 capitalize`}
      onClick={onClick}
    >
      {justIcon ? label?.icon : label?.label}
      {onDelete && (
        <span
          className="rounded-full h-5 w-5 flex justify-center ml-1 hover:bg-slate-300"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
        >
          <ICONS.Close />
        </span>
      )}
    </button>
  )
}

export default FilterChip
