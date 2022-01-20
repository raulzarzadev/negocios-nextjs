import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'

export default function Phone ({ onChange, ...rest }) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  /*   const [value, setValue] = useState()
  console.log('value', value)
  console.log('rest', rest) */
  return (
    <div>
      <PhoneInput
        localization={es}
        onChange={ (_e, _data, event) => onChange(event) }
        { ...rest }
        defaultMask='.. .... .. ..'
        alwaysDefaultMask
      />
    </div>
  )
}
