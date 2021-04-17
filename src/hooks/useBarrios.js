/* eslint-disable camelcase */

import { fb_getBarrios } from 'firebase/client'

// TODO agregar SWR

export function useBarrios () {
  function getBarrios () {
    return fb_getBarrios().then((res) => {
      return res
    })
  }

  /*   function getAdsPublishedByBarrio(barrio) {
    return fb_getBarrioPublications(barrio);
  } */

  return { getBarrios }
}
