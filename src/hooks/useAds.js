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
  fb_getUserActivePublications,
  fb_addFavorite,
  fb_removeFavorite,
  /* fb_getUserFavorites,
  fb_listenUserFavorites, */
  fb_reactivePublishAdvert
} from "firebase/client";
import { useEffect, useState } from "react";
import { useUser } from "src/context/UserContext";

export function useAds() {
  const { user } = useUser();

  const [favorites, setFavorites] = useState([]);
  
 /*  useEffect(() => {
    if (user) {
      fb_listenUserFavorites(user.id, (favorites) => {
        formatFavoritesAds(favorites).then(setFavorites);
      });
    }
  }, []);
  console.log(favorites) */
  
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

  async function getUserActiveAds() {
    const activePublications = await fb_getUserActivePublications(user.id);
    const adverts = activePublications?.map(async (publication) => {
      const advert = await getAdvert(publication.advertId);
      return { ...advert, publication };
    });
    return Promise.all(adverts || []).then((res) => {
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
    const { title, content, backgroundColor, contacts, labels, image } = form;
    return fb_addAdvert({
      userId: user.id,
      title,
      content,
      backgroundColor,
      contacts,
      labels,
      image,
    }).then((res) => res);
  }
  function deleteAdvert(id) {
    return fb_deleteAdvert(id).then((res) => res);
  }
  function publishAdvert(publication) {
    return fb_publishAdvert({ userId: user.id, ...publication }).then((res) =>
      console.log(res)
    );
  }
  function unpublishAdvert(publishId) {
    return fb_unpublishAdvert(publishId).then((res) => console.log(res));
  }
  function reactivePublish(publishId) {
    return fb_reactivePublishAdvert(publishId).then((res) => console.log(res));
    
  }
  async function addFavorite(advertId) {
   if (!user) return await { ok:false, type: "NOT_USER" };
    return fb_addFavorite(user.id, advertId)
  }
  function removeFavorite(advertId) {
    return fb_removeFavorite(user.id, advertId);
  }
  /* async function getUserFavorites() {
    const favList = await fb_getUserFavorites(user.id);
    console.log(favList)
    const adverts = favList?.map(async (fav) => {
      const advert = await getAdvert(fav.advertId);
      return { ...advert, fav };
    });
    console.log(adverts)
    return Promise.all(adverts || []).then((res) => {
      return res;
    });
  } */
  /* function formatFavoritesAds(favorites) {
    const adverts = favorites?.map(async (fav) => {
      const advert = await getAdvert(fav.advertId);
      return { ...advert, fav };
    });
    return Promise.all(adverts || []).then((res) => {
      return res;
    });
  } */
  return {
    favorites,
    getAds,
    getAdsByBarrio,
    getUserAds,
    addAdvert,
    getAdvert,
    editAdvert,
    deleteAdvert,
    publishAdvert,
    unpublishAdvert,
    getUserActiveAds,
    removeFavorite,
    addFavorite,
    // getUserFavorites,
    reactivePublish
  };
}
