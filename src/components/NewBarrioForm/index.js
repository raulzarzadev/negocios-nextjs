import { ESTADOS_LABEL_MX } from "CONST/ESTADOS_MX";
import { addBarrio } from "firebase/client";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./styles.module.css";

export default function NewBarrioForm() {
  const router = useRouter();
  const STATES = ESTADOS_LABEL_MX;

  /* SUMBIT NEW BARRIO */
  /* HANDLE CHANGE */
  /* GET STATE STATE */
  const [form, setForm] = useState({
    state: "AGU",
    barrio: "",
    shortName: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (form) => {
    addBarrio(form).then((res) => {
      router.push(`/profile`);
      console.log(res);
    });
    setLoading(true);
  };

  const [loading, setLoading] = useState(false);

  const isDisabled = !form.state || !form.name || !form.shortName || loading;

  return (
    <div className={styles.form_container}>
      <h3>Nuevo Barrio</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
      >
        {/* SELECCIONA ESTADO */}
        <span>
          <p>Estado:</p>
          <select name="state" onChange={handleChange} value={form?.state}>
            {STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </span>
        {/* NOMBRE DEL BARRIO */}
        <span>
          <p>Barrio:</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form?.name}
          />
        </span>
        {/* NOMBRE CORTO */}
        {/* NOMBRE DEL BARRIO */}
        <span>
          <p>Nombre Corto:</p>
          <input
            type="text"
            name="shortName"
            onChange={handleChange}
            value={form?.shortName}
          />
        </span>
        <div>
          <button disabled={isDisabled}>Guardar</button>
        </div>
      </form>
    </div>
  );
}
