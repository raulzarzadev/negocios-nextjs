import Phone from '@comps/Inputs/Phone'
import TextIcon from '@comps/Inputs/TextIcon'
import ICONS from 'src/utils/ICONS'

export const CONTACT_TYPES = [
  {
    id: 'whatsapp',
    name: 'Whatsapp',
    type: 'ws',
    label: 'Whatsapp',
    icon: <ICONS.Whatsapp size="1.7rem" />,
    Input: (props) => (
      <TextIcon
        {...props}
        InputComponent={Phone}
        specialLabel={null}
        inputProps={{
          className: 'input',
          name: props.name

        }}
      />
    ),
    prefix: '521'
  },
  {
    id: 'phone',
    name: 'tel',
    type: 'tel',
    label: 'Telefono fijo',
    icon: <ICONS.Phone size="1.7rem" />,
    Input: (props) => (
      <TextIcon
        {...props}
        InputComponent={Phone}
        specialLabel={null}
        inputProps={{
          className: 'input',
          name: props.name

        }}
      />
    ),
    prefix: ''
  },
  {
    id: 'facebook',
    name: 'facebook',
    type: 'fb',
    label: 'Facebook',
    icon: <ICONS.Facebook size="1.7rem" />,
    Input: (props) => <TextIcon {...props} />,
    prefix: 'https://facebook.com/'
  },
  {
    id: 'instagram',
    name: 'instagram',
    type: 'in',
    label: 'Instagram',
    icon: <ICONS.Instagram size="1.7rem" />,
    Input: (props) => <TextIcon {...props} />,
    prefix: 'https://instagram.com/'
  },
  {
    id: 'webpage',
    name: 'webpage',
    type: 'web',
    label: 'Web',
    icon: <ICONS.Web size="1.7rem" />,
    Input: (props) => <TextIcon {...props} />,
    prefix: 'https://'
  },

  {
    id: 'location',
    name: 'location',
    type: 'loc',
    label: 'Ubicación',
    icon: <ICONS.Location size="1.7rem" />,
    Input: (props) => <TextIcon {...props} />,
    prefix: ''
  }
]
