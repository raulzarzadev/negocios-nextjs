import ICONS from 'src/utils/ICONS'

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
export default VisitsSecction
