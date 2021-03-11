import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CONTACT_TYPES } from "CONST/CONTACT_TYPES";
import styles from "./styles.module.css";
import IconBtn from "@comps/IconBtn";
import Tooltip from "@comps/Tooltip";

export default function ContactInputs({ contacts = [], setContacts }) {
  const [newContact, setNewContact] = useState({ type: "" });
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  const CONTACTS_MAX = 5;

  useEffect(() => {
    contacts.length >= CONTACTS_MAX ? setDisabled(true) : setDisabled(false);
  }, [contacts.length]);

  useEffect(() => {
    switch (newContact.type) {
      case "":
        setPlaceholder("Selecciona el tipo de contacto");
        setDefaultValue("");
        break;
      case "ws":
        setPlaceholder("Escribe tu whats app");
        setDefaultValue("+52");
        break;
      case "tel":
        setPlaceholder("Numero de teléfono");
        setDefaultValue("");
        break;
      case "fb":
        setDefaultValue("https://facebook.com/");
        //setPlaceholder("Numero de teléfono");
        break;
      case "in":
        setDefaultValue("https://instagram.com/");
        break;
      case "web":
        setDefaultValue("https://");
        break;
      default:
        setPlaceholder("Copia el link");
        break;
    }
  }, [newContact]);

  const addContact = () => {
    setContacts([...contacts, newContact]);
  };

  const handleDeleteContact = (contact) => {
    const newList = contacts.filter(
      (cntct) =>
        !(cntct.type === contact.type.value && cntct.value === contact.value)
    );
    setContacts(newList);
  };
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const [disabled, setDisabled] = useState(false);

  const formatedContacts = contacts?.map((contact) => {
    const type = CONTACT_TYPES.find(
      (contactType) => contactType.value === contact.type
    );
    return { ...contact, type };
  });

  return (
    <div className={styles.contact_display}>
      <div className={styles.contacts_list}>
        <h3>Lista de contactos</h3>
        {formatedContacts?.map((contact, i) => (
          <div key={i}>
            <div className={styles.contact_row}>
              <div>
                <Tooltip text={contact.type.label}>
                  <p>{contact.type.icon}</p>
                </Tooltip>
              </div>
              <div>
                <p>{contact.value}</p>
              </div>
              <Tooltip text={"Eliminar"}>
                <IconBtn onClick={() => handleDeleteContact(contact)}>
                  <DeleteForeverIcon />
                </IconBtn>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      <h3>Nuevo contacto</h3>

      <InputContact
        disabled={disabled}
        type={newContact.type}
        value={newContact.value}
        handleChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {disabled && <em>{`Maximo ${CONTACTS_MAX} contactos`}</em>}
      <div className="center">
        <button
          className={styles.input_buttom}
          disabled={!newContact.type || !newContact.value || disabled}
          onClick={() => {
            addContact();
            setNewContact({ type: "", value: "" });
          }}
        >
          Agregar contacto <AddCircleOutlineIcon />
        </button>
      </div>
    </div>
  );
}

const InputContact = ({
  type,
  value,
  handleChange,
  placeholder,
  defaultValue,
  disabled,
}) => (
  <>
    <div>
      <div>
        <span>
          <p>Tipo :</p>
          <select
            className={styles.input_select}
            disabled={disabled}
            name={`type`}
            value={type || ""}
            placeholder={"Tipo"}
            options={CONTACT_TYPES}
            onChange={handleChange}
          >
            <option value="" unselectable="true">
              Selecciona
            </option>
            {CONTACT_TYPES.map((type, i) => (
              <option key={i} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </span>
      </div>
      <div>
        <span>
          <p>Valor: </p>
          <input
            className={styles.input_text}
            disabled={disabled}
            placeholder={placeholder}
            name={`value`}
            value={value || ""}
            onChange={handleChange}
          />
        </span>
      </div>
    </div>
  </>
);
