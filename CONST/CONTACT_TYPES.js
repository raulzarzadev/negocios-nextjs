import ICONS from 'src/utils/ICONS'

export const CONTACT_TYPES = [
  {
    name: 'Whatsapp',
    type: 'ws',
    label: 'Whats App',
    icon: <ICONS.Whatsapp size="2rem" />,
    prefix: '521'
  },
  {
    name: 'facebook',
    type: 'fb',
    label: 'Facebook',
    icon: <ICONS.Facebook size="2rem" />,
    prefix: 'https://facebook.com/'
  },
  {
    name: 'instagram',
    type: 'in',
    label: 'Instagram',
    icon: <ICONS.Instagram size="2rem" />,
    prefix: 'https://instagram.com/'
  },
  {
    name: 'webpage',
    type: 'web',
    label: 'Web',
    icon: <ICONS.Water size="2rem" />,
    prefix: 'https://'
  },
  {
    name: 'tel',
    type: 'tel',
    label: 'Fijo',
    icon: <ICONS.Phone size="2rem" />,
    prefix: ''
  }
]
