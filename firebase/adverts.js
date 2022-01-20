import { db } from './client'
import firebase from 'firebase'
import 'firebase/firestore'
import {
  datesToFirebaseFromat,
  formatResponse,
  normalizeDoc
} from './firebase-helpers'

export const fbGetAdvert = async ({ id = '' }) => {
  return await db
    .collection('adverts')
    .doc(id)
    .get()
    .then(normalizeDoc)
    .catch((err) =>
      formatResponse(false, 'GET_ADVERT_ERROR', err)
    )
}

export const fbAddAdvert = async ({ advert = {} }) => {
  console.log('advert', advert)
  const newAdvertRef = db.collection('adverts').doc()
  console.log('newAdvertRef', newAdvertRef.id)
  return await db
    .collection('adverts')
    .doc(newAdvertRef.id)
    .set({ ...datesToFirebaseFromat({ document: advert }) })
    .then((res) =>
      formatResponse(true, 'ADVERT_CREATED', {
        advert: { ...advert, id: newAdvertRef.id }
      })
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

export const fdDeleteAdvert = async ({ id }) => {
  return await db
    .collection('adverts')
    .doc(id)
    .delete()
    .then((res) =>
      formatResponse(true, 'DELETE_ADVERT', res)
    )
    .catch((err) =>
      formatResponse(false, 'DELETE_ADVERT_ERROR', err)
    )
}

export const fbAdvertAddImage = async (
  advertId,
  ImageUrl,
  options = {
    mainImage: false
  }
) => {
  return await db
    .collection('adverts')
    .doc(advertId)
    .update({
      [options?.mainImage ? 'image' : 'images']:
        firebase.firestore.FieldValue.arrayUnion(ImageUrl)
    })
    .then((res) => formatResponse(true, 'IMAGE_ADDED', res))
    .catch((err) =>
      formatResponse(false, 'IMAGE_ADDED_ERROR', err)
    )
}

export const fbAdvertRemoveImage = async (
  advertId,
  ImageUrl,
  options = {
    mainImage: false
  }
) => {
  return await db
    .collection('adverts')
    .doc(advertId)
    .update({
      [options?.mainImage ? 'image' : 'images']:
        firebase.firestore.FieldValue.arrayRemove(ImageUrl)
    })
    .then((res) =>
      formatResponse(true, 'IMAGE_REMOVED', res)
    )
    .catch((err) =>
      formatResponse(false, 'IMAGE_REMOVED_ERROR', err)
    )
}

export const listenAdvert = (
  { id },
  callback = () => {}
) => {
  return db
    .collection('adverts')
    .doc(id)
    .onSnapshot((snapshot) => {
      callback(snapshot.data())
    })
}
