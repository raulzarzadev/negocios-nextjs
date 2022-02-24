import Image from 'next/image'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import useUser from 'src/context/UserContext'
import ICONS from 'src/utils/ICONS'
import FilterChip from '@comps/Filter/FilterChip'
import ContactsSection from './ContactsSection'
import DEFAULT_INFO from './DEFAULT_INFO'
import TitleSection from './TitleSection'
import AdevertRigthInfo from './AdevertRigthInfo'

export default function Advert ({
  advert = DEFAULT_INFO,
  showFavorite,
  edit,
  filter,
  handleSetFilter
  // form = false
}) {
  const { user, favoritesList } = useUser()

  const {
    labels,

    title,
    content,
    contacts,
    // backgroundColor,
    id,
    // publication,
    // location
    publication,
    comments
  } = advert
  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )
  // TODO fix, remove older images when they upload a new one
  const mainImage = Array.isArray(advert?.image)
    ? advert?.image[advert?.image?.length - 1]
    : advert?.image

  return (
    <div
      className={
        'grid mt-2 shadow-lg rounded-lg  max-w-[320px] w-full'
      }
    >
      <header
        className={
          'px-1 py-1 flex justify-between items-center w-full'
        }
      >
        <div className="h-16 flex flex-wrap justify-start overflow-y-auto snap-y ">
          {chips?.map((chip, i) => (
            <div key={i} className="m-0.4 snap-start">
              <FilterChip
                label={chip}
                selected={filter === chip.key}
                onClick={() => handleSetFilter(chip.key)}
              />
            </div>
          ))}
        </div>
        <AdevertRigthInfo
          isEditable={edit}
          isAdmin={user?.admin}
          advertId={id}
          isFavorite={favoritesList.includes(id)}
          publication={publication}
          showFavorite={showFavorite}
        />
      </header>
      <section className={''}>
        {/* ---------------------------------IMAGE---------------------------------- */}

        <Images
          images={advert?.images}
          mainImage={mainImage}
        />
        {/* ---------------------------------TITLE---------------------------------- */}
        <div className={'px-1'}>
          <TitleSection
            title={title}
            comments={comments}
            advertLink={`/adverts/${publication?.advertId}?publication=${publication?.id}`}
          />
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
          <ContactsSection contacts={contacts} />
        </div>
      </footer>
    </div>
  )
}

const Images = ({ images = [], mainImage }) => {
  if (!images.length && !mainImage) return null
  return (
    <div className=" aspect-video relative group ">
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

        {images?.map((image) => (
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
      {!!images?.length && (
        <>
          <button
            disabled
            className="absolute top-0 bottom-0 group-hover:bg-slate-300  group-hover:bg-opacity-60 left-0 "
          >
            <ICONS.ArrowLeft />
          </button>
          <button
            disabled
            className="absolute top-0 bottom-0 group-hover:bg-slate-300 group-hover:bg-opacity-60 right-0 "
          >
            <ICONS.ArrowRight />
          </button>
        </>
      )}
    </div>
  )
}
