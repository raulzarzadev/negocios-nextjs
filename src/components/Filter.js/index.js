import React, { useState } from 'react'
import styles from './styles.module.css'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'

export default function Filter ({ handleSetFilter, labels = [] }) {
  const formatedLabels = labels.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )

  const [filtro, setFiltro] = useState('Todos')
  const handleChangeFilter = (filter) => {
    handleSetFilter(filter)
  }

  return (
    <div className={styles.filter_bar}>
      <div className={styles.filter_labels}>
        <div
          className={styles.filter_label}
          style={{
            boxShadow: filtro === 'Todos' && '1px 1px 1px #000'
          }}
          onClick={() => {
            handleChangeFilter('Todos')
            setFiltro('Todos')
          }}
        >
          <ViewModuleIcon />
        </div>

        {formatedLabels?.map((label, i) => (
          <div
            key={i}
            style={{
              boxShadow: filtro === label?.label && '1px 1px 1px 1px #fff'
            }}
            className={styles.filter_label}
            onClick={() => {
              handleChangeFilter(label?.key)
              setFiltro(label?.label)
            }}
          >
            {label?.icon}
          </div>
        ))}
      </div>
      <p className={styles.filter_display}>{filtro}</p>
    </div>
  )
}
