import {
  fb_addAdvert,
  fb_getAds,
  fb_getUserAds,
  fb_getAdvertById,
  fb_editAdvert
} from "firebase/client";
import { useUser } from "src/context/UserContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useAds() {
  const { user } = useUser();

  function getAds() {
    return fb_getAds().then((res) => {
      return res;
    });
  }
  function getAdsByBarrio(barrio) {
    return fetcher(`/api/ads/${barrio}`);
  }
  function getUserAds() {
    return fb_getUserAds(user.id).then((res) => {
      return res;
    });
  }
  function getAdvert(id) {
    return fb_getAdvertById(id).then((res) => res);
  }
  function editAdvert(id,advert) {
    return fb_editAdvert(id, advert).then((res) => res);
  }
  function addAdvert(form) {
    const { title, content, backgroundColor, contacts, labels } = form;
    return fb_addAdvert({
      createdAt: new Date().toISOString(),
      userId: user.id,
      title,
      content,
      backgroundColor,
      contacts,
      labels,
    }).then((res) => res);
  }
  return {
    getAds,
    getAdsByBarrio,
    getUserAds,
    addAdvert,
    getAdvert,
    editAdvert,
  };
}
