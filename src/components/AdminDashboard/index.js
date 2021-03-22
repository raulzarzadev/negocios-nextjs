import styles from "./styles.module.css";
import EditIcon from "@material-ui/icons/Edit";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";
import Modal from "@comps/Modal";
import Advert from "@comps/Advert";
import IconBtn from "@comps/IconBtn";
import { P } from "@comps/P";
import Link from "next/link";
import { usePublications } from "src/hooks/usePublications";

export default function AdminDashboard() {
  const [adverts, setAdverts] = useState([]);
  const [publications, setPublications] = useState([]);
  const { getAds } = useAds();
  const { getAllPublications } = usePublications();
  useEffect(() => {
    getAds().then(setAdverts);
    getAllPublications().then(setPublications);
  }, []);

  const normalizeAds = adverts.map((ad) => {
    const adPublications = publications.filter((pub) => pub.advertId === ad.id);
    return { ...ad, publications: adPublications };
  });
  console.log(normalizeAds);
  return (
    <div className={styles.dashboard}>
      <div>
        <h3 className={styles.page_title}>{`Todos los anuncios`}</h3>
        <div className={styles.dash_table}>
          <div className={styles.table_title}>Titulo</div>
          <div className={styles.table_title}>¿Pub?</div>
          <div className={styles.table_title}>Acciones</div>
        </div>
        {normalizeAds?.map((ad) => (
          <AddRow key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
const normalizeDate = (date) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  const year = newDate.getFullYear().toString().slice(2);
  return `${month}-${year}`;
};
const AddRow = ({ ad }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetailsModal = () => {
    setOpenDetails(!openDetails);
  };
  const { title, publications } = ad;

  return (
    <>
      <div className={styles.dash_row} key={ad.id}>
        <div className={styles.table_cell}>
          <P size="small">{title}</P>
        </div>
        <div className={styles.table_cell}>
          <div className="center">
            <CheckCircleIcon />
            <CheckCircleOutlineIcon />
          </div>
        </div>

        <div className={styles.table_cell}>
          <div className="center">
            <Link href={`/adverts/edit/${ad.id}`} forwardRef>
              <>
                <IconBtn>
                  <EditIcon fontSize="small" />
                </IconBtn>
              </>
            </Link>
            <IconBtn onClick={handleOpenDetailsModal}>
              <SettingsApplicationsIcon fontSize="small" />
            </IconBtn>
          </div>
        </div>
        <Modal open={openDetails} handleOpen={handleOpenDetailsModal}>
          <div className={styles.modal_advert}>
            <div className={styles.modal_options}>
              <div>
                Publicaciones: {publications?.length}
                <div className={styles.details}>
                  {publications?.map(
                    ({ id, barrioId, active, publishEnds, publishStart }) => (
                      <div
                        key={id}
                        className={styles.details_cell}
                        style={{ background: active ? "blue" : "red" }}
                      >
                        <div>{`barrio name`}</div>
                        <div>de: {normalizeDate(publishStart)}</div>
                        <div>a: {normalizeDate(publishEnds)}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <Advert advert={ad} admin />
          </div>
        </Modal>
      </div>
    </>
  );
};
