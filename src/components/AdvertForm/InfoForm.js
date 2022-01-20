import Text from '@comps/Inputs/Text'
import Textarea from '@comps/Inputs/Textarea'
import Modal from '@comps/Modals/Modal'
import {
  fbAdvertAddImage,
  fbAdvertRemoveImage
} from 'firebase/adverts'
import {
  fbDeleteImage,
  fbUploadImage
} from 'firebase/images'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ICONS from 'src/utils/ICONS'

export default function InfoForm ({ form, setForm }) {
  const handleChange = ({ target }) => {
    setForm({ ...form, [target?.name]: target?.value })
  }
  return (
    <div>
      <Text
        label={'Titulo'}
        onChange={handleChange}
        value={form?.title ?? ''}
        name={'title'}
      />
      <Textarea
        onChange={handleChange}
        value={form?.resume ?? ''}
        label={'Resumen'}
        name={'resume'}
      />
      <Textarea
        rows={4}
        onChange={handleChange}
        label={'Contenido'}
        name={'content'}
        value={form?.content ?? ''}
      />
      <ImageModal
        image={form?.image}
        setImage={(image) => setForm({ ...form, image })}
        advertId={form.id}
      />
      <ImagesModal
        images={form?.images}
        setImages={(images) => setForm({ ...form, images })}
        advertId={form.id}
      />
    </div>
  )
}

const ImageModal = ({
  image = [],
  setImage = () => {},
  advertId = ''
}) => {
  useEffect(() => {
    const mainImage = Array.isArray(image)
      ? image[image?.length - 1]
      : image

    if (image.length) _setImage([mainImage])
  }, [image])

  const [_image, _setImage] = useState([])
  const [imageProgress, setImageProgress] = useState(false)
  const handleChange = async () => {
    setImageProgress(1)
    for (const file of fileRef.current.files) {
      const imageUpladed = await fbUploadImage(
        file,
        ({ progress }) => {
          console.log('progress', progress)
          setImageProgress(20)
        }
      ).then((res) => {
        setImageProgress(50)
        console.log('res', res)
        return res
      })
      await fbAdvertAddImage(
        advertId,
        imageUpladed.downloadURL,
        { mainImage: true }
      ).then((res) => {
        setImageProgress(75)
        console.log('res', res)
        return res
      })
      _setImage([..._image, imageUpladed.downloadURL])
      setImage([..._image, imageUpladed.downloadURL])
      setImageProgress(0)
    }
    setImageProgress(0)
  }
  const fileRef = useRef()
  /*   const [alreadySaved, setAlreadySaved] = useState(false)
  useEffect(() => {
    if (advertId) setAlreadySaved(true)
  }, [advertId]) */
  const disabled = !advertId
  return (
    <div className="flex w-full p-2 ">
      <div className=" ">
        <div className="col-span-full">
          {!!imageProgress && (
            <progress
              className="progress"
              value={imageProgress}
              max={100}
            ></progress>
          )}
        </div>
        {console.log('_image.length', _image.length)}
        <div className="">
          <div className="flex items-center space-x-6 flex-col">
            <div className="shrink-0 relative aspect-video h-32">
              {/*  <img
                className="h-16 w-16 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo"
              /> */}
              {_image.length >= 1 && (
                <Image
                  src={_image[_image?.length - 1]}
                  objectFit="contain"
                  layout="fill"
                />
              )}
            </div>
            <label className="">
              <span
                className={`${
                  disabled
                    ? 'text-gray-500'
                    : ' text-info hover:font-semibold'
                } w-full mr-4 py-2 px-4 rounded-full border-0 text-sm  `}
              >
                {disabled
                  ? 'Guarda para subir imagenes'
                  : 'Selecciona imagen principal'}
              </span>
              <input
                ref={fileRef}
                onChange={handleChange}
                disabled={disabled}
                type="file"
                className=" hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
const ImagesModal = ({
  images = [],
  setImages = () => {},
  advertId = ''
}) => {
  const [openImagesModal, setOpenImages] = useState()
  const handleOpenImages = () => {
    setOpenImages(!openImagesModal)
  }

  useEffect(() => {
    if (images?.length) _setImages(images)
  }, [images])

  const [_images, _setImages] = useState([])
  const [imageProgress, setImageProgress] = useState(false)
  const handleChange = async () => {
    setImageProgress(1)
    for (const file of fileRef.current.files) {
      const imageUpladed = await fbUploadImage(
        file,
        ({ progress }) => {
          console.log('progress', progress)
          setImageProgress(20)
        }
      ).then((res) => {
        setImageProgress(50)
        console.log('res', res)
        return res
      })
      await fbAdvertAddImage(
        advertId,
        imageUpladed.downloadURL
      ).then((res) => {
        setImageProgress(75)
        console.log('res', res)
        return res
      })
      _setImages([..._images, imageUpladed.downloadURL])
      setImages([..._images, imageUpladed.downloadURL])
      setImageProgress(0)
    }
    setImageProgress(0)
  }
  const fileRef = useRef()
  const [alreadySaved, setAlreadySaved] = useState(false)

  useEffect(() => {
    if (advertId) setAlreadySaved(true)
  }, [advertId])

  const handleDeleteImage = async (url) => {
    await fbDeleteImage(url).then((res) =>
      console.log('res', res)
    )
    await fbAdvertRemoveImage(advertId, url).then((res) =>
      console.log('res', res)
    )

    const imageIndex = _images.indexOf(url)
    _images.splice(imageIndex, 1)
    _setImages([..._images])
    setImages([..._images])
  }

  return (
    <div className="flex w-full p-2 ">
      <button
        disabled={!alreadySaved}
        className="btn btn-primary btn-sm"
        onClick={handleOpenImages}
      >
        {' '}
        Mas imagenes
      </button>
      <Modal
        open={openImagesModal}
        handleOpen={handleOpenImages}
        title="Imagenes"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
          <div className="col-span-full">
            {!!imageProgress && (
              <progress
                className="progress"
                value={imageProgress}
                max={100}
              ></progress>
            )}
          </div>
          <label className="border-dashed border-2 cursor-pointer border-gray-600 rounded-lg place-content-center grid h-32 w-32 shadow-lg shadow-slate-400 hover:shadow-md">
            <ICONS.Plus size="3rem" />
            <input
              accept="image/png, image/jpeg"
              ref={fileRef}
              onChange={handleChange}
              className="hidden file:border-dashed file:border-2 file:cursor-pointer file:border-gray-600 file:rounded-lg file:place-content-center file:grid file:h-16 file:w-16 file:shadow-lg file:shadow-slate-400 file:hover:shadow-md"
              type={'file'}
            />
          </label>
          {_images.map((url, i) => (
            <ImageContainer
              key={i}
              url={url}
              handleDeleteImage={handleDeleteImage}
              // handleDeletePreview={handleDeletePreview}
            />
          ))}
        </div>
      </Modal>
    </div>
  )
}

const ImageContainer = ({ url, handleDeleteImage }) => {
  return (
    <div key={url} className="relative  h-32 w-32 ">
      <Image
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8/5+hnoEIwDiqkL4KAcT9GO0U4BxoAAAAAElFTkSuQmCC"
        src={url}
        objectFit="cover"
        layout="fill"
      />
      <div className="absolute top-0 bottom-0 left-0 group hover:bg-gray-600 hover:bg-opacity-30 right-0 grid place-content-center  text-white">
        <button
          onClick={() => handleDeleteImage(url)}
          className="p-1 opacity-40 group-hover:opacity-100 active:text-secondary "
        >
          <ICONS.Delete />
        </button>
      </div>
    </div>
  )
}
