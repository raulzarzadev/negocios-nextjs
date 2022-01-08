import Advert from '@comps/Advert.v3'
export default function AdvertsList ({
  barrio = undefined,
  adverts,
  filter,
  handleSetFilter
}) {
  return (
    <div className={''}>

      <div
        className={
          ' grid sm:grid-cols-2  lg:grid-cols-3 max-w-4xl mx-auto gap-4 sm:p-4 lg:gap-8 place-content-center'
        }
      >
        {adverts?.map((ad, i) => (
          <Advert
            key={i}
            advert={ad}
            showFavorite
            filter={filter}
            handleSetFilter={handleSetFilter}
          />
        ))}
      </div>
    </div>
  )
}
