import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'
// Por ahora solo ser recibiran numero mexicanos, 
// no deberan incluir prefix +521
// Y seran asignados en value

/*
icon: <ICON.[typo]/>
id: "whatsapp"
type: "ws"
label: "Whatsapp"
name: "Whatsapp"
prefix: "521"
sufix: "7221218264"
value: "5217221218264"
 */

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
      if (typeof contacts[key] !== 'string') return
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
