import { fb_getBarrios } from "firebase/client";
import { useEffect, useState } from "react";

// TODO agregar SWR

export function useBarrios() {
  function getBarrios() {
    return fb_getBarrios().then((res) => {
      return res;
    });
  }

  function getAdsPublishedByBarrio(barrio) {
    return fb_getBarrioPublications(barrio);
  }

  return { getBarrios, getAdsPublishedByBarrio };
}
