const FilterChip = ({
  label,
  selected,
  onClick,
  justIcon,
  disabled
}) => {
  return (
    <button
      disabled={disabled}
      className={` ${
        selected && ' border-slate-700  shadow-none '
      } cursor-pointer disabled:cursor-auto border-opacity-100 w-min border-2 shadow-md snap-start   rounded-full whitespace-nowrap flex justify-center items-center px-2`}
      onClick={onClick}
    >
      {justIcon ? label?.icon : label?.label}
    </button>
  )
}

export default FilterChip
