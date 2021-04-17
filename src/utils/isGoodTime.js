export default (time) => {
  const limit = new Date(time).getTime()
  const now = new Date().getTime()
  const limitIn = limit - now
  const fromNow = limitIn / 60000 / 60 / 24 // segundos minutos horas
  return { onTime: limit > now, limitIn, fromNow: `${fromNow.toFixed()} días` }
}
