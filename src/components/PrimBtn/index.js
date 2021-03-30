import styles from './styles.module.css'
import PropTypes from 'prop-types'

export default function PrimBtn({ children, ...rest }) {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  )
}
PrimBtn.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'warning', 'success']),
}
