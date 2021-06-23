import Modal from '@comps/Modals/Modal'
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
import Icons2 from 'src/utils/Icons2'

export default function ModalContacts ({
  title,
  open,
  handleOpen,
  contacts = [],
  setContacts
}) {
  const [_numberKeyboard, _setNumberKeyboard] = useState(
    false
  )
  const [_form, _setForm] = useState({
    type: '',
    sufix: '',
    prefix: ''
  })
  const formatedContacts = formatContacts(contacts)

  const _handleChange = (e) => {
    _setForm({
      ..._form,
      [e.target.name]: e.target.value
    })
  }

  const _handleAddContact = () => {
    setContacts([
      ...contacts,
      { ..._form, value: _form.sufix }
    ])
    _setForm(null)
  }

  useEffect(() => {
    ;['ws', 'tel'].includes(_form?.type)
      ? _setNumberKeyboard(true)
      : _setNumberKeyboard(false)
  }, [_form?.type])

  useEffect(() => {
    const typeContactSelected = CONTACT_TYPES.find(
      ({ type }) => type === _form?.type
    )
    _setForm({
      ..._form,
      prefix: typeContactSelected?.prefix || ''
    })
  }, [_form?.type])

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

  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  /*           Form validation            */
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */
  const sufixIsValid = !!_form?.sufix
  const selectIsValid = !!_form?.type
  const isValid = selectIsValid && sufixIsValid

  const iconSelected = CONTACT_TYPES.find(
    ({ type }) => type === _form?.type
  )?.icon
  const placeholderSelected = CONTACT_TYPES.find(
    ({ type }) => type === _form?.type
  )?.prefix
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
                  zoomhover="true"
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
            className={s.select_icon}
          >
            <option value="" unselectable="true">
              Icono
            </option>
            {CONTACT_TYPES.map((type, i) => (
              <option key={i} value={type.type}>
                {type.name}
              </option>
            ))}
          </select>
          {iconSelected}

          <input
            type={_numberKeyboard ? 'tel' : 'text'}
            className={s.text_input}
            placeholder={placeholderSelected}
            value={_form?.sufix}
            name="sufix"
            onChange={_handleChange}
            disabled={!selectIsValid}
          />
          <span className={s.add_contact}>
            <IconBtn
              onClick={_handleAddContact}
              disabled={!isValid}
            >
              <AiFillPlusCircle />
            </IconBtn>
          </span>
        </div>
      </div>
    </Modal>
  )
}
