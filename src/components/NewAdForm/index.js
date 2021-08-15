import Advert2 from '@comps/Advert2'
import PrimBtn from '@comps/PrimBtn'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ImageTools from 'src/utils/ImageTools'
import styles from './styles.module.css'

// TODO use hook to move this varables
import {
  // eslint-disable-next-line camelcase
  // fb_deleteImage,
  // eslint-disable-next-line camelcase
  fb_uploadImage
} from 'firebase/client'
import ICONS from 'src/utils/ICONS'
import ModalColorPicker from '@comps/Modals/ModalColorPicker'
import ModalContacts from '@comps/Modals/ModalContacts'
import ModalSelectLocation from '@comps/Modals/ModalSelectLocation'
import ModalSelectLabels from '@comps/Modals/ModalSelectLabels'

export default function NewAdForm ({ advert = undefined }) {
  const router = useRouter()
  const [form, setForm] = useState({
    content: '',
    title: '',
    backgroundColor: '',
    contacts: [],
    image: '',
    labels: []
  })
  const { addAdvert, editAdvert } = useAds()
  useEffect(() => {
    if (advert) {
      setForm(advert)
    }
  }, [advert])

  /* --------------MANAGE IMAGE----------------- */
  const [imgURL, setImageURL] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageToUpload, setImageToUpload] = useState(null)

  useEffect(() => {
    if (imageToUpload) {
      const onProgress = (e) => {
        const progress =
          (e.bytesTransferred / e.totalBytes).toFixed(1) *
          100
        setUploadProgress(progress)
        console.log('progess', progress + '%')
      }
      const onError = (e) => console.log('error', e)
      const onComplete = (e) => {
        imageToUpload.snapshot.ref
          .getDownloadURL()
          .then(setImageURL)
        console.log('complete', e)
      }
      imageToUpload.on(
        'state_change',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [imageToUpload])

  useEffect(() => {
    if (imgURL) {
      setForm({ ...form, image: imgURL })
    }
  }, [imgURL])

  /* const handleDeleteImage = (ImageRef) => {
    return fb_deleteImage(ImageRef)
  } */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [
    selectLabelsModal,
    setSelectLabelsModal
  ] = useState(false)
  const [selectColorModal, setSelectColorModal] = useState(
    false
  )
  const handleOpenSelectColor = () => {
    setSelectColorModal(!selectColorModal)
  }
  const handleOpenSelectLabels = () => {
    setSelectLabelsModal(!selectLabelsModal)
  }
  const [contactsModal, setContactsModal] = useState(false)
  const handleAddContact = () => {
    setContactsModal(!contactsModal)
  }

  const handleSubmit = (form) => {
    /* --------------Edit Advert-------------- */
    if (advert?.id) {
      editAdvert(advert.id, form).then((res) => {
        console.log('res', res)
        setTimeout(() => {
          router.back()
        }, 400)
      })
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form).then((res) => {
        // TODO add check ok box
        console.log('res', res)

        setTimeout(() => {
          router.back()
          // router.push('/profile')
        }, 1000)
      })
    }
  }
  const handleChangeColor = (e) => {
    setForm({ ...form, backgroundColor: e })
  }

  const handleSelectImage = (e) => {
    e.preventDefault()
    setUploadProgress(1)
    const image = e.target.files[0]
    ImageTools.resize(
      image,
      {
        width: 640, // maximum width
        height: 880 // maximum height
      },
      function (blob, didItResize) {
        // console.log(didItResize)
        // didItResize will be true if it managed to resize it, otherwise false (and will return the original file as 'blob')
        // console.log(blob)
        const metadata = {
          user: 'userId ',
          createdAt: new Date()
        }
        const task = fb_uploadImage(blob, metadata)
        setImageToUpload(task)
        // document.getElementById('preview').src = window.URL.createObjectURL(blob);
        // you can also now upload this blob using an XHR.
      }
    )
  }
  const handleSetContacts = (e) => {
    setForm({ ...form, contacts: e })
  }
  const handleSetLabels = (e) => {
    setForm({ ...form, labels: e })
  }

  const [locationModal, setLocationModal] = useState(false)

  const handleOpenLocation = () => {
    setLocationModal(!locationModal)
  }

  const disableButton = !form?.title
  return (
    <div>
      {/* NEW ADVERT */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
        className={styles.form_container}
      >
        <h3>Nuevo Anuncio</h3>
        <section className={styles.section_form}>
          {/* IMAGE */}

          {/* TITLE AND CONTENT */}
          <p>Titulo:</p>
          <input
            className={styles.input_title}
            type="text"
            name="title"
            onChange={handleChange}
            value={form?.title || ''}
          />

          <p>Contenido:</p>
          <textarea
            className={styles.input_content}
            type="text"
            name="content"
            onChange={handleChange}
            value={form?.content || ''}
            rows={5}
          />
        </section>
        {/* CLASIFICATION */}
        <section className={styles.section_form}>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleOpenSelectLabels()
            }}
          >
            {'Clasificacón'}
            <ICONS.ClassBy />
          </PrimBtn>
        </section>
        {/* UBICACIÓN */}
        <section className={styles.section_form}>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleOpenLocation()
            }}
          >
            {'Ubicación'}
            <ICONS.Location />
          </PrimBtn>
        </section>
        {/* CONTACTS */}
        <section className={styles.section_form}>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleAddContact()
            }}
          >
            {'Contactos '} <ICONS.Contacs />
          </PrimBtn>
        </section>
        {/* COLOR */}
        <section className={styles.section_form}>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleOpenSelectColor()
            }}
          >
            {'Fondo '}
            <ICONS.Color />
          </PrimBtn>
        </section>
        {/* IMAGES */}
        <section className={styles.section_form}>
          <PrimBtn
            type="file"
            color="secondary"
            onChange={handleSelectImage}
          >
            {'Imagenes'}
            {uploadProgress === 100 || form.image
              ? (
              <ICONS.EditImage />
                )
              : (
              <ICONS.AddImage />
                )}
          </PrimBtn>
          {/*  {form.image && (
            <div className={styles.preview_conteier}>
              <div
                className={styles.previewImage}
                onClick={() =>
                  handleDeleteImage(form.image)
                }
              >
                <span>
                  <DeleteForeverOutlined fontSize="large" />
                </span>
                <img src={form.image} />
              </div>
            </div>
          )} */}
          {/* {!(
            uploadProgress === 100 || uploadProgress === 0
          ) && (
            <ProgressBar
              progressPorcent={uploadProgress}
              showPorcent
            />
          )} */}
          {/* PREVIEW ADVERT */}
          <section className={styles.preview_advert}>
            <Advert2 advert={form} form={true} />
          </section>
        </section>

        <div className={styles.button_save}>
          <PrimBtn
            color="primary"
            disabled={disableButton}
            type="submit"
            style={{ width: 250 }}
          >
            Guardar
            <ICONS.Save/>
          </PrimBtn>
        </div>
      </form>

      <ModalSelectLocation
        open={locationModal}
        handleOpen={handleOpenLocation}
        location={form?.location}
        setLocation={(location) =>
          setForm({ ...form, location })
        }
      />
      <ModalSelectLabels
        open={selectLabelsModal}
        handleOpen={handleOpenSelectLabels}
        labels={form?.labels}
        setLabels={handleSetLabels}
      />
      <ModalColorPicker
        open={selectColorModal}
        handleOpen={handleOpenSelectColor}
        color={form?.backgroundColor}
        setColor={handleChangeColor}
      />
      <ModalContacts
        title="Agregar Contacto"
        open={contactsModal}
        handleOpen={handleAddContact}
        contacts={form?.contacts}
        setContacts={handleSetContacts}
      />
    </div>
  )
}
