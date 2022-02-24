import { useEffect, useState } from 'react'

import Link from 'next/link'
import { firebaseLogout } from 'firebase/client'
import useUser from 'src/context/UserContext'
import { useRouter } from 'next/router'

export default function NavBarMenu ({ children }) {
  const [showMenu, setShowMenu] = useState(false)
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }
  useEffect(() => {
    const eventClick = (e) => {
      const { id } = e.target
      if (id === 'nav-menu') handleShowMenu()
    }
    const a = document.getElementById('nav-menu')
    a.addEventListener('click', eventClick)
    return () => {
      a.removeEventListener('click', eventClick)
    }
  }, [showMenu])

  const { user } = useUser()
  const { route } = useRouter()

  const LINKS = [
    {
      label: 'Profile',
      href: '/profile',
      hidden: !user || route === '/profile'
    },
    { label: 'Home', href: '/', hidden: route === '/' },
    {
      label: 'Login',
      href: '/login',
      hidden: route === '/login' || !!user
    },
    {
      label: 'New Advert',
      href: '/adverts/new',
      hidden: !user || route === '/adverts/new'
    },
    {
      label: 'New Barrio',
      href: '/barrios/new',
      hidden: !user || route === '/barrios/new'
    },
    {
      label: 'Sign out',
      href: '/salir',
      hidden: !user,
      onClick: () => {
        firebaseLogout()
      }
    }
  ]

  return (
    <li
      id="nav-menu"
      className=" group  flex items-end hover:bg-transparent  px-1 "
      onClick={handleShowMenu}
    >
      {showMenu && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-dark bg-opacity-20 z-10"
          id="hola"
        ></div>
      )}

      <div className="relative ">
        {/* <!-- Dropdown toggle button --> */}
        {children && (
          <button className="group-hover:text-black ">
            {children || 'v'}
          </button>
        )}

        {/*  <!-- Dropdown menu --> */}
        <ul
          className={`absolute ${
            showMenu ? 'block' : 'hidden'
          } -right-1 z-20 w-48 py-2 mt-0 bg-white text-light rounded-bl-xl shadow-xl `}
        >
          {LINKS.map(({ href, label, onClick, hidden }) => (
            <>
              {!hidden && (
                <Link href={href} key={label}>
                  <li
                    onClick={() => {
                      setShowMenu(false)
                      onClick && onClick()
                    }}
                    className={
                      'block px-4 py-2 text-sm  capitalize transition-colors duration-200 transform hover:text-white dark:text-light   dark:hover:text-white cursor-pointer'
                    }
                  >
                    {label}
                  </li>
                </Link>
              )}
            </>
          ))}
        </ul>
      </div>
    </li>
  )
}
