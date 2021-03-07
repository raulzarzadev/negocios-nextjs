import styles from "./styles.module.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";
import { L } from "@comps/L";
import Modal from "@comps/Modal";
import Advert from "@comps/Advert";

export default function AdminDashboard() {
  const [adverts, setAdverts] = useState([]);
  const { getAds } = useAds();
  useEffect(() => {
    getAds().then(setAdverts);
  }, []);
  console.log(adverts);
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetailsModal = () => {
    setOpenDetails(!openDetails);
  };
  return (
    <div className={styles.dashboard}>
      <div>
        <h3>{`Todos los anuncios`}</h3>
        <div className={styles.dash_table}>
          <div className={styles.table_title}>Titulo</div>
          <div className={styles.table_title}>¿Pub?</div>
          <div className={styles.table_title}>Acciones</div>
        </div>
        {adverts?.map((ad) => (
          <div className={styles.dash_row} key={ad.id}>
            <div className={styles.table_cell}>{ad.title}</div>
            <div className={styles.table_cell}>
              <div className="center">
                <CheckCircleIcon />
                <CheckCircleOutlineIcon />
              </div>
            </div>

            <div className={styles.table_cell}>
              <div className="center">
                <L href={`/adverts/edit/${ad.id}`}>
                  <button>
                    <EditIcon />
                  </button>
                </L>
                <button onClick={handleOpenDetailsModal}>
                  <SettingsApplicationsIcon />
                </button>
              </div>
            </div>
            <Modal open={openDetails} handleOpen={handleOpenDetailsModal}>
              <Advert advert={ad} />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
