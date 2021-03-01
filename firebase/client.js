import firebase from "firebase";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

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
    const normalizeUser = mapUserFromFirebase(user);
    onChange(normalizeUser);
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
