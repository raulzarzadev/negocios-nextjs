/* eslint-disable camelcase */
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/app'
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG
)

const formatResponse = (
  code,
  ok,
  type,
  data = null,
  error = null
) => {
  return { code, ok, type, data, error }
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***--------- NORMALIZA FIREBASE DOCS ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

const getFirebaseDocsWithId = ({ docs }) =>
  docs.map((doc) => {
    return { id: doc.id, ...doc.data() }
  })

const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user
  return {
    email,
    name: displayName,
    image: photoURL,
    id: user.uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getUser(user?.uid).then(onChange)
    } else {
      onChange(null)
    }
  })
}

const formatRespose = (
  ok,
  type,
  data = null,
  error = null
) => {
  return { ok, type, data, error }
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(async ({ user }) => {
      const userAlreadyExist = await getUser(user?.uid)
      if (userAlreadyExist) return userAlreadyExist
      return await createNewUser(mapUserFromFirebase(user))
    })
}

export const firebaseLogout = () => {
  firebase.auth().signOut()
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------FIREBASE DATA BASE ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

export const db = firebase.firestore()

/* -------------------- */
/* ---------USERS------ */
/* -------------------- */

const getUser = async (userId) => {
  return db
    .collection('users')
    .doc(userId)
    .get()
    .then((res) => res.data())
}

const createNewUser = (user) => {
  return db
    .collection('users')
    .doc(user.id)
    .set({ ...user })
    .then((res) => {
      console.log('USER_CREATED', res)
      return user
    })
}

/* -------------------- */
/* -------BARRIOS------ */
/* -------------------- */

export const addBarrio = ({ name, state, shortName }) => {
  return db
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

export const fb_getBarrio = (barrio) => {
  return db
    .collection('barrios')
    .doc(barrio)
    .get()
    .then((snapShot) => {
      return { id: snapShot.id, ...snapShot.data() }
    })
}

export const fb_addAdvert = (advert) => {
  return db
    .collection('adverts')
    .add({
      ...advert,
      createdAt: firebase.firestore.Timestamp.fromDate(
        new Date()
      )
    })
    .then((docRef) => {
      return {
        ok: true,
        type: 'AD_CREATED',
        ref: docRef.id
      }
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
      return error
    })
}

export const fb_getBarrios = () => {
  return db
    .collection('barrios')
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
    .catch((err) => console.log(err))
}

export const fb_getAds = () => {
  return db
    .collection('adverts')
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
    .catch((err) => console.log(err))
}

export const fb_getUserAds = (userId) => {
  return db
    .collection('adverts')
    .where('userId', '==', userId)
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
    .catch((err) => console.log(err))
}

export const fb_getAdvertById = (advertId) => {
  return db
    .collection('adverts')
    .doc(advertId)
    .get()
    .then((doc) => {
      if (doc.exists) return { id: doc.id, ...doc.data() }
    })
    .catch((err) => console.log(err))
}

export const fb_editAdvert = (id, advert) => {
  const ad = db.collection('adverts').doc(id)
  return ad
    .update(advert)
    .then((res) => console.log('res', res))
    .catch((err) => console.log('wrr', err))
}

export const fb_deleteAdvert = (id) => {
  return db
    .collection('adverts')
    .doc(id)
    .delete()
    .then((res) => res)
    .catch((err) => console.log(err))
}

export const fb_publishAdvert = (publication) => {
  return db
    .collection('publications')
    .add(publication)
    .then((docRef) => {
      return {
        ok: true,
        type: 'PUBLICATION_CREATED',
        ref: docRef.id
      }
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

export const fb_getBarrioActivePublications = async (
  barrio
) => {
  return db
    .collection('publications')
    .where('barrioId', '==', barrio)
    .where('active', '==', true)
    .get()
    .then(({ docs }) =>
      docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
}

export const fb_unpublishAdvert = (id) => {
  console.log('id', id)

  return db
    .collection('publications')
    .doc(id)
    .update({ active: false })
    .then((res) => formatResponse(200, true, 'UNPUBLISHED'))
    .catch((err) =>
      formatResponse(
        400,
        false,
        'UNPUBLISH_ERROR',
        null,
        err
      )
    )
}

export const fb_reactivePublishAdvert = (id) => {
  return db
    .collection('publications')
    .doc(id)
    .update({ active: true })
    .then((res) => formatResponse(200, true, 'REPUBLISHED'))
    .catch((err) =>
      formatResponse(
        400,
        false,
        'REPUBLISH_ERROR',
        null,
        err
      )
    )
}

export const fb_getUserActivePublications = (userId) => {
  return db
    .collection('publications')
    .where('userId', '==', userId)
    .where('active', '==', true)
    .get()
    .then(({ docs }) =>
      docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------    FAVORITES    ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

export const fb_addFavorite = async (userId, advertId) => {
  // check if favorite user list exist
  const favoritesList = await db
    .collection('favorites')
    .doc(userId)
    .get()

  if (favoritesList.exists) {
    // if exist UPDATE favorite array
    return await db
      .collection('favorites')
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(
          advertId
        )
      })
      .then(() => formatRespose(true, 'FAVORITE_ADDED'))
  } else {
    // if not exist CREATE a favorite list
    return await db
      .collection('favorites')
      .doc(userId)
      .set({ favorites: [advertId] })
      .then(() => {
        return {
          ok: true,
          type: 'FAVORITE_LIST_CREATED'
        }
      })
  }
}

export const fb_removeFavorite = async (
  userId,
  advertId
) => {
  return await db
    .collection('favorites')
    .doc(userId)
    .update({
      favorites: firebase.firestore.FieldValue.arrayRemove(
        advertId
      )
    })
    .then(() => formatRespose(true, 'FAVORITE_REMOVED'))
}

export const fb_listenUserFavorites = (
  userId,
  callback
) => {
  return db
    .collection('favorites')
    .doc(userId)
    .onSnapshot((snapshot) => {
      const emtyArrayIfFavoritesListNotExist = []
      if (!snapshot.exists) {
        return callback(emtyArrayIfFavoritesListNotExist)
      }
      const { favorites } = snapshot.data()
      callback(favorites)
    })
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------    PUBLICATIONS    ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

export const fb_getAllPublications = () => {
  return db
    .collection('publications')
    .get()
    .then(getFirebaseDocsWithId)
}

export const fb_getActivePublications = () => {
  return db
    .collection('publications')
    .where('active', '==', true)
    .get()
    .then(getFirebaseDocsWithId)
}

export const fb_listenPublications = async (cb) => {
  return db
    .collection('publications')
    .onSnapshot((snapshot) => {
      const publications = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      cb(publications)
    })
}
export const fb_getAdvertPublications = async (
  advertId
) => {
  const result = await db
    .collection('publications')
    .where('advertId', '==', advertId)
    .get()
  return getFirebaseDocsWithId(result)
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------    IMAGES MANAGE    ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

export const fb_uploadImage = (file, metadata = {}) => {
  const imageUniqueId = uuidv4()
  const ref = firebase
    .storage()
    .ref(`images/${imageUniqueId}`)
  const task = ref.put(file, metadata)
  return task
}

export const fb_deleteImage = (ref) => {
  console.log(ref)
  const imageRef = firebase.storage().refFromURL(ref)
  return imageRef
    .delete()
    .then((res) => {
      return { ok: true, type: 'IMAGE_DELETED' }
    })
    .catch((err) => console.log(err))
}
