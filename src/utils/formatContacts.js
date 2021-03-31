import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'

export default (contacts = []) =>
  contacts.reduce((acc, curr) => {
    const type = CONTACT_TYPES.find(({ type }) => type === curr.type)
    return [...acc, { ...type, ...curr }]
  }, [])
