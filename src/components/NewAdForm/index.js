import Advert from "@comps/Advert";
import ColorPicker from "@comps/ColorPicker";
import ContactInputs from "@comps/ContactInputs";
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
  console.log(advert);

  const handleSubmit = (form) => {
    /* --------------Edit Advert-------------- */
    if (advert?.id) {
      editAdvert(advert.id, form).then((res) => {
        setTimeout(() => {
          console.log(res);
          console.log("Editando");
          router.push("/profile");
        }, 1000);
      });
    } else {
      /* --------------New Advert-------------- */
      addAdvert(form).then((res) => {
        setTimeout(() => {
          console.log("redireccionando a perfil");
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
          <SelectLabels labels={form?.labels } setLabels={handleSetLabels} />
        </section>
        {/* CONTACTS */}
        <section className={styles.section_form}>
          <h4>Contactos</h4>
          <ContactInputs
            contacts={form?.contacts}
            setContacts={handleSetContacts}
          />
        </section>
        {/* COLOR */}
        <section className={styles.section_form}>
          <h4>Color</h4>
          <ColorPicker
            color={form?.backgroundColor}
            setColor={handleChangeColor}
          />
        </section>
        {/* IMAGES */}
        <section className={styles.section_form}>
          <h4>Imagenes</h4>
          <input type="file" name="images" onChange={handleSelectImage} />
        </section>
        {/* PREVIEW ADVERT */}
        <section className={styles.section_form}>
          <Advert advert={form} />
        </section>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
