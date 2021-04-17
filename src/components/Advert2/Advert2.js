import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import MenuIcon from '@material-ui/icons/Menu'
import Image from 'next/image'
import { SvgIcon } from '@material-ui/core'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'

import styles from './styles.module.css'
import { useState } from 'react'
import { BtnL, L } from '@comps/L'
import Modal from '@comps/Modal'
import { useAds } from 'src/hooks/useAds'
import ModalPubish from '@comps/ModalPublish'
import { useUser } from 'src/context/UserContext'
import IconBtn from '@comps/IconBtn'
import Tooltip from '@comps/Tooltip'
import { P } from '@comps/P'
import formatContacts from 'src/utils/formatContacts'
import { useRouter } from 'next/router'
import AlertFavs from '@comps/AlertFavs'

const defaulAdvert = {
  backgroundColor: 'gray',
  labels: ['food', 'drink'],
  images: [
    { title: ' deserunt veniam ipsum', url: 'strud ex id voluptate ' },
    { title: ' deserunt veniam ipsum', url: 'strud ex id voluptate ' },
    { title: ' deserunt veniam ipsum', url: 'strud ex id voluptate ' }
  ],
  title: 'strud ex id voluptate ',
  content:
    'Irure minim esse nostrud ex id voluptate deserunt veniam ipsum ut reprehenderit.',
  contacts: [
    { type: 'ws', value: '55555555555' },
    { type: 'fb', value: '55555555' },
    { type: 'web', value: '555555555' }
  ]
}

export default function Advert ({ advert = defaulAdvert, showFavorite, admin, form = false }) {
  const router = useRouter()
  const {
    labels,
    image,
    title,
    content,
    contacts,
    backgroundColor,
    id,
    publication
  } = advert

  const {
    deleteAdvert,
    unpublishAdvert,
    addFavorite,
    removeFavorite
  } = useAds()

  const { favoritesList } = useUser()
  const favorite = favoritesList.includes(id)

  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )

  const contactLinks = formatContacts(contacts)
  const [openDelete, setOpenDelete] = useState(false)
  const [openPublish, setOpenPublish] = useState(false)
  const [alert, setAlert] = useState(null)

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }
  const handleOpenPublish = () => {
    setOpenPublish(!openPublish)
  }

  const handleUnpublish = (publicationId) => {
    unpublishAdvert(publicationId)
  }
  const handleAddFavorite = () => {
    addFavorite(id).then((res) => {
      console.log('type', res)
      res?.type === 'NOT_USER' && setAlert(true)
    })
  }

  const handleRemoveFavorite = () => {
    removeFavorite(id).then((res) => console.log(res))
  }

  const handleDeleteAd = () => {
    deleteAdvert(id).then((res) => router.reload())
  }

  return (
    <div style={{ backgroundColor }} className={styles.advert}>
      <header className={styles.header}>
        {chips?.map((chip, i) => (
          <Tooltip key={i} text={chip?.label} position="left">
            <SvgIcon>{chip?.icon}</SvgIcon>
          </Tooltip>
        ))}
        <div className={styles.labels}></div>
        <div className={styles.actions}>
          {showFavorite && (
            <div>
              {favorite
                ? (
                <Tooltip text="Eliminar de favoritos" position="right">
                  <IconBtn onClick={handleRemoveFavorite}>
                    <BookmarkIcon />
                  </IconBtn>
                </Tooltip>
                  )
                : (
                <Tooltip text="Agregar a favoritos" position="right">
                  <IconBtn onClick={handleAddFavorite}>
                    <BookmarkBorderIcon />
                  </IconBtn>
                </Tooltip>
                  )}
            </div>
          )}
          {admin && (
            <MenuAdminAd
              publication={publication}
              advertId={id}
              handleDeleteAd={handleOpenDelete}
              handlePublish={handleOpenPublish}
              handleUnpublish={handleUnpublish}
            />
          )}
        </div>
      </header>
      <section className={styles.body}>
        {/* ---------------------------------IMAGE---------------------------------- */}
        <div className={styles.body_images}>
         {/*  <div
            style={{
              backgroundImage: `url(${image || '/logotipo.png'})`
            }}
            className={styles.image}
          /> */}
          <Image src={`${image || '/lotipo.png'}`} width='100%' height='100%'/>
        </div>
        {/* ---------------------------------IMAGE---------------------------------- */}
        <div className={styles.body_content}>
          <h5>{title}</h5>
          <p>

            {content?.slice(0, 100)}
            <BtnL onClick={() => console.log('show details')}>
              <em> ver mas </em>
            </BtnL>
          </p>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.contacts}>
          {contactLinks?.map((contact, i) => (
            <ContactLink contact={contact} key={i} />
          ))}
        </div>
        {/* MODALES */}
        {alert && <AlertFavs open={alert} handleOpen={() => setAlert(false)}/>}
        <Modal open={openDelete} handleOpen={handleOpenDelete}>
          <div>
            <P>{'Eliminar anuncio'}</P>
            <button onClick={handleDeleteAd}>Eliminar</button>
          </div>
        </Modal>
        <ModalPubish
          open={openPublish}
          handleOpen={handleOpenPublish}
          advertId={id}
        />
      </footer>
    </div>
  )
}

const ContactLink = ({ contact }) => {
  const hrefOptions = {
    ws: `https://wa.me/${contact.value.replace(
      / /g,
      ''
    )}?text=Hola,%20te%20encontre%20en%20negociosdelbarrio.com%20y%20quisiera..`
  }

  return (
    <Tooltip text={contact?.label}>
      <IconBtn>
        <a href={hrefOptions[contact.type] || contact.value} target="_blank" rel="noreferrer">
          <SvgIcon fontSize="large">{contact?.icon}</SvgIcon>
        </a>
      </IconBtn>
    </Tooltip>
  )
}

const MenuAdminAd = ({
  publication,
  advertId,
  handleDeleteAd,
  handlePublish,
  handleUnpublish
}) => {
  const handleOpen = (e) => {
    setOpen(true)
  }
  const handleClose = (e) => {
    e.stopPropagation()
    e.target.id !== 'menu-container' && setOpen(false)
  }

  const [open, setOpen] = useState(false)
  return (
    <>
      <IconBtn
        onClick={handleOpen}
        className={styles.open_buttom}
        id="menu-desplegable"
      >
        <MenuIcon />
        {open && (
          <div
            className={styles.menu_continer}
            id="modal-container"
            onClick={handleClose}
          >
            <div className={styles.menu}>
              <ul className={styles.menu_list}>
                <L href={`/adverts/edit/${advertId}`}>
                  <li className={styles.menu_item}>Editar</li>
                </L>
                <li className={styles.menu_item} onClick={handleDeleteAd}>
                  {' Eliminar'}
                </li>
                {publication
                  ? (
                  <li
                    className={styles.menu_item}
                    onClick={() => handleUnpublish(publication.id)}
                  >{'Despublicar'}</li>
                    )
                  : (
                  <li
                    className={styles.menu_item}
                    onClick={handlePublish}
                  >{'Publicar'}</li>
                    )}
              </ul>
            </div>
          </div>
        )}
      </IconBtn>
    </>
  )
}
