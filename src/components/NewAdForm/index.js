import Advert2 from '@comps/Advert2'
import ColorPicker from '@comps/ColorPicker'
import ContactInputs from '@comps/ContactInputs'
import Modal from '@comps/Modal'
import ModalSelectLabels from '@comps/ModalSelectLabels'
import PrimBtn from '@comps/PrimBtn'
import ProgressBar from '@comps/ProgressBar'
import { DeleteForeverOutlined } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAds } from 'src/hooks/useAds'
import ImageTools from 'src/utils/ImageTools'
import styles from './styles.module.css'
// TODO use hook to move this varables
// eslint-disable-next-line camelcase
import { fb_deleteImage, fb_uploadImage } from 'firebase/client'

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
  const [imageToUpload, setImageToUpload] = useState(null)
  const [imgURL, setImageURL] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (imageToUpload) {
      const onProgress = (e) => {
        const progress = (e.bytesTransferred / e.totalBytes).toFixed(1) * 100
        setUploadProgress(progress)
        console.log('progess', progress + '%')
      }
      const onError = (e) => console.log('error', e)
      const onComplete = (e) => {
        imageToUpload.snapshot.ref.getDownloadURL().then(setImageURL)
        console.log('complete', e)
      }
      imageToUpload.on('state_change', onProgress, onError, onComplete)
    }
  }, [imageToUpload])

  useEffect(() => {
    if (imgURL) {
      setForm({ ...form, image: imgURL })
    }
  }, [imgURL])

  const handleDeleteImage = (ImageRef) => {
    return fb_deleteImage(ImageRef)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [selectLabelsModal, setSelectLabelsModal] = useState(false)
  const [selectColorModal, setSelectColorModal] = useState(false)
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
        setTimeout(() => {
          router.push('/profile')
        }, 1000)
      })
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form)
        .then((res) => {
          setTimeout(() => {
            router.back()
            // router.push('/profile')
          }, 1000)
        })
        .catch((err) => console.log(err))
    }
  }
  const handleChangeColor = (e) => {
    setForm({ ...form, backgroundColor: e })
  }
  const handleSelectImage = (e) => {
    e.preventDefault()
    setUploadProgress(1)
    const image = e.target.files[0]
    console.log({ name: 'name', ...image })
    console.log(
      ImageTools.resize(
        image,
        {
          width: 320, // maximum width
          height: 240 // maximum height
        },
        function (blob, didItResize) {
          console.log(didItResize)
          // didItResize will be true if it managed to resize it, otherwise false (and will return the original file as 'blob')
          console.log(blob)
          const metadata = {
            user: 'userId ',
            createdAt: new Date()
          }
          const task = fb_uploadImage(blob, metadata)
          console.log(task)
          setImageToUpload(task)
          // document.getElementById('preview').src = window.URL.createObjectURL(blob);
          // you can also now upload this blob using an XHR.
        }
      )
    )
  }
  const handleSetContacts = (e) => {
    setForm({ ...form, contacts: e })
  }
  const handleSetLabels = (e) => {
    setForm({ ...form, labels: e })
  }

  const disableButton = !form?.title
  return (
    <div className={styles.form_container}>
      <h3>Nuevo Anuncio</h3>
      {/* NEW ADVERT */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
      >
        <section className={styles.section_form}>
          {/* IMAGE */}

          {/* TITLE AND CONTENT */}
          <span>
            <p>Titulo:</p>
            <input
            className={styles.input}
              type="text"
              name="title"
              onChange={handleChange}
              value={form?.title || ''}
            />
          </span>
          <span>
            <p>Contenido:</p>
            <textarea
            className={styles.input}
              type="text"
              name="content"
              onChange={handleChange}
              rows={3}
              value={form?.content || ''}
            />
          </span>
        </section>
        {/* CLASIFICATION */}
        <section className={styles.section_form}>
          <h4>Clasificación</h4>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleOpenSelectLabels()
            }}
          >
            {form?.labels?.length
              ? 'Editar clasificacón'
              : 'Clasifica tu anuncio'}
          </PrimBtn>
        </section>
        {/* CONTACTS */}
        <section className={styles.section_form}>
          <h4>Contactos</h4>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleAddContact()
            }}
          >
            {console.log(!!form.contacts.length)}
            {form?.contacts?.length
              ? 'Editar Contactos'
              : 'Agregar Contactos'}
          </PrimBtn>
        </section>
        {/* COLOR */}
        <section className={styles.section_form}>
          <h4>Color</h4>
          <PrimBtn
            color="secondary"
            onClick={(e) => {
              e.preventDefault()
              handleOpenSelectColor()
            }}
          >
            {form.backgroundColor ? 'Cambiar Color' : 'Selecciona un color'}
          </PrimBtn>
        </section>
        {/* IMAGES */}
        <section className={styles.section_form}>
          <h4>Imagenes</h4>
          <PrimBtn type="file" color="secondary" onChange={handleSelectImage}>
            {console.log(form.image)}
            {!form.image ? 'Sube una Foto' : 'Cambiar Foto'}
          </PrimBtn>
          {form.image && (
            <div className={styles.preview_conteier}>
              <div
                className={styles.previewImage}
                onClick={() => handleDeleteImage(form.image)}
              >
                <span>
                  <DeleteForeverOutlined fontSize="large" />
                </span>
                <img src={form.image} />
              </div>
            </div>
          )}
          {!(uploadProgress === 100 || uploadProgress === 0) && (
            <ProgressBar progressPorcent={uploadProgress} showPorcent />
          )}
        </section>
        {/* PREVIEW ADVERT */}
        <section className={styles.section_form}>
        <div className={styles.preview_advert}>
          <Advert2 advert={form} form={true} />
          <div className={styles.button_save}>
          <PrimBtn color="secondary" disabled={disableButton} type="submit">
            Guardar
          </PrimBtn>
          </div>
        </div>
        </section>
      </form>
     <ModalSelectLabels
        open={selectLabelsModal}
        handleOpen={handleOpenSelectLabels}
        labels={form?.labels}
        setLabels={handleSetLabels}
        />
    {/*  <Modal
        title="Clasifica tu anuncio"
        open={selectLabelsModal}
        handleOpen={handleOpenSelectLabels}
      >
        <SelectLabels labels={form?.labels} setLabels={handleSetLabels} />
      </Modal> */}
      <Modal
        title="Selecciona un colo de fondo"
        open={selectColorModal}
        handleOpen={handleOpenSelectColor}
      >
        <div>
          <ColorPicker
            color={form?.backgroundColor}
            setColor={handleChangeColor}
          />
        </div>
      </Modal>
      <Modal
        title="Agrega un contacto"
        open={contactsModal}
        handleOpen={handleAddContact}
      >
        <ContactInputs
          contacts={form?.contacts}
          setContacts={handleSetContacts}
        />
      </Modal>
    </div>
  )
}
