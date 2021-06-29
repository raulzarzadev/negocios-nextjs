/* eslint-disable react/display-name */
/*
https://react-icons.github.io/react-icons/icons?name=ai
https://react-icons.github.io/react-icons/icons?name=md
https://react-icons.github.io/react-icons/icons?name=si

 */
import {
  AiFillEdit,
  AiFillSetting,
  AiFillFileImage,
  AiOutlineBgColors,
  AiFillContacts,
  AiOutlineLoading3Quarters,
  AiFillSave
} from 'react-icons/ai'
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
  MdLocationOn,
  MdCheckCircle
} from 'react-icons/md'
import { SiGooglemaps } from 'react-icons/si'
import {
  RiImageAddFill,
  RiImage2Fill,
  RiImageEditFill
} from 'react-icons/ri'

const size = '1.9rem'

export default {
  Edit: ({ ...rest }) => (
    <AiFillEdit {...rest} size={size} />
  ),
  Settings: ({ ...rest }) => (
    <AiFillSetting {...rest} size={size} />
  ),
  Contacs: ({ ...rest }) => (
    <AiFillContacts {...rest} size={size} />
  ),
  ClassBy: ({ ...rest }) => (
    <MdClass {...rest} size={size} />
  ),
  Loading: ({ ...rest }) => (
    <AiOutlineLoading3Quarters {...rest} size={size} />
  ),
  Checked: ({ ...rest }) => (
    <MdCheckCircle {...rest} size={size} />
  ),
  Save: ({ ...rest }) => (
    <AiFillSave {...rest} size={size} />
  ),
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  /*           IMAGES            */
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  Images: ({ ...rest }) => (
    <RiImage2Fill size={size} {...rest} />
  ),
  AddImage: ({ ...rest }) => (
    <RiImageAddFill size={size} {...rest} />
  ),
  EditImage: ({ ...rest }) => (
    <RiImageEditFill {...rest} size={size} />
  ),
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  /*           CHIPS            */
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  Color: ({ ...rest }) => (
    <AiOutlineBgColors {...rest} size={size} />
  ),
  Location: ({ ...rest }) => (
    <SiGooglemaps {...rest} size={size} />
  ),
  AddLocation: ({ ...rest }) => (
    <MdAddLocation {...rest} size={size} />
  ),
  Restaurant: ({ ...rest }) => (
    <MdRestaurantMenu {...rest} size={size} />
  ),
  Beach: ({ ...rest }) => (
    <MdBeachAccess {...rest} size={size} />
  ),
  Swim: ({ ...rest }) => <MdPool {...rest} size={size} />,
  Pet: ({ ...rest }) => <MdPets {...rest} size={size} />,
  Water: ({ ...rest }) => (
    <MdLocalDrink {...rest} size={size} />
  ),
  Bar: ({ ...rest }) => (
    <MdLocalBar {...rest} size={size} />
  ),
  Coffe: ({ ...rest }) => (
    <MdLocalCafe {...rest} size={size} />
  ),
  Bed: ({ ...rest }) => (
    <MdLocalHotel {...rest} size={size} />
  ),
  Boat: ({ ...rest }) => (
    <MdDirectionsBoat {...rest} size={size} />
  ),
  Parking: ({ ...rest }) => (
    <MdLocalParking {...rest} size={size} />
  )
}
