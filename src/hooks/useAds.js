import {
  fb_addAdvert,
  fb_getAds,
  fb_getUserAds,
  fb_getAdvertById,
  fb_editAdvert,
  fb_deleteAdvert,
  fb_publishAdvert,
  fb_getBarrioActivePublications,
  fb_getBarrio,
  fb_unpublishAdvert,
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
  async function getAdsByBarrio(barrio) {
    const barrioDetails = await fb_getBarrio(barrio);
    const activePublications = await fb_getBarrioActivePublications(barrio);
    const adverts = activePublications.map(async (publication) => {
      const advert = await getAdvert(publication.advertId);
      return { ...advert, publication };
    });
    return Promise.all(adverts).then((res) => {
      return { ...barrioDetails, ads: res };
    });
  }

  function getUserAds() {
    return fb_getUserAds(user.id).then((res) => {
      return res;
    });
  }
  function getAdvert(id) {
    return fb_getAdvertById(id).then((res) => res);
  }
  function editAdvert(id, advert) {
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
  function deleteAdvert(id) {
    return fb_deleteAdvert(id).then((res) => res);
  }
  function publishAdvert(publication) {
    return fb_publishAdvert(publication).then((res) => console.log(res));
  }
  function unpublishAdvert(publishId) {
    return fb_unpublishAdvert(publishId).then((res) => console.log(res));
  }
  return {
    getAds,
    getAdsByBarrio,
    getUserAds,
    addAdvert,
    getAdvert,
    editAdvert,
    deleteAdvert,
    publishAdvert,
    unpublishAdvert,
  };
}
