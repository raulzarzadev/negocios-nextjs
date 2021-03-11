import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CONTACT_TYPES } from "CONST/CONTACT_TYPES";
import styles from "./styles.module.css";
import IconBtn from "@comps/IconBtn";
import Tooltip from "@comps/Tooltip";

export default function ContactInputs({ contacts = [], setContacts }) {
  const [contactsList, setContactsList] = useState(contacts || []);
  const [newContact, setNewContact] = useState({ type: "" });
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  const CONTACTS_MAX = 5;

  useEffect(() => {
    if (contacts) {
      setContactsList(contacts);
    }
  }, []);

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
  //console.log(defaultValue);

  const addContact = () => {
    setContactsList([...contactsList, newContact]);
    setContacts([...contactsList, newContact]);
  };

  const handleDeleteContact = (contact) => {
    const arr = contactsList.filter((item) => item !== contact);
    setContactsList(arr);
    setContacts(arr);
  };
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    contactsList.length === CONTACTS_MAX
      ? setDisabled(true)
      : setDisabled(false);
  }, [contactsList]);


  const formatedContacts = contactsList?.map((contact) =>
    CONTACT_TYPES.find((contactType) => {
      console.log(contactType)
      return contactType.value === contact.type && { ...contact };
    })
  );

  return (
    <div>
      {formatedContacts?.map((contact, i) => (
        <div key={i}>
          <div className={styles.contact_display}>
            <div>
              <Tooltip text={contact.label}>{contact.icon}</Tooltip>
            </div>
            <div>
              <p>{contact.value}</p>
            </div>
            <IconBtn onClick={() => handleDeleteContact(contact)}>
              <DeleteForeverIcon />
            </IconBtn>
          </div>
        </div>
      ))}

      <InputContact
        disabled={disabled}
        type={newContact.type}
        value={newContact.value}
        handleChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {disabled && <em>{`Maximo ${CONTACTS_MAX} contactos`}</em>}
      <div>
        <button
          className={styles.input_button}
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
            disabled={disabled}
            name={`type`}
            value={type || ""}
            placeholder={"Tipo"}
            options={CONTACT_TYPES}
            onChange={handleChange}
            className={styles.input_select}
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
            disabled={disabled}
            placeholder={placeholder}
            name={`value`}
            value={value || ""}
            onChange={handleChange}
            className={styles.input_text}
          />
        </span>
      </div>
    </div>
  </>
);
