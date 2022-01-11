import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { usePublications } from 'src/hooks/usePublications'

export default function PublicationDetails () {
  const { getPublication } = usePublications()
  const {
    query: { id }
  } = useRouter()
  useEffect(() => {
    getPublication({ id }).then((res) => console.log(res))
  }, [id])

  return (
    <div className="">
      Detalles de anuncio en la publicacion publicación
    </div>
  )
}
