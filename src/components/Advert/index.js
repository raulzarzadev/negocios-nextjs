import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MenuIcon from "@material-ui/icons/Menu";

import { SvgIcon } from "@material-ui/core";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";

import styles from "./styles.module.css";
import { CONTACT_TYPES } from "CONST/CONTACT_TYPES";
import { useState } from "react";
import { L } from "@comps/L";
import Modal from "@comps/Modal";
import { useAds } from "src/hooks/useAds";
import ModalPubish from "@comps/ModalPublish";

const defaulAdvert = {
  labels: ["lab1", "lab2"],
  images: [
    { title: " deserunt veniam ipsum", url: "strud ex id voluptate " },
    { title: " deserunt veniam ipsum", url: "strud ex id voluptate " },
    { title: " deserunt veniam ipsum", url: "strud ex id voluptate " },
  ],
  title: "strud ex id voluptate ",
  content:
    "Irure minim esse nostrud ex id voluptate deserunt veniam ipsum ut reprehenderit.",
  contacts: [
    { type: "ws", value: "55555555555" },
    { type: "fb", value: "55555555" },
    { type: "web", value: "555555555" },
  ],
};

export default function Advert({ advert = defaulAdvert }) {
  const {
    labels,
    images,
    title,
    content,
    contacts,
    backgroundColor,
    id,
    publication,
  } = advert;
  console.log(advert);
  const { deleteAdvert, unpublishAdvert } = useAds();
  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.value === label)
  );
  const contactLinks = contacts?.map((contact) =>
    CONTACT_TYPES.find((contactType) => contactType.value === contact.type)
  );

  const [openDelete, setOpenDelete] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };
  const handleOpenPublish = () => {
    setOpenPublish(!openPublish);
  };

  const handleUnpublish = () => {
    unpublishAdvert(publication);
  };

  const handleDeleteAd = () => {
    deleteAdvert(id);
  };

  return (
    <div style={{ backgroundColor }} className={styles.advert}>
      <header className={styles.header}>
        {chips?.map((chip, i) => (
          <SvgIcon key={i}>{chip?.icon}</SvgIcon>
        ))}
        <div className={styles.labels}></div>
        <div className={styles.actions}>
          <button>
            <BookmarkBorderIcon />
          </button>
          <MenuAdminAd
            advertId={id}
            handleDeleteAd={handleOpenDelete}
            handlePublish={handleOpenPublish}
            handleUnpublish={handleUnpublish}
          />
        </div>
      </header>
      <section className={styles.body}>
        <div className={styles.body_images}>
          {/*  <img src={"/logotipo.png"} alt={""} className={styles.image} /> */}
          {/* {images[0] && <img src={images[0].url} alt={images[0].title} />} */}
        </div>
        <div className={styles.body_content}>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.contacts}>
          {contactLinks?.map((contact, i) => (
            <SvgIcon key={i}>{contact?.icon}</SvgIcon>
          ))}
        </div>
        {/* MODALES */}
        <Modal open={openDelete} handleOpen={handleOpenDelete}>
          {`Eliminar anuncio`}
          <button onClick={handleDeleteAd}>Eliminar</button>
        </Modal>
        <ModalPubish
          open={openPublish}
          handleOpen={handleOpenPublish}
          advertId={id}
        />
      </footer>
    </div>
  );
}

const MenuAdminAd = ({
  advertId,
  handleDeleteAd,
  handlePublish,
  handleUnpublish,
}) => {
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    e.target.id !== "menu-container" && setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className={styles.open_buttom}
        id="menu-desplegable"
      >
        <MenuIcon />
        {open && (
          <div
            className={styles.menu_continer}
            id="modal-container"
            onClick={handleClose}
          >
            <div className={styles.menu}>
              <ul className={styles.menu_list}>
                <L href={`/adverts/edit/${advertId}`}>
                  <li className={styles.menu_item}>Editar</li>
                </L>
                <li className={styles.menu_item} onClick={handleDeleteAd}>
                  {` Eliminar`}
                </li>
                <li
                  className={styles.menu_item}
                  onClick={handlePublish}
                >{`Publicar`}</li>
                <li
                  className={styles.menu_item}
                  onClick={handleUnpublish}
                >{`Despublicar`}</li>
              </ul>
            </div>
          </div>
        )}
      </button>
    </>
  );
};
