import { Chip } from '@material-ui/core'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function SelectLabels ({ labels = [], setLabels = {} }) {
  const LIMIT_LABLES_SELECTED = 5
  const [labelsSelected, setLabelsSelected] = useState(labels || [])
  const handleRemoveChip = (chipKey) => () => {
    const filteredLabels = labels?.filter((label) => label !== chipKey)
    setLabels(filteredLabels)
  }

  const hanldeAddChip = (chipKey) => {
    setLabels([...labels, chipKey])
  }

  useEffect(() => {
    setLabelsSelected(
      labels?.map((label) => CHIP_LABELS.find((chip) => chip?.key === label))
    )
  }, [labels.length])

  const [chipsDisplay, setChipDisplay] = useState([])
  useEffect(() => {
    const chipsFiltered = CHIP_LABELS.filter(
      (chip) => !labels.includes(chip.key)
    )
    setChipDisplay(chipsFiltered)
  }, [labels.length])

  return (
    <div className={styles.select_labels}>
      <div>
        {labelsSelected?.map((chip, i) => (
          <Chip
            key={chip?.key}
            style={{ margin: '4px' }}
            icon={chip?.icon}
            color={chip?.color || 'primary'}
            label={chip?.label}
            size="small"
            onDelete={handleRemoveChip(chip?.key)}
          />
        ))}
      </div>
      <em>Max {LIMIT_LABLES_SELECTED} etiquetas</em>
      <div className={styles.labels_availables}>
        {chipsDisplay.map((chip) => {
          return (
            <Chip
              key={chip?.key}
              disabled={labelsSelected?.length >= LIMIT_LABLES_SELECTED}
              style={{ margin: '4px' }}
              icon={chip?.icon}
              color={chip?.color || 'primary'}
              label={chip?.label}
              size="small"
              onClick={() => hanldeAddChip(chip?.key)}
            />
          )
        })}
      </div>
    </div>
  )
}
