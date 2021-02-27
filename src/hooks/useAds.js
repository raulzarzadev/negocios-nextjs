export function useAds() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  function getAds() {
    return fetcher("/api/ads");
  }
  function getAdsByBarrio(barrio) {
    return fetcher(`/api/ads/${barrio}`);
  }
  return { getAds, getAdsByBarrio };
}
