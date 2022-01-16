/* eslint-disable react/display-name */
/*
https://react-icons.github.io/react-icons/icons?name=ai
https://react-icons.github.io/react-icons/icons?name=md
https://react-icons.github.io/react-icons/icons?name=si

 */
import {
  BookmarkBorder

} from '@material-ui/icons'
import Bookmark from '@material-ui/icons/Bookmark'
import {
  AiFillEdit,
  AiFillSetting,
  AiOutlineBgColors,
  AiFillContacts,
  AiOutlineLoading3Quarters,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillSave,
  AiFillEye,
  AiFillEyeInvisible
} from 'react-icons/ai'
import { FcInfo } from 'react-icons/fc'
import {
  MdAddLocation,
  MdClass,
  MdRestaurantMenu,
  MdBeachAccess,
  MdPool,
  MdPets,
  MdLocalCafe,
  MdLocalBar,
  MdLocalDrink,
  MdLocalHotel,
  MdDirectionsBoat,
  MdLocalParking,
  MdCheckCircle,
  MdOutlineDoneOutline,
  MdOutlineTextsms,
  MdPhone,
  MdAdd,
  MdClose,
  MdDeleteForever,
  MdInfo,
  MdSettings
} from 'react-icons/md'
import {
  RiImageAddFill,
  RiImage2Fill,
  RiImageEditFill,
  RiInformationLine,
  RiHomeGearFill
} from 'react-icons/ri'
import {
  SiGooglemaps,
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiGoogletranslate,
  SiGoogle
} from 'react-icons/si'

const defaultSize = '1.5rem'

export default {
  Coment: ({ size, ...rest }) => (
    <MdOutlineTextsms
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  DoneArrow: ({ size, ...rest }) => (
    <MdOutlineDoneOutline
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Edit: ({ size, ...rest }) => (
    <AiFillEdit {...rest} size={size ?? defaultSize} />
  ),
  Settings: ({ size, ...rest }) => (
    <AiFillSetting {...rest} size={size ?? defaultSize} />
  ),
  Contacs: ({ size, ...rest }) => (
    <AiFillContacts {...rest} size={size ?? defaultSize} />
  ),
  ClassBy: ({ size, ...rest }) => (
    <MdClass {...rest} size={size ?? defaultSize} />
  ),
  Loading: ({ size, ...rest }) => (
    <AiOutlineLoading3Quarters
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Checked: ({ size, ...rest }) => (
    <MdCheckCircle {...rest} size={size ?? defaultSize} />
  ),
  Save: ({ size, ...rest }) => (
    <AiFillSave {...rest} size={size ?? defaultSize} />
  ),
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  /*           IMAGES            */
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  Images: ({ size, ...rest }) => (
    <RiImage2Fill size={size ?? defaultSize} {...rest} />
  ),
  AddImage: ({ size, ...rest }) => (
    <RiImageAddFill size={size ?? defaultSize} {...rest} />
  ),
  EditImage: ({ size, ...rest }) => (
    <RiImageEditFill {...rest} size={size ?? defaultSize} />
  ),
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  /*           CHIPS            */
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  Color: ({ size, ...rest }) => (
    <AiOutlineBgColors
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Location: ({ size, ...rest }) => (
    <SiGooglemaps {...rest} size={size ?? defaultSize} />
  ),
  AddLocation: ({ size, ...rest }) => (
    <MdAddLocation {...rest} size={size ?? defaultSize} />
  ),
  Restaurant: ({ size, ...rest }) => (
    <MdRestaurantMenu
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Beach: ({ size, ...rest }) => (
    <MdBeachAccess {...rest} size={size ?? defaultSize} />
  ),
  Swim: ({ size, ...rest }) => (
    <MdPool {...rest} size={size ?? defaultSize} />
  ),
  Pet: ({ size, ...rest }) => (
    <MdPets {...rest} size={size ?? defaultSize} />
  ),
  Water: ({ size, ...rest }) => (
    <MdLocalDrink {...rest} size={size ?? defaultSize} />
  ),
  Bar: ({ size, ...rest }) => (
    <MdLocalBar {...rest} size={size ?? defaultSize} />
  ),
  Coffe: ({ size, ...rest }) => (
    <MdLocalCafe {...rest} size={size ?? defaultSize} />
  ),
  Bed: ({ size, ...rest }) => (
    <MdLocalHotel {...rest} size={size ?? defaultSize} />
  ),
  Boat: ({ size, ...rest }) => (
    <MdDirectionsBoat
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Parking: ({ size, ...rest }) => (
    <MdLocalParking {...rest} size={size ?? defaultSize} />
  ),
  Phone: ({ size, ...rest }) => (
    <MdPhone {...rest} size={size ?? defaultSize} />
  ),
  ArrowRight: ({ size, ...rest }) => (
    <AiFillCaretRight
      {...rest}
      size={size ?? defaultSize}
    />
  ),

  Plus: ({ size, ...rest }) => (
    <MdAdd {...rest} size={size ?? defaultSize} />
  ),
  ArrowLeft: ({ size, ...rest }) => (
    <AiFillCaretLeft {...rest} size={size ?? defaultSize} />
  ),
  Close: ({ size, ...rest }) => (
    <MdClose {...rest} size={size ?? defaultSize} />
  ),
  Delete: ({ size, ...rest }) => (
    <MdDeleteForever {...rest} size={size ?? defaultSize} />
  ),
  FillBook: ({ size, ...rest }) => (
    <Bookmark {...rest} size={size ?? defaultSize} />
  ),
  EmptyBook: ({ size, ...rest }) => (
    <BookmarkBorder {...rest} size={size ?? defaultSize} />
  ),

  OpenEye: ({ size, ...rest }) => (
    <AiFillEye {...rest} size={size ?? defaultSize} />
  ),
  CloseEye: ({ size, ...rest }) => (
    <AiFillEyeInvisible
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  //           BRANDS
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  Whatsapp: ({ size, ...rest }) => (
    <SiWhatsapp {...rest} size={size ?? defaultSize} />
  ),
  Facebook: ({ size, ...rest }) => (
    <SiFacebook {...rest} size={size ?? defaultSize} />
  ),
  Instagram: ({ size, ...rest }) => (
    <SiInstagram {...rest} size={size ?? defaultSize} />
  ),
  Google: ({ size, ...rest }) => (
    <SiGoogle {...rest} size={size ?? defaultSize} />
  ),
  Lang: ({ size, ...rest }) => (
    <SiGoogletranslate
      {...rest}
      size={size ?? defaultSize}
    />
  ),
  Gear: ({ size, ...rest }) => (
    <MdSettings {...rest} size={size ?? defaultSize} />
  ),

  Info: ({ size, ...rest }) => (
    <RiInformationLine
      {...rest}
      size={size ?? defaultSize}
    />
  )
}
