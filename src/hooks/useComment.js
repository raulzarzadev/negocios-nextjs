import { getComment } from 'firebase/coments'
import { useEffect, useState } from 'react'

export default function useComment ({ commentId }) {
  const [comment, setComment] = useState(undefined)
  useEffect(() => {
    getComment({ commentId }, (res) => setComment(res))
  }, [commentId])
  return { comment }
}
