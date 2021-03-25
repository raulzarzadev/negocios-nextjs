import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import InstagramIcon from "@material-ui/icons/Instagram";

export const CONTACT_TYPES = [
  {
    name: "Whatsapp",
    type: "ws",
    label: "Whats App",
    icon: <WhatsAppIcon fontSize="default" />,
    prefix: "52",
  },
  {
    name: "facebook",
    type: "fb",
    label: "Facebook",
    icon: <FacebookIcon fontSize="default" />,
    prefix: "https://facebook.com/",
  },
  {
    name: "instagram",
    type: "in",
    label: "Instagram",
    icon: <InstagramIcon fontSize="default" />,
    prefix: "https://instagram.com/",
  },
  {
    name: "webpage",
    type: "web",
    label: "Web",
    icon: <LanguageIcon fontSize="default" />,
    prefix: "https://",
  },
  {
    name: "tel",
    type: "tel",
    label: "Fijo",
    icon: <CallIcon fontSize="default" />,
    prefix: "",
  },
];
