const FilterChip = ({
  label,
  selected,
  onClick,
  justIcon
}) => {
  return (
    <button
      className={` ${
        selected && ' border-gray- border-4  '
      } cursor-pointer  hover:border-opacity-25 w-min border snap-start border-slate-600  rounded-full whitespace-nowrap flex justify-center items-center px-2`}
      onClick={onClick}
    >
      {justIcon ? label?.icon : label?.label}
    </button>
  )
}

export default FilterChip
