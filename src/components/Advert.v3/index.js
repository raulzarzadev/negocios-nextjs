import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Image from 'next/image'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import { useEffect, useState } from 'react'
import { L } from '@comps/L'
import Modal from '@comps/Modals/Modal'
import { useAds } from 'src/hooks/useAds'
import useUser from 'src/context/UserContext'
import Tooltip from '@comps/Tooltip'
import { P } from '@comps/P'
import formatContacts from 'src/utils/formatContacts'
import { useRouter } from 'next/router'
import ModalPubish from '@comps/Modals/ModalPublish'
import ICONS from 'src/utils/ICONS'
import FilterChip from '@comps/Filter/FilterChip'

const DEFAULT_ADVERT = {
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
  image: [],
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
  advert = DEFAULT_ADVERT,
  showFavorite,
  edit,
  filter,
  handleSetFilter
  // form = false
}) {
  const { user, favoritesList } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (user?.admin) setIsAdmin(true)
  }, [user])
  const router = useRouter()
  const {
    labels,

    title,
    content,
    contacts,
    // backgroundColor,
    id
    // publication,
    // location
  } = advert
  const { deleteAdvert } = useAds()

  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )
  const [openDelete, setOpenDelete] = useState(false)
  const [openPublish, setOpenPublish] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }
  const handleOpenPublish = () => {
    setOpenPublish(!openPublish)
  }

  const handleDeleteAd = () => {
    deleteAdvert(id).then((res) => router.reload())
  }

  const mainImage = Array.isArray(advert?.image)
    ? advert?.image[advert?.image?.length - 1]
    : advert?.image
  const ImagesList = advert?.images
  return (
    <div
      className={
        'grid mt-2 shadow-lg rounded-lg  max-w-[320px]'
      }
    >
      <header
        className={
          'px-1 py-1 flex justify-between items-center w-full'
        }
      >
        <div className="h-16 flex flex-wrap justify-start overflow-y-auto snap-y ">
          {chips?.map((chip, i) => (
            <div key={i} className='m-0.5 snap-start'>
              <FilterChip
                label={chip}
                selected={filter === chip.key}
                onClick={() => handleSetFilter(chip.key)}
              />
            </div>
          ))}
        </div>

        <div className={' flex items-center '}>
          {showFavorite && (
            <FavoriteLabel
              isFavorite={favoritesList.includes(id)}
              advertId={id}
            />
          )}
          {edit && (
            <L href={`/adverts/edit/${id}`}>
              <ICONS.Edit />
            </L>
          )}
          {isAdmin && (
            <L href={`/adverts/${id}`}>
              <ICONS.Settings />
            </L>
          )}
        </div>
      </header>
      <section className={''}>
        {/* ---------------------------------IMAGE---------------------------------- */}
        <div className=" aspect-video relative group ">
          {ImagesList?.length && (
            <>
              <button
                disabled
                className="absolute top-0 bottom-0 group-hover:bg-slate-300  group-hover:bg-opacity-60 left-0 z-50"
              >
                <ICONS.ArrowLeft />
              </button>
              <button
                disabled
                className="absolute top-0 bottom-0 group-hover:bg-slate-300 group-hover:bg-opacity-60 right-0 z-50"
              >
                <ICONS.ArrowRight />
              </button>
            </>
          )}
          <div className="carousel w-full  overflow-x-auto h-48 ">
            {mainImage && (
              <div className="carousel-item w-full h-full">
                <div className="relative w-full h-full  ">
                  <Image
                    src={mainImage}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8/5+hnoEIwDiqkL4KAcT9GO0U4BxoAAAAAElFTkSuQmCC"
                  />
                </div>
              </div>
            )}

            {ImagesList?.map((image) => (
              <div
                key={image}
                className="carousel-item w-full h-full"
              >
                <div className="relative w-full h-full ">
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8/5+hnoEIwDiqkL4KAcT9GO0U4BxoAAAAAElFTkSuQmCC"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ---------------------------------TITLE---------------------------------- */}
        <div className={'px-1'}>
          <h5 className="text-start font-bold ">{title}</h5>
          <VisitsSecction />
          <pre
            className={
              'whitespace-pre-wrap font-sans text-sm  h-16 overflow-y-auto'
            }
          >
            {content}
          </pre>
        </div>
      </section>
      <footer
        className={'flex justify-center items-center h-16'}
      >
        <div
          className={
            'w-[90%] flex justify-evenly items-center'
          }
        >
          {/*  {location && (
            <a
              href={location}
              target="_blank"
              rel="noreferrer"
            >
              <ICONS.Location size="2rem" />
            </a>
          )} */}
          <ContactsSection contacts={contacts} />
          {/*  {contactLinks?.map((contact, i) => (
            <ContactLink contact={contact} key={i} />
          ))} */}
        </div>
        {/* MODALES */}

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

const ContactsSection = ({ contacts }) => {
  const formatedContacts = formatContacts(contacts)
  return (
    <div className="flex justify-evenly w-full">
      {formatedContacts.map((contact, i) => (
        <ContactLink key={i} contact={contact} />
      ))}
    </div>
  )
}

const ContactLink = ({ contact }) => {
  // console.log('contact.value', contact.value)
  const wstext =
    'Hola, vi tu anuncio en negociosdelbarrio.com. Quisiera...'
  const hrefOptions = {
    ws: `https://wa.me/${
      contact.prefix
    }${contact?.value?.replace(/\n/g, '')}?text=${wstext}`,

    tel: `tel:52${contact.value}`
  }

  return (
    <>
      <a
        href={hrefOptions[contact?.type] || contact?.value}
        target="_blank"
        rel="noreferrer"
        className=""
      >
        <div className=" p-1">{contact?.icon}</div>
      </a>
    </>
  )
}

const FavoriteLabel = ({ isFavorite, advertId }) => {
  const router = useRouter()
  const { addFavorite, removeFavorite } = useAds()

  const handleAddFavorite = () => {
    addFavorite(advertId).then((res) => {
      console.log('type', res)
      res?.type === 'NOT_USER' && handleOpenNotUser()
    })
  }

  const handleRemoveFavorite = () => {
    removeFavorite(advertId).then((res) => console.log(res))
  }

  const [openNotUser, setOpenNotUser] = useState()
  const handleOpenNotUser = () => {
    setOpenNotUser(!openNotUser)
  }
  return (
    <div>
      <div>
        {isFavorite
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
      <Modal
        open={openNotUser}
        handleOpen={handleOpenNotUser}
        title="Usuario sin registro"
        footerAcctions={
          <button
            onClick={(e) => {
              router.push('/login')
            }}
            className="btn btn-primary"
          >
            Ingresar
          </button>
        }
      >
        <div className="">
          <h4>Usuario sin registro</h4>
          <div>
            <em>
              Necesitas estar registrado para guardar
              favoritos
            </em>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const VisitsSecction = () => {
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
      </div>
      <div>
        <span className="flex text-sm">
          <ICONS.Coment className="mx-1" size={'1.2rem'} />
          Comentarios 0
        </span>
      </div>
    </div>
  )
}
