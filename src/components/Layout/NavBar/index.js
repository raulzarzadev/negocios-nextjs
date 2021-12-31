import { L } from '@comps/L'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { useRouter } from 'next/router'
import useUser from 'src/context/UserContext'

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
    <section className={' top-0 right-0 left-0 min-h-[54px] flex justify-between items-center shadow-sm z-10 bg-white'}>
      {/* .top_bar {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 1px 1px 16px rgb(0, 0, 0,0.1);
}
 */}
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <L href="/">
            <img
              className={styles.nav_image}
              src="/logo-black.png"
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
              <L
                href="/about"
                arialLabel="Acerca de negociosdelbarrio.com"
              >
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
