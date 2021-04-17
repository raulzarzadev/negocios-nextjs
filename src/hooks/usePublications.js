/* eslint-disable camelcase */

import { fb_getAllPublications, fb_getActivePublications } from 'firebase/client'

export function usePublications () {
  function getAllPublications () {
    return fb_getAllPublications()
  }

  function getActivePublications () {
    return fb_getActivePublications()
  }

  return { getAllPublications, getActivePublications }
}
