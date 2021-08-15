import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Image from 'next/image'
import { SvgIcon } from '@material-ui/core'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'

import styles from './styles.module.css'
import { useState } from 'react'
import { L } from '@comps/L'
import Modal from '@comps/Modals/Modal'
import { useAds } from 'src/hooks/useAds'
import useUser from 'src/context/UserContext'
import Tooltip from '@comps/Tooltip'
import { P } from '@comps/P'
import formatContacts from 'src/utils/formatContacts'
import { useRouter } from 'next/router'
import AlertFavs from '@comps/Modals/AlertFavs'
import ModalPubish from '@comps/Modals/ModalPublish'
import ICONS from 'src/utils/ICONS'

const defaulAdvert = {
  backgroundColor: 'gray',
  labels: ['food', 'drink'],
  images: [
    {
      title: ' deserunt veniam ipsum',
      url: 'strud ex id voluptate '
    },
    {
      title: ' deserunt veniam ipsum',
      url: 'strud ex id voluptate '
    },
    {
      title: ' deserunt veniam ipsum',
      url: 'strud ex id voluptate '
    }
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

export default function Advert ({
  advert = defaulAdvert,
  showFavorite,
  admin,
  edit
  // form = false
}) {
  const router = useRouter()
  const {
    labels,
    image,
    title,
    content,
    contacts,
    // backgroundColor,
    id,
    // publication,
    location
  } = advert

  const {
    deleteAdvert,
    // unpublishAdvert,
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
    <div
      // style={{ backgroundColor }}
      className={styles.advert}
    >
      <header className={styles.header}>
        {chips?.map((chip, i) => (
          <Tooltip
            key={i}
            text={chip?.label}
            position="left"
          >
            <SvgIcon>{chip?.icon}</SvgIcon>
          </Tooltip>
        ))}
        <div className={styles.labels}></div>
        <div className={styles.actions}>
          {showFavorite && (
            <div>
              {favorite
                ? (
                <Tooltip
                  text="Eliminar de favoritos"
                  position="right"
                >
                  <div onClick={handleRemoveFavorite}>
                    <BookmarkIcon />
                  </div>
                </Tooltip>
                  )
                : (
                <Tooltip
                  text="Agregar a favoritos"
                  position="right"
                >
                  <div onClick={handleAddFavorite}>
                    <BookmarkBorderIcon />
                  </div>
                </Tooltip>
                  )}
            </div>
          )}
          {edit && (
            <L href={`/adverts/edit/${id}`}>
              <ICONS.Edit />
            </L>
          )}
          {admin && (
            <L href={`/adverts/${id}`}>
              <ICONS.Settings />
            </L>
          )}
        </div>
      </header>
      <section className={styles.body}>
        {/* ---------------------------------IMAGE---------------------------------- */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '180px'
          }}
        >
          <Image
            alt={title}
            src={`${image || '/lotipo.png'}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${image || '/lotipo.png'}`}
          />
        </div>
        {/* ---------------------------------IMAGE---------------------------------- */}
        <div className={styles.body_content}>
          <h5>{title}</h5>
          <pre className={styles.pre}>{content}</pre>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.contacts}>
          {location && (
            <a
              href={location}
              target="_blank"
              rel="noreferrer"
            >
              <ICONS.Location size="2rem" />
            </a>
          )}
          {contactLinks?.map((contact, i) => (
            <ContactLink contact={contact} key={i} />
          ))}
        </div>
        {/* MODALES */}
        {alert && (
          <AlertFavs
            open={alert}
            handleOpen={() => setAlert(false)}
          />
        )}
        <Modal
          open={openDelete}
          handleOpen={handleOpenDelete}
        >
          <div>
            <P>{'Eliminar anuncio'}</P>
            <button onClick={handleDeleteAd}>
              Eliminar
            </button>
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
  const wstext =
    'Hola, vi tu anuncio en negociosdelbarrio.com. Quisiera...'
  const hrefOptions = {
    ws: `https://wa.me/${contact?.value.replace(
      / /g,
      ''
    )}?text=${wstext}`,
    tel: `tel:+52${contact.value}`
  }

  return (
    <Tooltip text={contact?.label}>
      <a
        href={hrefOptions[contact?.type] || contact?.value}
        target="_blank"
        rel="noreferrer"
      >
        <SvgIcon fontSize="large">{contact?.icon}</SvgIcon>
      </a>
    </Tooltip>
  )
}
