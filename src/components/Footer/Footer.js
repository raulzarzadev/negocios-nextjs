import Link from '@comps/Link'
import s from './styles.module.css'

export default function Footer () {
  return (
    <footer className={s.footer}>
      <span>
        Una app desarrollada por <Link href="https://raulzarza.com">RZ</Link>
      </span>
    </footer>
  )
}
