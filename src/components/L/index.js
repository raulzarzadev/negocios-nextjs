import styles from './styles.module.css'
import Link from 'next/link'
import PropTypes from 'prop-types'
export function L ({ href, children, style, name = 'link' }) {
  return (
    <Link href={href}>
      <a className={styles.link} style={style} name={name}>
        {children}
      </a>
    </Link>
  )
}

L.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object
}

export function BtnL ({ onClick, children, style }) {
  return (
    <a onClick={onClick} className={styles.link} style={style}>
      {children}
    </a>
  )
}

BtnL.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object
}

export function ExternalL ({ href, children }) {
  return (
    <a className={`${styles.link} ${styles.external_link}`} href={href}>
      {children}
    </a>
  )
}

ExternalL.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
}
