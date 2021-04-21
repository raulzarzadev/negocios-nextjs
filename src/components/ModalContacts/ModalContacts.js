
import Modal from '@comps/Modal'
import s from './styles.module.css'
import {
  AiFillPlusCircle,
  AiTwotoneDelete
} from 'react-icons/ai'
import { CONTACT_TYPES } from 'CONST/CONTACT_TYPES'
import { useEffect, useState } from 'react'
import IconBtn from '@comps/IconBtn'
import formatContacts from 'src/utils/formatContacts'
import Tooltip from '@comps/Tooltip'

export default function ModalContacts ({ title, open, handleOpen, contacts = [], setContacts }) {
  const [_numberKeyboard, _setNumberKeyboard] = useState(false)
  const [_form, _setForm] = useState({
    type: '',
    sufix: '',
    prefix: ''
  })

  const _handleChange = (e) => {
    _setForm({
      ..._form,
      [e.target.name]: e.target.value
    })
  }
  console.log('_form', _form)
  console.log('contacts', contacts)

  const _handleAddContact = () => {
    setContacts([...contacts, { ..._form, value: `${_form?.prefix}${_form?.sufix}` }])
    _setForm(null)
  }

  useEffect(() => {
    ['ws', 'tel'].includes(_form?.type) ? _setNumberKeyboard(true) : _setNumberKeyboard(false)
  }, [_form?.type])

  useEffect(() => {
    const contactType = CONTACT_TYPES.find(({ type }) => type === _form?.type)
    _setForm({ ..._form, prefix: contactType?.prefix || '' })
  }, [_form?.type])

  const formatedContacts = formatContacts(contacts)
  const handleDeleteContact = (contact) => {
    const reduced = contacts.reduce((acc, curr) => {
      if (
        curr.type === contact.type &&
        curr.value === contact.value
      ) {
        return acc
      }
      return [...acc, curr]
    }, [])
    setContacts(reduced)
  }

  return (
    <Modal
      title={title}
      open={open}
      handleOpen={handleOpen}
    >
      <div className={s.add}>
        <h4>Lista de contactos</h4>
        {/* Lista de contacts  */}
        <div>
          {formatedContacts.length === 0 && (
            <em>No hay contactos aún</em>
          )}
          {formatedContacts?.map((contact, i) => (
            <div key={i} className={s.contact_row}>
                <div>
                  <Tooltip text={contact.type.label}>
                    <p>{contact.icon}</p>
                  </Tooltip>
                </div>
                <div>
                  <p>{contact.value}</p>
                </div>
                <Tooltip text={'Eliminar'}>
                  <IconBtn
                    zoomhover
                    onClick={() =>
                      handleDeleteContact(contact)
                    }
                  >
                    <AiTwotoneDelete />
                  </IconBtn>
                </Tooltip>
            </div>
          ))}
        </div>
        <div className={s.contact_input}>
          {/* select type */}

          <select
            value={_form?.type || ''}
            name="type"
            onChange={_handleChange}
            className={s.select_input}
          >
            <option value="" unselectable="true">
              Selecciona
            </option>
            {CONTACT_TYPES.map((type, i) => (
              <option key={i} value={type.type}>
                {type.name}
              </option>
            ))}
          </select>
          {/* display sufix */}
          <div className={s.prefix}>{_form?.prefix}</div>
          {/* input value */}
          <input
          type={_numberKeyboard ? 'tel' : 'text'}
            className={s.text_input}
            value={_form?.sufix || ''}
            name="sufix"
            onChange={_handleChange}
          />
        </div>
        <span className={s.add_contact}>
          <em>Agregar contacto</em>
          <IconBtn onClick={_handleAddContact}>
            <AiFillPlusCircle />
          </IconBtn>
        </span>
      </div>
    </Modal>
  )
}
