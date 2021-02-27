import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { SvgIcon } from "@material-ui/core";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";

import styles from "./styles.module.css";

export default function Advert({
  advert = {
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
  },
}) {
  const { labels, images, title, content, contacts } = advert;
  const chips = labels?.map((label) =>
    CHIP_LABELS.find((chip) => chip.value === label)
  );

  return (
    <div className={styles.advert}>
      <header className={styles.header}>
        {chips.map((chip, i) => (
          <SvgIcon key={i}>{chip.icon}</SvgIcon>
        ))}
        <div className={styles.labels}></div>
        <div className={styles.actions}>
          <button>
            <BookmarkBorderIcon />
          </button>
        </div>
      </header>
      <section className={styles.body}>
        <div className={styles.body_images}>
          <img src={"/logotipo.png"} alt={""} className={styles.image} />
          {/* {images[0] && <img src={images[0].url} alt={images[0].title} />} */}
        </div>
        <div className={styles.body_content}>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.contacts}>
          {contacts?.map((contact, i) => (
            <div key={i}>{contact.type}</div>
          ))}
        </div>
      </footer>
    </div>
  );
}
