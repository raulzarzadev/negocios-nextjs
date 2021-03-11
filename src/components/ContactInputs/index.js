import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CONTACT_TYPES } from "CONST/CONTACT_TYPES";

export default function ContactInputs({ contacts = [], setContacts }) {
  const [contactsForm, setContactsForm] = useState(contacts || []);
  const [newContact, setNewContact] = useState({ type: "" });
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    if (contacts) {
      setContactsForm(contacts);
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
    setContactsForm([...contactsForm, newContact])
    setContacts([...contactsForm, newContact]);

  };

  const handleDeleteContact = (contact) => {
    const arr = contactsForm.filter((item) => item !== contact);
    setContactsForm(arr);
    setContacts(arr)
  };
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {contactsForm?.map((contact, i) => (
        <div key={i}>
          <div>
            <div>
              <button onClick={() => handleDeleteContact(contact)}>
                <DeleteForeverIcon />
              </button>
            </div>
            <div>
              <p>{contact.icon}:</p>
            </div>
            <div>
              <p>{contact.value}</p>
            </div>
          </div>
        </div>
      ))}

      <InputContact
        type={newContact.type}
        value={newContact.value}
        handleChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <div>
        <button
          disabled={!newContact.type || !newContact.value}
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
}) => (
  <>
    <div>
      <div>
        <span>
          <p>Tipo :</p>
          <select
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
