import { db } from './client'
import {
  formatResponse,
  normalizeDoc,
  normalizeSnapshot
} from './firebase-helpers'

export async function fbGetPublication ({ id }) {
  return await db
    .collection('publications')
    .doc(id)
    .get()
    .then((res) => normalizeDoc(res))
    .catch((err) =>
      formatResponse(false, 'GET_PUBLICATION_ERROR', err)
    )
}

export function fbListenAdvertPublications (
  { advertId },
  callback
) {
  return db
    .collection('publications')
    .where('advertId', '==', advertId)
    .onSnapshot((snapshot) => {
      callback(normalizeSnapshot(snapshot))
    })
}
