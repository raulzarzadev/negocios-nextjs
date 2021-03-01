import { L } from "@comps/L";
import { useEffect, useState } from "react";
import { useUser } from "src/context/UserContext";
import styles from "./styles.module.css";

export default function NavBar() {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [user]);

  return (
    <section className={styles.top_bar}>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <L href="/">
            <img className={styles.nav_image} src="/logotipo.png" alt="logo" />
          </L>
        </div>
        <menu className={styles.nav_menu}>
          <ul className={styles.nav_menu_list}>
            <li className={styles.list_item}>
              <L href="/about">Mas</L>
            </li>
            {isLogin && (
              <li className={styles.list_item}>
                <L href="/profile">
                  <div
                    className={styles.avatar}
                    style={{ backgroundImage: `url(${user?.image})` }}
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
  );
}
