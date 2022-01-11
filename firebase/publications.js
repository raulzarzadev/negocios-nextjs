import { db } from './client'
import {
  formatResponse,
  normalizeDocs
} from './firebase-helpers'

export async function fbGetPublication ({ id }) {
  console.log(id)
  try {
    const { docs } = await db
      .collection('publications')
      .doc(id)
      .get()
    return normalizeDocs(docs)
  } catch (err) {
    return formatResponse(false, 'GET_PUBLICATION_ERROR', err)
  }
}
