import Advert from "@comps/Advert";
import ColorPicker from "@comps/ColorPicker";
import ContactInputs from "@comps/ContactInputs";
import Modal from "@comps/Modal";
import SelectLabels from "@comps/SelectLabels";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";
import styles from "./styles.module.css";

export default function NewAdForm({ advert = undefined }) {
  useEffect(() => {
    if (advert) {
      setForm(advert);
    }
  }, [advert]);

  const router = useRouter();
  const [form, setForm] = useState(undefined);
  const { addAdvert, editAdvert } = useAds();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [selectLabelsModal, setSelectLabelsModal] = useState(false);
  const [selectColorModal, setSelectColorModal] = useState(false);
  const handleOpenSelectColor = () => {
    setSelectColorModal(!selectColorModal);
  };
  const handleOpenSelectLabels = () => {
    setSelectLabelsModal(!selectLabelsModal);
  };
  const [contactsModal, setContactsModal] = useState(false);
  const handleAddContact = () => {
    setContactsModal(!contactsModal);
  };

  const handleSubmit = (form) => {
    /* --------------Edit Advert-------------- */
    if (advert?.id) {
      editAdvert(advert.id, form).then((res) => {
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      });
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form).then((res) => {
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      });
    }
  };
  const handleChangeColor = (e) => {
    setForm({ ...form, backgroundColor: e });
  };
  const handleSelectImage = (e) => {
    setForm({ ...form, images: e.target.files });
  };
  const handleSetContacts = (e) => {
    setForm({ ...form, contacts: e });
  };
  const handleSetLabels = (e) => {
    setForm({ ...form, labels: e });
  };

  return (
    <div className={styles.form_container}>
      <h3>Nuevo Anuncio</h3>
      {/* NEW ADVERT */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
      >
        <section className={styles.section_form}>
          <h4>Contenido</h4>
          {/* IMAGE */}
          {/* TITLE AND CONTENT */}
          <span>
            <p>Titulo:</p>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={form?.title || ""}
            />
          </span>
          <span>
            <p>Contenido:</p>
            <textarea
              type="text"
              name="content"
              onChange={handleChange}
              rows={3}
              value={form?.content || ""}
            />
          </span>
        </section>
        {/* CLASIFICATION */}
        <section className={styles.section_form}>
          <h4>Clasificación</h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenSelectLabels();
            }}
          >
            Clasifica tu anuncio
          </button>
        </section>
        {/* CONTACTS */}
        <section className={styles.section_form}>
          <h4>Contactos</h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddContact();
            }}
          >
            Agrega un contacto
          </button>
        </section>
        {/* COLOR */}
        <section className={styles.section_form}>
          <h4>Color</h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenSelectColor();
            }}
          >
            Selecciona un color
          </button>
        </section>
        {/* IMAGES */}
        <section className={styles.section_form}>
          <h4>Imagenes</h4>
          <input type="file" name="images" onChange={handleSelectImage} />
        </section>
        {/* PREVIEW ADVERT */}
        <section className={styles.section_form}>
          <Advert advert={form} newForm={true} />
        </section>
        <button type="submit">Guardar</button>
      </form>
      <Modal
        title="Clasifica tu anuncio"
        open={selectLabelsModal}
        handleOpen={handleOpenSelectLabels}
      >
        <SelectLabels labels={form?.labels} setLabels={handleSetLabels} />
      </Modal>
      <Modal
        open={selectColorModal}
        handleOpen={handleOpenSelectColor}
        title="Selecciona un colo de fondo"
      >
        <div>
          <ColorPicker
            color={form?.backgroundColor}
            setColor={handleChangeColor}
          />
        </div>
      </Modal>
      <Modal
        open={contactsModal}
        handleOpen={handleAddContact}
        title="Agrega un contacto"
      >
        <ContactInputs
          contacts={form?.contacts}
          setContacts={handleSetContacts}
        />
      </Modal>
    </div>
  );
}
