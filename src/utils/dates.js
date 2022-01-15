import { formatDistanceStrict } from 'date-fns'
import { es } from 'date-fns/locale'

export const fromNow = (
  to = new Date(),
  from = new Date()
) => formatDistanceStrict(to, from, { locale: es, addSuffix: true })
