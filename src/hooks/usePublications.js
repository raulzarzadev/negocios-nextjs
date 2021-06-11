/* eslint-disable camelcase */

import {
  fb_getAllPublications,
  fb_getActivePublications,
  fb_listenPublications,
  fb_getAdvertPublications
} from 'firebase/client'
import { useEffect, useState } from 'react'

export function usePublications () {
  const [publications, setPublications] = useState()
  useEffect(() => {
    listenPublications()
  }, [])

  function getAllPublications () {
    return fb_getAllPublications()
  }

  function getActivePublications () {
    return fb_getActivePublications()
  }

  function getAdvertPublications (advertId) {
    return fb_getAdvertPublications(advertId)
  }

  function listenPublications () {
    return fb_listenPublications(function (res) {
      setPublications(res)
    })
  }

  return {
    getAllPublications,
    getActivePublications,
    getAdvertPublications,
    publications
  }
}
