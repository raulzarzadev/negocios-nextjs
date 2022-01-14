import DEFAULT_INFO from '@comps/Advert.v3/DEFAULT_INFO'
import { createContext } from 'react'

const advert = DEFAULT_INFO
const AdvertContext = createContext(advert)

export default AdvertContext
