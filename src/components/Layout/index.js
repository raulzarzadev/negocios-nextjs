import styles from './styles.module.css'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from '@comps/Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0'/>
      </Head>
      <div className={styles.layout}>
        <NavBar />
        <section className={styles.layout_container}>{children}</section>
        <Footer/>
      </div>
    </>
  )
}
