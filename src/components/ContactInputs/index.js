import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CONTACT_TYPES } from "CONST/CONTACT_TYPES";
import styles from "./styles.module.css";
import IconBtn from "@comps/IconBtn";
import Tooltip from "@comps/Tooltip";
import formatContacts from "src/utils/formatContacts";
import KeyboardNumbers from "@comps/keyboardNumbers";

export default function ContactInputs({ contacts = [], setContacts }) {
  const [newContact, setNewContact] = useState({ type: "" });
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  const CONTACTS_MAX = 5;

  const addContact = () => {
    setContacts([
      ...contacts,
      { ...newContact, value: `${contactType.prefix}${newContact.value}` },
    ]);
  };

  const handleDeleteContact = (contact) => {
    const reduced = formatedContacts.reduce((acc, curr) => {
      if (curr.type === contact.type && curr.value === contact.value) {
        return acc;
      }
      return [...acc, curr];
    }, []);
    setContacts(reduced);
  };
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const [disabled, setDisabled] = useState(false);

  const formatedContacts = formatContacts(contacts);
  const numberKeyboard = newContact.type === "ws" || newContact.type === "tel";

  useEffect(() => {
    contacts.length >= CONTACTS_MAX ? setDisabled(true) : setDisabled(false);
  }, [contacts.length]);

  const contactType = CONTACT_TYPES.find(
    (contact) => contact.type === newContact.type
  );

  console.log(contacts);

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
        numberKeyboard={numberKeyboard}
        type={newContact.type}
        value={newContact.value}
        handleChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        prefix={contactType?.prefix}
      />
      {numberKeyboard && (
        <KeyboardNumbers
          hideDisplay
          value={newContact.value}
          setValue={(value) => setNewContact({ ...newContact, value })}
        />
      )}
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
  numberKeyboard,
  prefix,
}) => {
  return (
    <>
      <span className={styles.contact_content}>
        <div className={styles.input_label}>Tipo:</div>
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
            <option key={i} value={type.type}>
              {type.name}
            </option>
          ))}
        </select>
      </span>

      <span className={styles.contact_content}>
        <div className={styles.input_label}>Valor:</div>
        <span className={styles.input_prefix}>
          {prefix}
          <input
            className={styles.input_text}
            disabled={disabled || numberKeyboard}
            placeholder={placeholder}
            name={`value`}
            value={value || ""}
            onChange={handleChange}
          />
        </span>
      </span>
    </>
  );
};
