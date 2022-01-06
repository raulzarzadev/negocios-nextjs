import ICONS from 'src/utils/ICONS'

export const CONTACT_TYPES = [
  {
    id: 'whatsapp',
    name: 'Whatsapp',
    type: 'ws',
    label: 'Whatsapp',
    icon: <ICONS.Whatsapp size="2rem" />,
    prefix: '521'
  },
  {
    id: 'facebook',
    name: 'facebook',
    type: 'fb',
    label: 'Facebook',
    icon: <ICONS.Facebook size="2rem" />,
    prefix: 'https://facebook.com/'
  },
  {
    id: 'instagram',
    name: 'instagram',
    type: 'in',
    label: 'Instagram',
    icon: <ICONS.Instagram size="2rem" />,
    prefix: 'https://instagram.com/'
  },
  {
    id: 'webpage',
    name: 'webpage',
    type: 'web',
    label: 'Web',
    icon: <ICONS.Water size="2rem" />,
    prefix: 'https://'
  },
  {
    id: 'phone',
    name: 'tel',
    type: 'tel',
    label: 'Fijo',
    icon: <ICONS.Phone size="2rem" />,
    prefix: ''
  }
]
