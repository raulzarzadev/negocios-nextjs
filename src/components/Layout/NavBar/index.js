import { L } from '@comps/L'
import { useEffect, useState } from 'react'
import { useUser } from 'src/context/UserContext'
import styles from './styles.module.css'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { useRouter } from 'next/router'

export default function NavBar () {
  const { user } = useUser()
  const [isLogin, setIsLogin] = useState()
  useEffect(() => {
    if (user) {
      setIsLogin(true)
    } else setIsLogin(false)
  }, [user])

  const { route } = useRouter()
  const profilePage = route === '/profile'

  return (
    <section className={styles.top_bar}>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <L href="/">
            <img
              className={styles.nav_image}
              src="/logotipo.png"
              alt="logo"
            />
          </L>
        </div>
        <menu className={styles.nav_menu}>
          <ul className={styles.nav_menu_list}>
            {!profilePage && user && (
              <li className={styles.list_item}>
                <L href="/profile" arialLabel="Tu Perfil">
                  <BookmarkIcon />
                </L>
              </li>
            )}
            <li className={styles.list_item}>
              <L href="/about" arialLabel="Acerca de negociosdelbarrio.com">
                Acerca de
              </L>
            </li>
            {isLogin && (
              <li className={styles.list_item}>
                <L href="/profile" arialLabel="Tu Perfil">
                  <div
                    className={styles.avatar}
                    style={{
                      backgroundImage: `url(${user?.image})`
                    }}
                  />
                </L>
              </li>
            )}
            {!isLogin && (
              <li className={styles.list_item}>
                <L href="/login">Ingresa</L>
              </li>
            )}
          </ul>
        </menu>
      </nav>
    </section>
  )
}
