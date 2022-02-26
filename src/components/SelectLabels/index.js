import FilterChip from '@comps/Filter/FilterChip'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import { useEffect, useState } from 'react'

// TODO change chips labels to a database

export default function SelectLabels ({
  labels = [],
  setLabels = {},
  selectableLabelsLimit = 5
}) {
  const [_labelsSelected, _setLabelsSelected] = useState([])
  const [_labelsAvailable, _setLabelsAvailable] = useState(
    []
  )

  const hanldeAddChip = (chipKey) => {
    _setLabelsSelected([..._labelsSelected, chipKey])
  }

  const handleRemoveChip = (chipKey) => () => {
    const filteredLabels = _labelsSelected?.filter(
      (label) => label !== chipKey
    )
    _setLabelsSelected(filteredLabels)
  }

  useEffect(() => {
    const chipsFiltered = CHIP_LABELS.filter(
      (chip) =>
        !_labelsSelected.includes(chip.key) && chip.key
    )

    _setLabelsAvailable(chipsFiltered.map(({ key }) => key))
  }, [_labelsSelected])

  useEffect(() => {
    setLabels(_labelsSelected)
  }, [_labelsSelected])

  useEffect(() => {
    if (labels) {
      _setLabelsSelected(labels)
    }
  }, [])

  return (
    <div className="text-center">
      <em>Max {selectableLabelsLimit} etiquetas</em>
      <div className="flex flex-wrap ">
        {_labelsSelected?.map((chip, i) => (
          <LabelChip
            chip={chip}
            key={chip}
            onDelete={handleRemoveChip(chip)}
          />
        ))}
      </div>
      <div className='my-2'>
        <em>Max {selectableLabelsLimit} etiquetas</em>
      </div>

      <div className=" flex flex-wrap  ">
        {_labelsAvailable.map((chip) => {
          return (
            <LabelChip
              key={chip}
              chip={chip}
              disabled={
                _labelsSelected?.length >=
                selectableLabelsLimit
              }
              onClick={() => hanldeAddChip(chip)}
            />
          )
        })}
      </div>
    </div>
  )
}

const LabelChip = ({ chip, handleDelete, ...rest }) => {
  const formatChip = (chip) => {
    return CHIP_LABELS.find(({ key }) => key === chip)
  }
  const formatedChip = formatChip(chip)
  return (
    <FilterChip
      style={{ margin: '0.1rem' }}
      label={{
        label: formatedChip.label,
        icon: formatedChip.icon
      }}
      {...rest}
      /*  style={{ margin: '4px' }}
      icon={formatedChip?.icon}
      color={formatedChip?.color || 'primary'}
      label={formatedChip?.label}
      size="small"
      {...rest} */
    />
  )
}
