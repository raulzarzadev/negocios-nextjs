import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCR4wS0ayiiLuYJdWg9kv6ZynsEvykvVL0",
  authDomain: "negocios-cc009.firebaseapp.com",
  projectId: "negocios-cc009",
  storageBucket: "negocios-cc009.appspot.com",
  messagingSenderId: "875306027522",
  appId: "1:875306027522:web:ee0c56738fcd950f1db51b",
  measurementId: "G-PMNC54B6TS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user;
  console.log(user);
  return { email, name: displayName, image: photoURL };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = mapUserFromFirebase(user)
    onChange(normalizeUser)
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

export const logout = () => {
  console.log("logauot");
};
