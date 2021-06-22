import styles from './styles.module.css'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from '@comps/Layout/Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Encuentra todo lo que necesitas en tu Colonia o Barrio. Todos los negocios cerca de ti"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0"
        />
        <title>Negocios del Barrio - Start</title>
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
