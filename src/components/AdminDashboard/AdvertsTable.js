import Link from 'next/link'
import { useState } from 'react'
import ICONS from 'src/utils/ICONS'

export default function AdvertsTable ({
  adverts = [],
  publications
}) {
  const advertsWhitPublications = adverts.map((ad) => {
    const adPublications = publications?.filter(
      (pub) => pub.advertId === ad.id
    )
    const publicationList = adPublications.map(
      (pub) => pub.barrioId
    )
    return {
      ...ad,
      publications: adPublications,
      publicationList
    }
  })

  const [field, setField] = useState('title')

  const sortBy = (a, b) => {
    if (a[field] > b[field]) return 1
    if (a[field] < b[field]) return -1
    return 0
  }

  console.log('adverts', advertsWhitPublications)

  return (
    <div>
      <h3 className="text-xl font-bold text-center my-2">
        {'Todos los anuncios'}
      </h3>
      <div className="flex justify-between px-1 text-center">
        <div
          className="w-1/2"
          onClick={() => setField('title')}
        >
          {'Titulo'}
        </div>
        <div
          className="w-1/4"
          onClick={() => setField('publicationList')}
        >
          {'¿Pub?'}
        </div>
        <div
          className="w-1/4"

        >
          {'Acciones'}
        </div>
      </div>
      <div className="">
        {advertsWhitPublications
          .sort(sortBy)
          .map(({ id, publications, title }) => (
            <div
              key={id}
              className=" flex justify-between my-2 shadow-md "
            >
              <div className="w-1/2 pl-2 ">
                <span className="">{title}</span>
              </div>
              <div className="w-1/4 text-center flex justify-center flex-col">
                {publications.map(
                  ({ barrioId, active }) => (
                    <div
                      key={barrioId}
                      className={`rounded-full shadow-sm w-5 h-5 flex justify-center ${
                        active ? 'bg-accent' : 'bg-error'
                      }`}
                    >
                      <Link href={`/adverts/${id}`}>
                        <a>
                          <span className="">
                            {barrioId}
                          </span>
                        </a>
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div className="w-1/4 ">
                <div className="flex justify-evenly">
                  <Link href={`/adverts/edit/${id}`}>
                    <a>
                      <ICONS.Edit className="text-info" />
                    </a>
                  </Link>
                  <button
                    onClick={() => console.log('borrar')}
                  >
                    <ICONS.Delete className="text-error" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
