import { fb_getAllPublications } from "firebase/client";

export function usePublications() {
  function getAllPublications() {
    return fb_getAllPublications();
  }

  return { getAllPublications };
}
