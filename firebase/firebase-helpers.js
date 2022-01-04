import firebase from 'firebase'
import { doc } from 'prettier'
import { func } from 'prop-types'

export const formatResponse = (ok, type, res) => {
  return { type, ok, res }
}
export const normalizeDoc = (doc) => {
  if (!doc?.exists) return null // The document  not exist
  const data = doc.data()
  const id = doc.id

  const {
    updatedAt,
    registryDate,
    createdAt,
    date,
    birth,
    joinedAt,
    options
  } = data
  const dates = unfierebazeDates({
    updatedAt,
    registryDate,
    joinedAt,
    createdAt,
    birth,
    date
  })
  return {
    id,
    ...data,
    ...dates
  }
}

export const unfierebazeDate = (date) =>
  date ? date?.toMillis() : null
export const unfierebazeDates = (dates = {}) => {
  let aux = {}
  for (const date in dates) {
    if (dates[date]) {
      aux = {
        ...aux,
        [date]: dates[date]
          ? unfierebazeDate(dates[date])
          : null
      }
    }
  }
  return aux
}

export const normalizeDocs = (docs = []) =>
  docs?.map((doc) => normalizeDoc(doc))

export const datesToFirebaseFromat = ({
  document = {}
}) => {
  // TODO hace tiempo lei que la recursividad era mala idea, creo entender por que, pero me parece útil en algunos casos como este.

  // Esta funcion recibe un paramentro 'document' que puede o no tener las propiedades listadas en DATE_FIELDS.
  // Al mismo tiempo puede o no tener objetos que a su ves pueden o no contener mas campos de tipo DATE_FIELDS.
  // La tarea de esta funcion es transformar estos campos en formato date de firebase sin importartar lo andiados que estén
  // una funcion recursiva parece ser una buena opcion.
  // los campos pueden estar dentro de un objeto. Pero el objeto puede estar dentro de un array
  const AUX_DOCUMENT = {}
  const DATE_FIELDS = [
    'birth',
    'date',
    'createAt',
    'updatedAt',
    'finishAt',
    'startAt',
    'registryDate'
  ]
  // verifica si es un objeto
  if (typeof document !== 'object') {
    return 'is not an object'
  }
  // iterar objeto
  Object.keys(document).forEach((key) => {
    AUX_DOCUMENT[key] = document[key]

    if (typeof document[key] === 'object') {
      // si un key es un objeto, iterar objeto
      // si tiene keys date parsear a firebaseDate
      // crea objeto completo mas las keys parseadas y retornalo

      // O HAZLO RECURSIVO
      AUX_DOCUMENT[key] = datesToFirebaseFromat({
        document: document[key]
      })
    }

    if (DATE_FIELDS.includes(key)) {
      // si key es date parsear a firebaseDate y sobreescribir key
      const aux = dateToFirebaseFormat(document[key])
      AUX_DOCUMENT[key] = aux
    }
  })
  // reenviar el objeto compelto
  return AUX_DOCUMENT
}

export const dateToFirebaseFormat = (date) =>
  firebase.firestore.Timestamp.fromDate(new Date(date)) ||
  null

export const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user
  return {
    joinedAt: dateToFirebaseFormat(new Date()),
    email,
    name: displayName,
    image: photoURL,
    id: user.uid
  }
}
