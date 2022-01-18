import { formatDistanceStrict } from 'date-fns'
import { es } from 'date-fns/locale'

export const fromNow = (
  to = new Date(),
  from = new Date()
) =>
  formatDistanceStrict(new Date(to), new Date(from), {
    locale: es,
    addSuffix: true
  })
