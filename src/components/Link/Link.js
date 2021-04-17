
import s from './styles.module.css'
import NextLink from 'next/link'
export default function Link ({ children, href }) {
  return (
    <NextLink href={href}>
      <a className={s.link}>
      {children}
      </a>
    </NextLink>
  )
}
