import formatContacts from 'src/utils/formatContacts'

const ContactsSection = ({ contacts }) => {
  const formatedContacts = formatContacts(contacts)
  return (
    <div className="flex justify-evenly w-full">
      {formatedContacts.map((contact, i) => (
        <ContactLink key={i} contact={contact} />
      ))}
    </div>
  )
}

const ContactLink = ({ contact }) => {
  // console.log('contact.value', contact.value)
  const wstext =
    'Hola, vi tu anuncio en negociosdelbarrio.com. Quisiera...'
  const hrefOptions = {
    ws: `https://wa.me/${contact?.value?.replace(
    /[\s+]/g,
    ''
  )}?text=${wstext}`,
    tel: `tel:52${contact.value}`
  }

  return (
    <>
      <a
        href={hrefOptions[contact?.type] || contact?.value}
        target="_blank"
        rel="noreferrer"
        className=""
      >

        <div className=" p-1">{contact?.icon}</div>
      </a>
    </>
  )
}

export default ContactsSection
