/* eslint-disable node/no-callback-literal */
import { v4 as uuidv4 } from 'uuid'
import firebase from 'firebase'
import 'firebase/firestore'
import { formatResponse } from './firebase-helpers'
/* ------------------------------------------------------------------------------------------- */
/*  ---------------------***---------    IMAGES MANAGE    ----------***-------------------------- */
/* ------------------------------------------------------------------------------------------- */

export const fbUploadImage = (
  file,
  callback = ({ progress, status }) => {}
) => {
  const imageUniqueId = uuidv4()
  const ref = firebase
    .storage()
    .ref(`images/${imageUniqueId}`)
  const task = ref.put(file)

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        // console.log('snapshot', snapshot)
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred /
            (!!snapshot.totalBytes || 1)) *
          100
        let status = 'RUNNING'
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            // console.log('Upload is paused')
            status = 'PAUSED'
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log('Upload is running')
            status = 'RUNNING'
            break
        }
        callback({ progress, status })
      },
      (error) => {
        console.log('error', error)
        reject('error ')
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref
          .getDownloadURL()
          .then((_downloadURL) => {
            resolve({ downloadURL: _downloadURL })
          })
      }
    )
  })
}

export const fbDeleteImage = async (url) => {
  const imageRef = firebase.storage().refFromURL(url)
  return await imageRef
    .delete()
    .then((res) =>
      formatResponse(true, 'IMAGE_DELETED', res)
    )
    .catch((err) =>
      formatResponse(false, 'IMAGE_DELETED_ERROR', err)
    )
}
