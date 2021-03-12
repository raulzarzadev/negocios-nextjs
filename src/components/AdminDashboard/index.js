import styles from "./styles.module.css";
import EditIcon from "@material-ui/icons/Edit";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
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
          <AddRow ad={ad} />
        ))}
      </div>
    </div>
  );
}
const AddRow = ({ ad }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetailsModal = () => {
    setOpenDetails(!openDetails);
  };
  return (
    <>
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
          <div className={styles.modal_advert}>
            <div className={styles.modal_options}>
              <div>
                Publicaciones:{console.log(ad)}
                <div></div>
              </div>
              <div>Creado:</div>
              <div>Dueño:</div>
            </div>
            <Advert advert={ad} admin />
          </div>
        </Modal>
      </div>
    </>
  );
};
