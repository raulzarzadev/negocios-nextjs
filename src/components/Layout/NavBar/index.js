import { L } from "@comps/L";
import { useUser } from "src/context/UserContext";
import styles from "./styles.module.css";

export default function NavBar() {
  const { name } = useUser();
  return (
    <section className={styles.top_bar}>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <L href="/">
            <img className={styles.nav_image} src="" alt="logo" />
          </L>
        </div>
        <menu className={styles.nav_menu}>
          <ul className={styles.nav_menu_list}>
            <li className={styles.list_item}>
              <L href="/login">Ingresa</L>
            </li>
            <li className={styles.list_item}>
              <L href="/">Salir</L>
            </li>
            <li className={styles.list_item}>
              <L href="/">Home</L>
            </li>
            <li className={styles.list_item}>
              <L href="/mas">Mas</L>
            </li>
          </ul>
        </menu>
      </nav>
    </section>
  );
}
