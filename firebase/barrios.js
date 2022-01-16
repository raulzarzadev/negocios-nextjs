import { db } from './client'
import { normalizeSnapshot } from './firebase-helpers'

export const addBarrio = async ({
  name,
  state,
  shortName
}) => {
  return await db
    .collection('barrios')
    .doc(shortName)
    .set({
      name,
      state,
      shortName
    })
    .then((docRef) => {
      return {
        ok: true,
        type: 'BARRIO_CREATED',
        ref: docRef.id
      }
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

export const listenBarrio = async (
  { barrioId },
  callback = () => {}
) => {
  return db
    .collection('barrios')
    .doc(barrioId)
    .onSnapshot((snapshot) => {
      callback(normalizeSnapshot(snapshot))
    })
}
export const deleteBarrio = async ({ barrioId }) => {
  return await db
    .collection('barrios')
    .doc(barrioId)
    .delete()
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err))
}
