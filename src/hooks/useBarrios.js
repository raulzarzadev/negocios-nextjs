import { fb_getBarrios } from "firebase/client";
import { useEffect, useState } from "react";

// TODO agregar SWR

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useBarrios() {
  const [barrios, setBarrios] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/barrios")
      .then((res) => {
        return res.json();
      })
      .then(({ barrios }) => {
        setBarrios(barrios);
        setLoading(false);
      });
  }, []);

  function getBarrios() {
    return fb_getBarrios().then((res) => {
      return res;
    });
  }

  return { barrios, loading, getBarrios };
}
