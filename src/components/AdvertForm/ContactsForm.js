import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'
import formatContacts from 'src/utils/formatContacts'

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
  const contacts = form.contacts
  const formatedContacts = formatContacts(contacts)
  const contactsDisplay = CONTACT_TYPES
  return (
    <div>
      <div className="grid gap-2 ">
        {contactsDisplay.map(({ Input, ...props }) => (
          <Input
            key={props.id}
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
        ))}
      </div>
    </div>
  )
}
