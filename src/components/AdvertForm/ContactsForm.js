import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'
import formatContacts from 'src/utils/formatContacts'
import ICONS from 'src/utils/ICONS'

export default function ContactsForm ({ form, setForm }) {
  const handleChange = ({ target }) => {
    setForm({
      ...form,
      contacts: {
        ...form.contacts,
        [target.name]: target.value
      }
    })
  }
  const handleClearInput = (input) => {
    const contacts = form.contacts
    delete form.contacts[input]
    setForm({
      ...form,
      contacts
    })
  }

  const contacts = form.contacts
  const formatedContacts = formatContacts(contacts)
  const contactsDisplay = CONTACT_TYPES
  return (
    <div>
      <div className="grid gap-2 ">
        {contactsDisplay.map(({ Input, ...props }) => (
          <div key={props.id} className="flex">
            <Input
              placeholder={props.label}
              icon={props.icon}
              onChange={handleChange}
              name={props.id}
              value={
                formatedContacts.find(
                  ({ id }) => id === props.id
                )?.value || ''
              }
            />
            <button
              onClick={() => handleClearInput(props.id)}
            >
              <ICONS.Delete />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
