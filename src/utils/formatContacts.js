import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'

export default (contacts = []) => {
  if (Array.isArray(contacts)) {
    return contacts?.reduce((acc, curr) => {
      const type = CONTACT_TYPES.find(
        ({ type }) => type === curr.type
      )
      return [...acc, { ...type, ...curr }]
    }, [])
  } else {
    const aux = []
    Object.keys(contacts).forEach((key) => {
      if (contacts[key]) {
        const formated = {
          ...CONTACT_TYPES.find(({ id }) => id === key),
          value: contacts[key]
        }
        aux.push(formated)
      }
    })
    return aux
  }
}
