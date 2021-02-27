import styles from "./styles.module.css";
import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.layout}>
        <NavBar />
        <section className={styles.layout_container}>{children}</section>
      </div>
    </>
  );
}
