import { L } from "@comps/L";
import styles from "./styles.module.css";

export default function ViewProfile() {
  return (
    <div className={styles.view_profile}>
      <div className={styles.profile_actions}>
        <div className={styles.action}>
          <button>Salir</button>
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
