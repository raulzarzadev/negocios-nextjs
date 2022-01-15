import Link from 'next/link'
import AdvertComents from './AdvertComents'

const TitleSection = ({
  title,
  advertId,
  comments,
  advertLink = false
}) => {
  return (
    <div className="grid ">
      {advertLink && (
        <div className="text-right">
          <Link href={advertLink}>
            <a className="text-sm font-bold opacity-50 ">
              ver mas
            </a>
          </Link>
        </div>
      )}
      <h5 className="text-start font-bold  ">{title}</h5>
      <div className="py-2 mx-auto">
        <AdvertComents
          className="text-right"
          comments={comments}
          advertId={advertId}
        />
      </div>
    </div>
  )
}

export default TitleSection
