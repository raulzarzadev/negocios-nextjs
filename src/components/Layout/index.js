import styles from './styles.module.css'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from '@comps/Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Head>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0"
        />
        <meta
          name="description"
          content="Encuentra todo lo que necesitas en tu Colonia o Barrio. Todos los negocios cerca de ti"
        />
        <meta
          name="description"
          content="Puestos de Comida. Comercios y establecimientos"
        />
        <title>Negocios del Barrio</title>
        <link rel='icon' href='/logo.png'/>
      </Head>
      <div className={styles.layout}>
        <NavBar />
        <section className={styles.layout_container}>
          {children}
        </section>
        <Footer />
      </div>
    </>
  )
}
