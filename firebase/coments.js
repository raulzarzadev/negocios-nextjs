import { db } from './client'
import firebase from 'firebase'
import 'firebase/firestore'
import { formatResponse } from './firebase-helpers'

export default async function addComment ({
  advertId,
  comment
}) {
  const DEFAULT_OPTIONS = {
    createdAt: new Date(),
    visible: true
  }
  const newCommentRef = db.collection('comments').doc()
  try {
    await createComment({ comment, advertId })
      .then((res) =>
        formatResponse(true, 'CREATE_COMMENT', res)
      )
      .catch((err) =>
        formatResponse(false, 'CREATE_COMMENT_ERROR', err)
      )
    await addCommentToAdvert({
      advertId,
      commentId: newCommentRef.id
    })
      .then((res) =>
        formatResponse(true, 'UPDATE_ADVERT', res)
      )
      .catch((err) =>
        formatResponse(false, 'UPDATE_ADVERT_ERROR', err)
      )
    return formatResponse(
      true,
      'COMENT_ADDED_SUCCESSFULY',
      {}
    )
  } catch (error) {
    console.log('error', error)
  }
  function createComment ({ comment, advertId }) {
    return db
      .collection('comments')
      .doc(newCommentRef.id)
      .set({
        advertId,
        ...comment,
        ...DEFAULT_OPTIONS
      })
  }
  function addCommentToAdvert ({ advertId, commentId }) {
    return db
      .collection('adverts')
      .doc(advertId)
      .update({
        comments:
          firebase.firestore.FieldValue.arrayUnion(
            commentId
          )
      })
  }
}

export async function getComment ({ commentId }, callback) {
  return await db
    .collection('comments')
    .doc(commentId)
    .onSnapshot((res) => {
      callback(res.data())
    })

  /* .then((res) => formatResponse(true, 'GET_COMMENT', res))
    .catch((err) =>
      formatResponse(false, 'GET_COMMENT_ERROR', err)
    ) */
}

export async function hiddeComent ({ commentId }) {
  return await db
    .collection('comments')
    .doc(commentId)
    .update({ visible: false })
    .then((res) =>
      formatResponse(true, 'HIDDE_COMMENT', res)
    )
    .catch((err) =>
      formatResponse(false, 'HIDDE_COMMENT_ERROR', err)
    )
}
export async function unhiddenComent ({ commentId }) {
  return await db
    .collection('comments')
    .doc(commentId)
    .update({ visible: true })
    .then((res) =>
      formatResponse(true, 'UNHIDDE_COMMENT', res)
    )
    .catch((err) =>
      formatResponse(false, 'UNHIDDE_COMMENT_ERROR', err)
    )
}
export async function deleteComment ({ commentId }) {
  const commentData = await db
    .collection('comments')
    .doc(commentId)
    .get()
  const { advertId } = commentData?.data()
  try {
    await deleteComment({ commentId })
      .then((res) =>
        formatResponse(true, 'COMMENT_DELETE', res)
      )
      .catch((err) =>
        formatResponse(false, 'COMMENT_DELETE_ERROR', err)
      )
    await removeCommentToAdvert({ commentId, advertId })
      .then((res) =>
        formatResponse(true, 'ADVERT_COMMENT_DELETE', res)
      )
      .catch((err) =>
        formatResponse(
          false,
          'ADVERT_COMMENT_DELETE_ERROR',
          err
        )
      )
  } catch (error) {
    console.log('error', error)
  }

  function deleteComment ({ commentId }) {
    return db.collection('comments').doc(commentId).delete()
  }
  function removeCommentToAdvert ({ advertId, commentId }) {
    return db
      .collection('adverts')
      .doc(advertId)
      .update({
        comments:
          firebase.firestore.FieldValue.arrayRemove(
            commentId
          )
      })
  }
}
