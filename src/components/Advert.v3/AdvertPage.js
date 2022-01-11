import FilterChip from '@comps/Filter/FilterChip'
import { L } from '@comps/L'
import { Link } from '@material-ui/core'
import { CHIP_LABELS } from 'CONST/CHIPS_LABELS'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useUser from 'src/context/UserContext'
import ICONS from 'src/utils/ICONS'
import ContactsSection from './ContactsSection'
import DEFAULT_INFO from './DEFAULT_INFO'
import FavoriteLabel from './FavoriteLabel'
import RatingSection from './RatingSection'
import VisitsSecction from './VisitSection'

export default function AdvertPage ({
  advert = DEFAULT_INFO,
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
  const {
    labels,

    title,
    content,
    contacts,
    // backgroundColor,
    id,
    // publication,
    // location
    publication
  } = advert
  console.log('publication', publication)
  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.key === label)
  )

  const mainImage = Array.isArray(advert?.image)
    ? advert?.image[advert?.image?.length - 1]
    : advert?.image
  const ImagesList = advert?.images
  return (
    <div className={'grid max-w-md mx-auto '}>
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
          <div className="text-right">
            <Link
              href={`/${publication?.barrioId}/${publication?.advertId}`}
            >
              <a className="text-sm font-bold opacity-50 ">
                ver mas
              </a>
            </Link>
          </div>
          <div className="flex justify-between">
            <h5 className="text-start font-bold ">
              {title}
            </h5>
            <div>
              <RatingSection />
            </div>
          </div>
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
          <ContactsSection contacts={contacts} />
        </div>
      </footer>
    </div>
  )
}
