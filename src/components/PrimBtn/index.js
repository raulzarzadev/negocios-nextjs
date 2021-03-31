import styles from './styles.module.css'
import PropTypes from 'prop-types'

export default function PrimBtn({ type, children, onChange, ...rest }) {
  if (type === 'file')
    return (
      <label className={styles.button} {...rest}>
        {children}
        <input
          style={{ display: 'none' }}
          type="file"
          name="images"
          onChange={onChange}
          multiple
        />
      </label>
    )
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  )
}
PrimBtn.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'warning',
    'success',
  ]).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
}
