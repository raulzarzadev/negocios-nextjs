const FilterChip = ({
  label,
  selected,
  onClick,
  justIcon
}) => {
  return (
    <div
      className={` ${
        selected && ' border-gray- border-4  '
      } w-min border snap-start border-slate-600 rounded-full whitespace-nowrap flex justify-center items-center px-2`}
      onClick={onClick}
    >
      {justIcon ? label?.icon : label?.label}
    </div>
  )
}

export default FilterChip
