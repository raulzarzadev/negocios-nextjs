import firebase from 'firebase'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user
  return { email, name: displayName, image: photoURL, id: user.uid }
}
const getFirstConicidence = (snapshot) => {
  // format first coicidence or return []
  if (!snapshot || snapshot.empty) return { favorites: [] }
  const firstCoincidence = snapshot?.docs[0]
  return { ...firstCoincidence?.data(), id: firstCoincidence?.id }
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
/*  ---------------------***---------FIREBASE DATA BASE ----------***--------------------------*/
/* ------------------------------------------------------------------------------------------- */

var db = firebase.firestore()

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
      shortName,
    })
    .then((docRef) => {
      return { ok: true, type: 'BARRIO_CREATED', ref: docRef.id }
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
  console.log(advert)
  return db
    .collection('adverts')
    .add({
      ...advert,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then((docRef) => {
      return { ok: true, type: 'AD_CREATED', ref: docRef.id }
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
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
    .then((res) => res)
    .catch((err) => console.log(err))
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
      return { ok: true, type: 'PUBLICATION_CREATED', ref: docRef.id }
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

export const fb_getBarrioActivePublications = async (barrio) => {
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
  return db.collection('publications').doc(id).update({ active: false })
}

export const fb_reactivePublishAdvert = (id) => {
  return db.collection('publications').doc(id).update({ active: true })
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
/*  ---------------------***---------    FAVORITES    ----------***--------------------------*/
/* ------------------------------------------------------------------------------------------- */

export const fb_addFavorite = async (userId, advertId) => {
  const userFavsList = await db
    .collection('favorites')
    .where('userId', '==', userId)
    .get()
    // Just get the first one
    .then(getFirstConicidence)
  if (!userFavsList?.favorites?.length) {
    return await db
      .collection('favorites')
      .add({ userId, favorites: [advertId] })
      .then((docRef) => {
        return { ok: true, type: 'FAVORITE_ADDED', ref: docRef.id }
      })
  } else if (userFavsList?.favorites?.includes(advertId))
    return { ok: true, type: 'FAVORITE_ALREADY_EXIST' }
  else {
    const list = await db.collection('favorites').doc(userFavsList.id)

    return list
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(advertId),
      })
      .then((res) => {
        return { ok: true, type: 'FAVORITE_ADDED' }
      })
      .catch((err) => {
        return { ok: true, type: 'ERROR_FAVORITE_ADDED', error: err }
      })
  }
}

export const fb_removeFavorite = async (userId, advertId) => {
  const fav = await db
    .collection('favorites')
    .where('userId', '==', userId)
    .get()
    // Just get the first one
    .then(getFirstConicidence)

  const list = await db.collection('favorites').doc(fav.id)
  return list
    .update({
      favorites: firebase.firestore.FieldValue.arrayRemove(advertId),
    })
    .then((res) => {
      return { ok: true, type: 'FAVORITE_REMOVED' }
    })
    .catch((err) => console.log(err))
}

export const fb_getUserFavorites = (userId) => {
  return db
    .collection('favorites')
    .where('userId', '==', userId)
    .get()
    .then(({ docs }) =>
      docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
}

export const fb_listenUserFavorites = (userId, callback) => {
  return db
    .collection('favorites')
    .where('userId', '==', userId)
    .onSnapshot((snapshot) => {
      const favoriteList = getFirstConicidence(snapshot)
      callback(favoriteList.favorites)
    })
}

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------    PUBLICATIONS    ----------***--------------------------*/
/* ------------------------------------------------------------------------------------------- */

export const fb_getAllPublications = () => {
  return db
    .collection('publications')
    .get()
    .then(({ docs }) =>
      docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
