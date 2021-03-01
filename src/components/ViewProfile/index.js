import { L } from "@comps/L";
import { logout } from "firebase/client";
import styles from "./styles.module.css";

export default function ViewProfile() {
  const handleLogOut = () => {
    logout();
  };
  return (
    <div className={styles.view_profile}>
      <div className={styles.profile_actions}>
        <div className={styles.action}>
          <button onClick={handleLogOut}>Salir</button>
        </div>
        <div className={styles.action}>
          <L href="/adverts/new">Nuevo Anuncio</L>
        </div>
        <div className={styles.action}>
          <L href="/barrios/new">Nuevo Barrio</L>
        </div>
      </div>
    </div>
  );
}
