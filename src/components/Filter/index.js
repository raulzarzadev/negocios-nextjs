import React, { useState } from 'react'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import FilterChip from './FilterChip'

export default function Filter ({
  handleSetFilter,
  labels = []
}) {
  const formatedLabels = labels.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )

  const [filter, setFilter] = useState('all')
  const handleChangeFilter = (filter) => {
    handleSetFilter(filter)
    setFilter(filter)
  }

  return (
    <div
      className={
        'border-2   grid grid-flow-col overflow-x-auto gap-2 p-2 snap-x'
      }
    >
      <FilterChip
        label={{
          label: 'Todos',
          key: 'all'
        }}
        selected={filter === 'all'}
        onClick={() => {
          handleChangeFilter('all')
        }}
      />

      {formatedLabels?.map((label, i) => (
        <FilterChip
          key={i}
          label={label}
          selected={filter === label.key}
          onClick={() => {
            handleChangeFilter(label?.key)
          }}
        />
      ))}
    </div>
  )
}
