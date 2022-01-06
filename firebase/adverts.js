import { db } from './client'
import {
  datesToFirebaseFromat,
  formatResponse
} from './firebase-helpers'

export const fbAddAdvert = async ({ advert = {} }) => {
  return await db
    .collection('adverts')
    .add({ ...datesToFirebaseFromat({ document: advert }) })
    .then((res) =>
      formatResponse(true, 'ADVERT_CREATED', res)
    )
    .catch((err) =>
      formatResponse(false, 'ADVERT_CREATED_ERROR', err)
    )
}

export const fbEditAdvert = async (id, advert) => {
  return db
    .collection('adverts')
    .doc(id)
    .update(advert)
    .then((res) =>
      formatResponse(true, 'ADVERT_EDITED', res)
    )
    .catch((err) =>
      formatResponse(false, 'ADVERT_EDITED_ERROR', err)
    )
}
