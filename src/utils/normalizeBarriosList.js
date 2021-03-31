import { ESTADOS_LABEL_MX } from 'CONST/ESTADOS_MX'

export default function normalizeBarriosList(barrios) {
  const auxArr = []
  const STATES = ESTADOS_LABEL_MX
  return barrios?.reduce((acc, curr) => {
    if (auxArr.includes(curr.state)) return acc
    auxArr.push(curr.state)
    const barriosState = barrios.filter((barrio) => barrio.state === curr.state)
    const state = STATES.find((state) => state.tag === curr.state)
    state.name = state.label
    const formatBarrio = { ...state, barrios: barriosState }
    return [...acc, formatBarrio]
  }, [])
}
