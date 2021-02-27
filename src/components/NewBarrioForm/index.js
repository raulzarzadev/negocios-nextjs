import { ESTADOS_LABEL_MX } from "CONST/ESTADOS_MX";
import { useState } from "react";
import styles from "./styles.module.css";

export default function NewBarrioForm() {
  const STATES = ESTADOS_LABEL_MX;

  /* SUMBIT NEW BARRIO */
  /* HANDLE CHANGE */
  /* GET STATE STATE */
  const [form, setForm] = useState();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (form) => {
    console.log(form);
  };
  console.log(form);
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
          <select name="state" onChange={handleChange}>
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
          <input type="text" name="name" onChange={handleChange}></input>
        </span>
        {/* NOMBRE CORTO */}
        {/* NOMBRE DEL BARRIO */}
        <span>
          <p>Nombre Corto:</p>
          <input type="text" name="shortName" onChange={handleChange}></input>
        </span>
        <div>
          <button>Guardar</button>
        </div>
      </form>
    </div>
  );
}
