/* eslint-disable camelcase */
import Select from '@comps/Inputs/Select'
import Text from '@comps/Inputs/Text'
import Textarea from '@comps/Inputs/Textarea'
import TextIcon from '@comps/Inputs/TextIcon'
import Modal from '@comps/Modals/Modal'
import SelectLabels from '@comps/SelectLabels'
import { addDays } from 'date-fns'
import { fb_getBarrios } from 'firebase/client'
import { useEffect, useRef, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ICONS from 'src/utils/ICONS'
import normalizeBarriosList from 'src/utils/normalizeBarriosList'
import router from 'next/router'
import Image from 'next/image'
import {
  fbDeleteImage,
  fbUploadImage
} from 'firebase/images'
import {
  fbAdvertAddImage,
  fbAdvertRemoveImage
} from 'firebase/adverts'
import formatContacts from 'src/utils/formatContacts'
import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'
import Loading from '@comps/Loading'

export default function AdvertForm ({
  advert = null,
  loading = false
}) {
  if (loading) return <Loading size="lg" />

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({})
  const { addAdvert, editAdvert } = useAds()
  useEffect(() => {
    if (advert) {
      setForm(advert)
    }
  }, [advert])
  const STEPS = [
    { title: 'Informacion' },
    { title: 'Clasificación' },
    { title: 'Contactos' }
    /* { title: 'Publicar' } */
  ]
  const addStep = () => {
    step < STEPS.length && setStep(step + 1)
  }
  const subStep = () => {
    step > 0 && setStep(step - 1)
  }
  const handleSubmit = () => {
    /* --------------Edit Advert-------------- */
    if (form?.id) {
      editAdvert(advert.id, form).then((res) => {
        console.log('res', res)
      })
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form).then(({ res }) => {
        // TODO add check ok box
        console.log('res', res)

        setTimeout(() => {
          router.push(`/adverts/edit/${res.id}`)
          // router.back()
          // router.push('/profile')
        }, 1000)
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex-col sm:grid sm:grid-cols-3  w-full  justify-between max-w-md m-auto  ">
        <div className="steps sm:steps-vertical  w-full sm:w-max  mt-4   sm:h-screen sticky top-0">
          {STEPS.map(({ title }, i) => {
            return (
              <li
                key={i}
                onClick={() => setStep(i)}
                className={`step  ${
                  i <= step && 'step-info'
                } `}
              >
                <span className="hidden sm:block">
                  {title}
                </span>
              </li>
            )
          })}
        </div>

        <div className=" sm:col-span-2 grid w-full p-2 gap-2 ">
          <div className="flex justify-center">
            <button
              disabled={step === 0}
              className={
                'font-bold  disabled:opacity-25 p-1 rounded-full  shadow-lg flex justify-center items-center'
              }
              onClick={subStep}
            >
              <ICONS.ArrowLeft />
            </button>
            <div className="w-40 text-center">
              <h3 className="text-center text-lg font-bold">
                {STEPS[step]?.title}
              </h3>
            </div>
            <button
              disabled={step === STEPS.length - 1}
              className={
                'font-bold disabled:opacity-25 p-1 rounded-full  shadow-lg flex justify-center items-center'
              }
              onClick={addStep}
            >
              <ICONS.ArrowRight />
            </button>
          </div>
          {step === 0 && (
            <Step1 form={form} setForm={setForm} />
          )}
          {step === 1 && (
            <Step2 form={form} setForm={setForm} />
          )}
          {step === 2 && (
            <Step3 form={form} setForm={setForm} />
          )}
          {step === 3 && (
            <Step4 form={form} setForm={setForm} />
          )}
          <div className="text-center">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const Step1 = ({ form = {}, setForm = () => {} }) => {
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
  const [alreadySaved, setAlreadySaved] = useState(false)
  console.log('alreadySaved', alreadySaved)
  useEffect(() => {
    if (advertId) setAlreadySaved(true)
  }, [advertId])
  /*
  const handleDeleteImage = async (url) => {
    await fbDeleteImage(url).then((res) =>
      console.log('res', res)
    )
    await fbAdvertRemoveImage(advertId, url, {
      mainImage: true
    }).then((res) => console.log('res', res))

    const imageIndex = _image.indexOf(url)
    _image.splice(imageIndex, 1)
    _setImage([..._image])
    setImage([..._image])
  } */

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
        <div className="">
          <label
            style={{
              backgroundImage: `url(${
                _image[_image?.length - 1]
              })`
            }}
            className="bg-cover border-dashed border-2 cursor-pointer border-gray-600 rounded-lg place-content-center grid h-32 w-32 shadow-lg shadow-slate-400 hover:shadow-md "
          >
            Imagen <ICONS.Plus size="3rem" />
            <input
              accept="image/png, image/jpeg"
              ref={fileRef}
              onChange={handleChange}
              className="hidden file:border-dashed file:border-2 file:cursor-pointer file:border-gray-600 file:rounded-lg file:place-content-center file:grid file:h-16 file:w-16 file:shadow-lg file:shadow-slate-400 file:hover:shadow-md"
              type={'file'}
            />
          </label>
        </div>
        {/* {_images.map((url, i) => (
            <ImageContainer
              key={i}
              url={url}
              handleDeleteImage={handleDeleteImage}
              // handleDeletePreview={handleDeletePreview}
            />
          ))} */}
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

const Step2 = ({ form = {}, setForm = () => {} }) => {
  return (
    <div>
      <SelectLabels
        labels={form.labels}
        setLabels={(labels) => {
          setForm({ ...form, labels })
        }}
      />
    </div>
  )
}

const Step3 = ({ form = {}, setForm = () => {} }) => {
  const handleChange = ({ target }) => {
    setForm({
      ...form,
      contacts: {
        ...form.contacts,
        [target.name]: target.value
      }
    })
  }
  const contacts = form.contacts
  const formatedContacts = formatContacts(contacts)
  const contactsDisplay = CONTACT_TYPES
  return (
    <div>
      <div className="grid gap-2 ">
        {contactsDisplay.map((contact) => (
          <TextIcon
            key={contact.id}
            placeholder={contact.label}
            className={''}
            icon={contact.icon}
            onChange={handleChange}
            name={contact.id}
            value={
              formatedContacts.find(
                ({ id }) => id === contact.id
              )?.value || ''
            }
          />
        ))}
        {/*  <TextIcon
          placeholder="Whatsapp"
          className={'input-sm'}
          icon={<ICONS.Whatsapp />}
          onChange={handleChange}
          name={'whatsapp'}
          value={contacts?.whatsapp}
        />
        <TextIcon
          placeholder={'Instagram'}
          className={'input-sm'}
          icon={<ICONS.Instagram />}
          onChange={handleChange}
          name={'instagram'}
          value={contacts?.instagram}
        />
        <TextIcon
          placeholder={'Facebook'}
          className={'input-sm'}
          icon={<ICONS.Facebook />}
          onChange={handleChange}
          name={'facebook'}
          value={contacts?.facebook}
        /> */}
      </div>
    </div>
  )
}

const Step4 = ({ form = {}, setForm = () => {} }) => {
  const [_form, _setForm] = useState({})
  const [barrios, setBarrios] = useState()
  const DAYS_MONTH = 30
  const TIMES = [
    { value: DAYS_MONTH * 1, label: '1 mes' },
    { value: DAYS_MONTH * 3, label: '3 meses' },
    { value: DAYS_MONTH * 6, label: '6 meses' },
    { value: DAYS_MONTH * 12, label: '1 año' }
  ]
  useEffect(() => {
    fb_getBarrios().then((res) =>
      setBarrios(normalizeBarriosList(res))
    )
  }, [])
  const handleChange = ({ target }) => {
    _setForm({ ..._form, [target.name]: target.value })
  }

  const handleSubmit = (form) => {
    console.log(' form.period', form.period)
    const startAt = new Date()
    const finishAt = addDays(startAt, form?.period)

    const period = {
      days: form.period,
      startAt: startAt,
      finishAt: finishAt
    }
    /* const dates = datesToFirebaseFromat({
      document: { ...form, period }
    })

    const publication = {
      // advertId,
      // barrioId: form?.barrio,
      // publishEnds,
      // publishStart,
      // active: true
    } */
    console.log('publication', period)
    /*
    publishAdvert(publication).then((res) => {
      console.log('res', res)
    }) */
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(_form)
        }}
      >
        <div className="grid gap-2 ">
          <Select
            label={'Barrio'}
            placeholder={'Barrios'}
            options={barrios}
            onChange={handleChange}
            name="barrio"
          />
          <Select
            options={TIMES}
            label={'Tiempo '}
            placeholder={'Tiempo'}
            onChange={handleChange}
            name="period"
          />
          <button className="btn btn-primary mx-auto my-2">
            Guardar y publicar
          </button>
        </div>
      </form>
    </div>
  )
}
