import Textarea from '@comps/Inputs/Textarea'
import BottomModal from '@comps/Modals/BottomModal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ICONS from 'src/utils/ICONS'
import addComment, {
  deleteComment,
  hiddeComent,
  unhiddenComent
} from 'firebase/coments'
import useComment from 'src/hooks/useComment'
import useUser from 'src/context/UserContext'
import LoginModal from '@comps/Modals/LoginModal'

const VisitsSecction = ({
  comments = [],
  advertId = ''
}) => {
  const [openComents, setOpenComents] = useState(false)
  const handleOpenComents = () => {
    setOpenComents(!openComents)
  }

  return (
    <div className="flex justify-between h-8">
      <div>
        <span className="flex text-sm">
          <ICONS.DoneArrow
            className="mx-1 filter "
            size={'1.2rem'}
          />
          Visitas 0
        </span>
        <CommentsModal
          open={openComents}
          handleOpen={handleOpenComents}
          advertId={advertId}
          comments={comments}
        />
      </div>
      <div>
        <button onClick={handleOpenComents}>
          <span className="flex text-sm">
            <ICONS.Coment
              className="mx-1"
              size={'1.2rem'}
            />
            Comentarios {comments?.length || '0'}
          </span>
        </button>
      </div>
    </div>
  )
}

const schema = yup
  .object({
    coment: yup.string().min(20)
  })
  .required()

const CommentsModal = ({
  handleOpen,
  open,
  advertId,
  comments = []
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const { user } = useUser()
  const onSubmit = (data) => {
    if (!user) return handleOpenLoginModal()
    addComment({
      advertId: advertId,
      comment: {
        ...data,
        author: { name: user?.name, id: user?.id }
      }
    })
  }

  const [openLoginModal, setOpenLoginModal] = useState()
  const handleOpenLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  return (
    <BottomModal
      handleOpen={handleOpen}
      open={open}
      title="Comentarios"
    >
      <div>
        {comments?.map((comment) => (
          <Comment key={comment} commentId={comment} />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label={'Mi opinion:'}
          error={errors?.comment?.message}
          {...register('comment')}
        ></Textarea>
        <div className="flex w-full justify-end mt-4">
          <button className="btn btn-primary btn-sm ">
            Comentar
          </button>
        </div>
      </form>
      <LoginModal
        open={openLoginModal}
        handleOpen={handleOpenLoginModal}
      />
    </BottomModal>
  )
}

const Comment = ({ commentId }) => {
  const { comment } = useComment({ commentId })
  const { user } = useUser()
  const handleHiddeComment = () => {
    hiddeComent({ commentId }).then((res) =>
      console.log('res', res)
    )
  }
  const handleDeleteComment = () => {
    deleteComment({ commentId }).then((res) =>
      console.log('res', res)
    )
  }
  const handleShowComment = () => {
    unhiddenComent({ commentId }).then((res) =>
      console.log('res', res)
    )
  }

  return (
    <div key={comment?.id} className="my-4">
      {user?.admin && (
        <AdminView
          comment={comment}
          handleDeleteComment={handleDeleteComment}
          handleShowComment={handleShowComment}
          handleHiddeComment={handleHiddeComment}
        />
      )}
      <div>
        {comment?.visible && (
          <div>
            <div className="flex justify-between">
              <h3 className="font-bold text-sm">
                {comment?.author?.name}
              </h3>
              <span className=" font-bold text-sm opacity-40">
                {comment?.createdAt?.toMillis()}
              </span>
            </div>
            <div className="text-sm">
              {comment?.comment}
            </div>
          </div>
        )}
        {!comment?.visible && (
          <div className="text-sm text-center ">
            Comentario oculto
          </div>
        )}
      </div>
    </div>
  )
}

const AdminView = ({
  comment,
  handleHiddeComment,
  handleShowComment,
  handleDeleteComment
}) => {
  return (
    <div
      className={` ${!comment?.visible && 'opacity-50'}`}
    >
      <div>
        {comment?.visible
          ? (
          <button onClick={handleHiddeComment}>
            <ICONS.CloseEye />
          </button>
            )
          : (
          <button onClick={handleShowComment}>
            <ICONS.OpenEye />
          </button>
            )}
        <button onClick={handleDeleteComment}>
          <ICONS.Delete />
        </button>
      </div>
      <div className="flex justify-between">
        <h3 className="font-bold text-sm">
          {comment?.author?.name}
        </h3>
        <span className=" font-bold text-sm opacity-40">
          {comment?.createdAt?.toMillis()}
        </span>
      </div>
      <div className="text-sm">{comment?.comment}</div>
    </div>
  )
}
export default VisitsSecction
