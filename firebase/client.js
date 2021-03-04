import firebase from "firebase";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user;
  return { email, name: displayName, image: photoURL, id: user.uid };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const normalizeUser = mapUserFromFirebase(user);
      onChange(normalizeUser);
    } else {
      onChange(null);
    }
  });
};

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(({ user }) => {
      return mapUserFromFirebase(user);
    });
};

export const firebaseLogout = () => {
  firebase.auth().signOut();
};

/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------FIREBASE DATA BASE ----------***--------------------------*/
/* ------------------------------------------------------------------------------------------- */

var db = firebase.firestore();

export const addBarrio = ({ name, state, shortName }) => {
  return db
    .collection("barrios")
    .add({
      name,
      state,
      shortName,
    })
    .then((docRef) => {
      return { ok: true, type: "BARRIO_CREATED", ref: docRef.id };
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const fb_addAdvert = (advert) => {
  return db
    .collection("adverts")
    .add(advert)
    .then((docRef) => {
      return { ok: true, type: "AD_CREATED", ref: docRef.id };
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const fb_getBarrios = () => {
  return db
    .collection("barrios")
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    )
    .catch((err) => console.log(err));
};

export const fb_getAds = () => {
  return db
    .collection("adverts")
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    )
    .catch((err) => console.log(err));
};

export const fb_getUserAds = (userId) => {
  return db
    .collection("adverts")
    .where("userId", "==", userId)
    .get()
    .then((snapShot) =>
      snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    )
    .catch((err) => console.log(err));
};

export const fb_getAdvertById = (advertId) => {
  return db
    .collection("adverts")
    .doc(advertId)
    .get()
    .then((snapShot) => {
      console.log(snapShot);
      return { id: snapShot.id, ...snapShot.data() };
    })
    .catch((err) => console.log(err));
};

export const fb_editAdvert = (id, advert) => {
  const ad = db.collection("adverts").doc(id);
  return ad
    .update(advert)
    .then((res) => res)
    .catch((err) => console.log(err));
};
