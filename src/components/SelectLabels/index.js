import { Chip } from '@material-ui/core'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import { useEffect, useState } from 'react'

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
    <div className={'styles.select_labels'}>
      <div>
        {_labelsSelected?.map((chip, i) => (
          <LabelChip
            chip={chip}
            key={chip}
            handleDelete={handleRemoveChip(chip)}
          />
        ))}
      </div>
      <em>Max {selectableLabelsLimit} etiquetas</em>
      <div className={'styles.labels_availables'}>
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
    <Chip
      style={{ margin: '4px' }}
      icon={formatedChip?.icon}
      color={formatedChip?.color || 'primary'}
      label={formatedChip?.label}
      size="small"
      onDelete={handleDelete}
      {...rest}
    />
  )
}
