import { Typography } from '@material-ui/core'
import React from 'react'
// import ColorLensIcon from "@material-ui/icons/ColorLens";
import { CirclePicker as Picker } from 'react-color'

export default function ColorPicker ({ color, setColor }) {
  const handleOnChageComplete = (e) => {
    setColor(e.hex)
  }
  const colorsAvailable = [
    ' rgba(0, 0, 0, .0)', // light blue
    '#000000',
    '#ffffff',
    '#2DABFA', // light blue
    '#1ECBE3', // light blue
    '#E38D0B', // light blue - green
    '#76B2FB',
    '#756BE3',
    '#CD81FA',
    '#E36BBB',
    '#FF8C80',
    '#FA9A75', // geen ling
    '#E3CD96', // geen ling
    '#E36E10', // geen ling
    '#FFA71A',
    '#E30B1E',
    '#FAA61A',
    '#E36E0B',
    '#E30B53'
  ]
  return (
    <>
      <Typography variant="h5">Color</Typography>
      <div>
        <em>Selecciona un color de fondo</em>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Picker
          id="raised-button-color"
          color={color}
          colors={colorsAvailable}
          name="backgroundColor"
          onChangeComplete={handleOnChageComplete}
        />
        <label htmlFor="raised-button-color">
          {/* <Button variant="raised" component="span">
          Selecciona Color <ColorLensIcon fontSize="small" style={{ color }} />
        </Button> */}
        </label>
      </div>
    </>
  )
}
