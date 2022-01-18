import useCopyToClipboard from 'src/hooks/useCopyToClipboard'
import ICONS from 'src/utils/ICONS'

const CopyableToClipboard = ({ children, value }) => {
  const [currentValor, copy, visible] = useCopyToClipboard()

  return (
    <div className="flex relative">
      <div>{children}</div>
      <button
        className={' btn-xs'}
        onClick={() => copy(value)}
      >
        <ICONS.Copy />
        {visible && currentValor === value && (
          <div className="absolute right-0 -top-2 bg-success text-dark">
            Copiado
          </div>
        )}
      </button>
    </div>
  )
}
export default CopyableToClipboard
