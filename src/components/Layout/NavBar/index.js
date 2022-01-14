/* eslint-disable no-undef */
/* eslint-disable no-new */
import { L } from '@comps/L'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { useRouter } from 'next/router'
import useUser from 'src/context/UserContext'
import ICONS from 'src/utils/ICONS'

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

  const handleChangeLang = (lang) => {
    console.log('change lang', lang)
  }

  return (
    <>
      <section
        className={
          ' top-0 right-0 left-0 min-h-[54px] flex justify-between items-center shadow-sm z-10 bg-white'
        }
      >
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
              <li className="self-center flex justify-center items-center">
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex="0"
                    className="btn btn-circle btn-ghost btn-xs flex"
                  >
                    <ICONS.Lang size={'1rem '} />
                  </div>
                  <ul
                    tabIndex="0"
                    className="p-2 shadow menu dropdown-content  rounded-box min-w-min bg-info compact"
                  >
                    <li>
                      <a
                        onClick={() =>
                          handleChangeLang('es')
                        }
                      >
                        Español
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleChangeLang('en')
                        }
                      >
                        Español
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <li c>
              <L
                href="/about"
                arialLabel="Acerca de negociosdelbarrio.com"
              >
                Acerca de
              </L>
            </li> */}
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
    </>
  )
}
