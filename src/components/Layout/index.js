import styles from './styles.module.css'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from '@comps/Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Head>
        <link rel ='icon' href='icon.ico'></link>
      </Head>
      <div className={styles.layout}>
        <NavBar />
        <section className={styles.layout_container}>{children}</section>
        <Footer/>
      </div>
    </>
  )
}
