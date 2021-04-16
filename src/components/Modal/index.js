import React from "react";
import styles from "./styles.module.css";

export default function Modal({
  title = "Modal title",
  open,
  handleOpen = () => {},
  children,
}) {
  return (
    <div
      className={styles.modal}
      id="modal-1"
      style={{ display: !open && "none" }}
      onClick={(e) => {
        e.target.id === "modal-1" && handleOpen();
      }}
     
    >
      <div className={styles.modal_dialog} >
        <header className={styles.modal_header}>
          <div className={styles.modal_title}>
            <h5>{title}</h5>
          </div>
          <button
            className={styles.modal_button_close}
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
          >
            X
          </button>
        </header>
        <section className={styles.modal_content}>{children}</section>
        <footer className={styles.modal_footer}></footer>
      </div>
    </div>
  );
}
